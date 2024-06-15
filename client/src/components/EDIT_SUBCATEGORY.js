import React, { Component } from 'react'
import axios from 'axios'

export class EDIT_SUBCATEGORY extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Editable: this.props.subcategory.subcategory_id === 999 ? true : false,
            IsModalShown: false,
            DetailsShown: false,
            subcategory: [],
        }
    }


    render() {

        return (
            <div className='EditContainer'>

                <div style={{ color: "#BBBBBB", pointerEvents: "none", opacity: "0" }} className='GrayBlock'>{this.props.subcategory.subcategory_id === 999 ? '#' : this.props.subcategory.subcategory_id}</div>
                <div style={{ color: "#BBBBBB", pointerEvents: "none" }} className='GrayBlock'>{this.props.subcategory.subcategory_id === 999 ? '#' : this.props.subcategory.subcategory_id}</div>
                <input
                    pattern='[А-Яа-я]+'
                    id={'subcategory_name' + this.props.subcategory.subcategory_id}
                    autocomplete="off"
                    type='text'
                    maxLength='50'
                    style={{ width: "500px" }}
                    className='MainTextArea'
                    defaultValue={this.props.subcategory.subcategory_name}
                    readOnly={this.state.Editable ? false : true}
                ></input>

                <div onClick={() => { this.state.Editable ? this.saveSubcategory() : this.startEdit() }} className={this.state.Editable ? 'GreenBlock' : 'GrayBlock'}>{this.state.Editable ? <i className='fi fi-rr-check'></i> : <i className='fi fi-rr-edit'></i>}</div>

                <div onClick={() => this.openModalWindow()} className='GrayBlock'><i className='fi fi-rr-trash'></i></div>

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
                                <p className='ModalTitle'>Удаление характристики</p>
                                <p style={{ lineHeight: '150%', fontSize: '18px' }}>
                                    Вы уверены, что хотите удалить характеристику?
                                    Отменить это действие будет невозможно
                                </p>
                                <div className='ModalButtonsContainer'>
                                    <div
                                        onClick={() => this.closeModalWindow()}
                                        className='ModalSecondaryButton'
                                    >
                                        Отмена
                                    </div>
                                    <div
                                        onClick={() => this.props.deleteSubcategory(this.props.subcategory.subcategory_id)}
                                        className='ModalMainButton'
                                    >
                                        Удалить выбранное
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

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

    saveSubcategory() {
        if (this.props.subcategory.subcategory_id === 999) {
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
            'name': document.getElementById("subcategory_name" + this.props.subcategory.subcategory_id).value,
            'id': this.props.categoryid
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/subcategory/` + this.props.subcategory.subcategory_id,
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
            'name': document.getElementById("subcategory_name" + this.props.subcategory.subcategory_id).value,
            'category': this.props.categoryid
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/subcategory`,
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

export default EDIT_SUBCATEGORY