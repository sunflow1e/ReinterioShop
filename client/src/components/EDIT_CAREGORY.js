import React, { Component } from 'react'
import axios from 'axios'
import EDIT_SUBCATEGORY from './EDIT_SUBCATEGORY';
import { CSSTransition } from 'react-transition-group';

const hostUrl = process.env.REACT_APP_API_URL + '/upload'

export class EDIT_CATEGORY extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Editable: this.props.category.category_id === 999 ? true : false,
            IsModalShown: false,
            DetailsShown: false,
            subcategories: [],
            category: [],

            selectedFile: null,
            uploaded: null,
        }
        this.deleteSubcategory = this.deleteSubcategory.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
    }

    handleUpload = async (event) => {
        this.setState({ selectedFile: event.currentTarget.files[0] })

        if (!event.currentTarget.files[0]) {
            return;
        }

        const formData = new FormData;
        formData.append('file', event.currentTarget.files[0]);

        const res = await fetch(hostUrl, {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();

        this.setState({ uploaded: data })

        const originproducts = this.state.category
        originproducts.category_image = data.filePath

        this.setState({ category: originproducts })

        this.saveImage(data.filePath)
    }

    componentDidMount() {
        this.getSubcategory();
        this.setState({ category: this.props.category })
    }

    getSubcategory() {
        const qs = require('qs');
        let data = qs.stringify({

        });

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/subcategory/` + this.props.category.category_id,
            headers: {},
            data: data
        };

        axios.request(config)
            .then((response) => {
                this.setState({ subcategories: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {

        return (
            <div className='EditContainer' id={'category' + this.props.category.category_id}>

                <div className=''></div>
                <div
                    className={this.state.DetailsShown ? 'ReviewPicture' : 'SmallImg'}
                    style={{
                        backgroundImage:
                            'url(/img/' + this.state.category.category_image,
                    }}
                ></div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div className='EditContainer'>
                        <div style={{ color: "#BBBBBB", pointerEvents: "none" }} className='GrayBlock'>{this.props.category.category_id === 999 ? '#' : this.props.category.category_id}</div>
                        <input
                            pattern='[А-Яа-я]+'
                            id={'category_name' + this.state.category.category_id}
                            autocomplete="off"
                            type='text'
                            maxLength='50'
                            className='MainTextArea'
                            style={{ width: "435px" }}
                            defaultValue={this.state.category.category_name}
                            readOnly={this.state.Editable ? false : true}
                        ></input>

                        <div onClick={() => this.changeDetailsShown()} className={this.state.DetailsShown ? 'GreenBlock' : 'GrayBlock'}>{this.state.DetailsShown ? <i className='fi fi-rr-angle-up'></i> : <i className='fi fi-rr-angle-down'></i>}</div>

                        {this.props.category.category_id !== 999 &&
                            <>
                                <button className='EmptyButton'><label for={'file' + this.props.categoryid}><div className='GrayBlock'><i class='fi fi-rr-picture' /></div></label></button>
                                <input id={'file' + this.props.categoryid} type='file' className='hidden' onChange={this.handleUpload} accept='image/*, .png, .jpg, .jpeg' />
                            </>
                        }
                        <div onClick={() => { this.state.Editable ? this.saveCategory() : this.startEdit() }} className={this.state.Editable ? 'GreenBlock' : 'GrayBlock'}>{this.state.Editable ? <i className='fi fi-rr-check'></i> : <i className='fi fi-rr-edit'></i>}</div>

                        <div onClick={() => this.openModalWindow()} className='GrayBlock'><i className='fi fi-rr-trash'></i></div>

                    </div>

                    {this.state.IsModalShown && (
                        <div className='ModalBackground'>
                            <div className='ModalWindow'>
                                <div
                                    onClick={() => this.closeModalWindow()}
                                    className='CloseModal'
                                >
                                    <i
                                        style={{ color: '#636363' }}
                                        class='fi fi-rr-cross-small'
                                    ></i>
                                </div>
                                <div className='ModalContainer'>
                                    <p className='ModalTitle'>Будьте осторожны!</p>
                                    <p style={{ lineHeight: '150%', fontSize: '18px' }}>
                                        Удаление категории приведет к удалению всех связанных подкатегорий. Хотите продолжить?
                                    </p>
                                    <div className='ModalButtonsContainer'>
                                        <div
                                            onClick={() => this.closeModalWindow()}
                                            className='ModalSecondaryButton'
                                        >
                                            Отмена
                                        </div>
                                        <div
                                            onClick={() => this.deleteCategory()}
                                            className='ModalMainButton'
                                        >
                                            Удалить выбранное
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <CSSTransition
                        in={this.state.DetailsShown}
                        timeout={300}
                        classNames='smallalert'
                        unmountOnExit
                    >
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {this.state.subcategories?.map(subcategory => (
                                <EDIT_SUBCATEGORY
                                    key={subcategory.subcategory_id}
                                    user_id={localStorage.getItem('userId')}
                                    subcategory={subcategory}
                                    deleteSubcategory={this.deleteSubcategory}
                                    categoryid={this.props.categoryid}
                                />
                            ))}

                            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                                <div style={{ color: "#BBBBBB", pointerEvents: "none", opacity: "0" }} className='GrayBlock'>#</div>
                                <div onClick={() => this.addSubcategory()} style={{ width: "300px" }} className='ModalMainButtonGreen'>Добавить подкатегорию</div>
                            </div>
                        </div>
                    </CSSTransition>


                </div>
            </div>
        )
    }

    openModalWindow() {
        this.setState({ IsModalShown: true })
    }

    closeModalWindow() {
        this.setState({ IsModalShown: false })
    }

    changeDetailsShown() {
        this.setState({ DetailsShown: !this.state.DetailsShown })
    }

    startEdit() {
        this.setState({ Editable: true })
    }

    saveCategory() {
        if (this.props.category.category_id === 999) {
            this.setState({ Editable: false });
            this.AddNew()
            window.location.href = '/admin/edit/category'
        }
        else {
            this.setState({ Editable: false });
            this.saveChanges()
        }
    }

    saveChanges() {
        const qs = require('qs');
        let data = qs.stringify({
            'name': document.getElementById("category_name" + this.props.category.category_id).value
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/category/` + this.props.category.category_id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

    }

    saveImage(filePath) {

        const qs = require('qs');
        let data = qs.stringify({
            'img': filePath
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/category/img/` + this.props.category.category_id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

    }

    AddNew() {
        const qs = require('qs');
        let data = qs.stringify({
            'name': document.getElementById("category_name" + this.props.category.category_id).value
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/category`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

    }

    deleteCategory(){

        this.state.subcategories.map(el => this.deleteSubcategory(el.subcategory_id))

        this.props.deleteCategory(this.state.category.category_id);
    }





    addSubcategory() {
        let objectToAdd = [{ subcategory_id: 999, subcategory_name: '' }];
        let newArray = this.state.subcategories;
        newArray = [...newArray, ...objectToAdd];

        this.setState({ subcategories: newArray })
    }

    deleteSubcategory(id) {
        let origin = this.state.subcategories
        origin = origin.filter(a => a.subcategory_id !== id)
        this.setState({ subcategories: origin })


        this.deleteSubcategoriesProdutsFromBD(id)
        setTimeout(this.deleteFromBD(id), 2000)
    }

    deleteSubcategoriesProdutsFromBD(id) {
        const qs = require('qs');
        let data = qs.stringify({
            'subcategorybefore': id,
            'subcategory': 0
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/product/subcategory`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

    }

    deleteFromBD(id) {
        const qs = require('qs');
        let data = qs.stringify({

        });

        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/subcategory/` + id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

    }
}

export default EDIT_CATEGORY