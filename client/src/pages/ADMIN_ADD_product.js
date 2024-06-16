import React, { Component } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ADMINHeader } from '../components/ADMINHeader';
import axios from 'axios'
import ADMIN_ADDP_INFO from '../components/ADMIN_ADDP_INFO';
import ADMIN_ADDP_IMAGES from '../components/ADMIN_ADDP_IMAGES';
import ADMIN_ADDP_FILES from '../components/ADMIN_ADDP_FILES';
import { CSSTransition } from 'react-transition-group'


export class ADMIN_ADD_product extends Component {
    constructor(props) {
        super(props)

        this.state = {
            images: [],
            colors: [],
            styles: [],
            materials: [],
            shapes: [],
            files: [],
            product: [],
            ProdId: window.location.href.split('/')[6],

            ErrorText: 'Пароль слишком короткий',
            ShowError: false,

            IsModalShown: false,
            SuccessModalShown: false,
            DeleteModalShown: false
        }

        this.changeCurrentCategory = this.changeCurrentCategory.bind(this)
        this.changeSelectedStyle = this.changeSelectedStyle.bind(this)
        this.changeSelectedMaterial = this.changeSelectedMaterial.bind(this)
        this.changeSelectedColor = this.changeSelectedColor.bind(this)
        this.removeImage = this.removeImage.bind(this)
        this.uploadImage = this.uploadImage.bind(this)

        this.removeFile = this.removeFile.bind(this)
        this.saveFile = this.saveFile.bind(this)
    }

    componentDidMount() {
        this.getProduct();
        this.getCategories();

        this.getColors();

        this.getImages()

        this.getStyles()
        this.getMaterials()
        this.getShapes()

        this.getFiles()
    }

    getStyles() {
        const qs = require('qs');
        let data = qs.stringify({

        });

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/admin/style/` + Number.parseInt(this.state.ProdId),
            headers: {},
            data: data
        };

        axios.request(config)
            .then((response) => {
                this.setState({ styles: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getColors() {
        const qs = require('qs');
        let data = qs.stringify({

        });

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/admin/color/` + Number.parseInt(this.state.ProdId),
            headers: {},
            data: data
        };

        axios.request(config)
            .then((response) => {
                this.setState({ colors: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getMaterials() {
        const qs = require('qs');
        let data = qs.stringify({

        });

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/admin/material/` + Number.parseInt(this.state.ProdId),
            headers: {},
            data: data
        };

        axios.request(config)
            .then((response) => {
                this.setState({ materials: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getShapes() {
        const qs = require('qs');
        let data = qs.stringify({

        });

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/shape`,
            headers: {},
            data: data
        };

        axios.request(config)
            .then((response) => {
                this.setState({ shapes: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getProduct() {

        const qs = require('qs')
        let data = qs.stringify({})

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url:
                `${process.env.REACT_APP_API_URL}/admin/product/` + Number.parseInt(this.state.ProdId),
            headers: {},
            data: data,
        }

        axios
            .request(config)
            .then(response => {
                this.setState({ product: response.data })
            })
            .catch(error => {
                console.log(error)
            })
    }

    getCategories() {
        const qs = require('qs');
        let data = qs.stringify({

        });

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/category`,
            headers: {},
            data: data
        };

        axios.request(config)
            .then((response) => {
                this.setState({ categories: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getImages() {
        const qs = require('qs');
        let data = qs.stringify({

        });

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/admin/allimages/` + Number.parseInt(this.state.ProdId),
            headers: {},
            data: data
        };

        axios.request(config)
            .then((response) => {
                this.setState({ images: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getFiles() {
        const qs = require('qs');
        let data = qs.stringify({

        });

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/admin/file/` + Number.parseInt(this.state.ProdId),
            headers: {},
            data: data
        };

        axios.request(config)
            .then((response) => {
                this.setState({ files: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
    }


    render() {

        let ColorsImages = this.state.colors;
        ColorsImages = ColorsImages.filter(el => el.color_ischecked === true)

        ColorsImages.map(el => el.productd_id === null ? el.productd_id = Math.floor(Math.random() * (1000000 - 50000 + 1) + 50000) : el.productd_id = el.productd_id)

        return (
            <>
                {this.props.user?.user_role === 2 &&
                    <div style={{ display: "flex", flexDirection: "column" }} class="Content">
                        <div class="PageTitle">
                            <div class="PageTitleTextContainer">
                                <h1 class="PageTitleText">Редактирование товара</h1>
                            </div>

                            <div class="PageTitleLine"></div>
                        </div>
                        {this.state.product.length > 0 &&
                            <div style={{ gap: "30px", display: "flex", flexDirection: "column" }}>
                                {this.state.product?.map(product => (
                                    <ADMIN_ADDP_INFO
                                        key={product.product_id}
                                        product={product}
                                        ProdId={this.state.ProdId}

                                        styles={this.state.styles}
                                        materials={this.state.materials}
                                        categories={this.state.categories}
                                        colors={this.state.colors}
                                        shapes={this.state.shapes}

                                        categoryid={product.category_id}
                                        subcategoryid={product.subcategory_id}
                                        shapeid={product.shape_id}

                                        currentcategoryname={product.category_name}

                                        changeCurrentCategory={this.changeCurrentCategory}
                                        changeSelectedStyle={this.changeSelectedStyle}
                                        changeSelectedMaterial={this.changeSelectedMaterial}
                                        changeSelectedColor={this.changeSelectedColor}
                                    />
                                ))}

                                <div style={{ flexDirection: "column", gap: "20px" }} className='AdminCard'>
                                    <p className='PageCardTitle'>Фотографии товара</p>
                                    <p className='PageCardText'>Загрузите фотографии под каждый отдельный цвет</p>
                                    {ColorsImages.map(productcolor => (
                                        <ADMIN_ADDP_IMAGES
                                            removeImage={this.removeImage}
                                            uploadImage={this.uploadImage}
                                            key={productcolor.color_id}
                                            productcolor={productcolor}
                                            ProdId={this.state.ProdId}
                                            productd_id={productcolor.productd_id}
                                            images={this.state.images.filter(el => el.productd_id === productcolor.productd_id)}
                                        />
                                    ))}
                                </div>

                                <div style={{ flexDirection: "column", gap: "20px" }} className='AdminCard'>
                                    <p className='PageCardTitle'>Инструкции и другие файлы</p>
                                    <p style={{ marginBottom: "10px" }} className='PageCardText'>Добавьте файлы со справочной и иной информацией, которая может пригодиться пользователям</p>
                                    {this.state.files.map(file => (
                                        <ADMIN_ADDP_FILES
                                            removeFile={this.removeFile}
                                            saveFile={this.saveFile}
                                            key={file.file_id}
                                            ProdId={this.state.ProdId}
                                            file={file}
                                        />
                                    ))}
                                    <div onClick={() => this.addNewFile()} style={{ width: "60px" }} className='ModalMainButtonGreen'><i class='fi fi-rr-plus' /></div>
                                </div>

                                <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: "25px" }}>
                                    <div onClick={() => this.setState({ DeleteModalShown: true })} style={{ width: "300px" }} className='ModalMainButton'>Удалить из каталога</div>
                                    <CSSTransition
                                        in={this.state.ShowError}
                                        timeout={1000}
                                        classNames='smallalert'
                                        unmountOnExit
                                    >
                                        <p style={{ color: '#E04E20' }} className='PageCardText'>
                                            {this.state.ErrorText}
                                        </p>
                                    </CSSTransition>
                                    <div onClick={() => this.savePRODUCT()} style={{ width: "300px" }} className='ModalMainButtonGreen'>Сохранить</div>
                                </div>
                            </div>}

                            {this.state.DeleteModalShown && (
                            <div className='ModalBackground'>
                                <div className='ModalWindow'>
                                    <div
                                        onClick={() => this.setState({DeleteModalShown: false})}
                                        className='CloseModal'
                                    >
                                        <i
                                            style={{ color: '#636363' }}
                                            class='fi fi-rr-cross-small'
                                        ></i>
                                    </div>
                                    <div className='ModalContainer'>
                                        <p className='ModalTitle'>Удаление товара из каталога</p>
                                        <p style={{ lineHeight: '150%', fontSize: '18px' }}>
                                            Удалить товар полностью невозможно. Однако товар, который закончился на складе, не будет отображаться в каталоге
                                            <br/><br/>
                                            Нажатие на кнопку "Удалить" установит О в поля "В наличии", которые вы всегда сможете изменить.
                                        </p>
                                        <div className='ModalButtonsContainer'>
                                            <div
                                                onClick={() => this.setState({ DeleteModalShown: false })}
                                                className='ModalSecondaryButton'
                                                style={{ width: "600px", alignItems: "center", textAlign: "center" }}
                                            >
                                                Отмена
                                            </div>
                                            <div
                                                onClick={() => this.DeteleProduct()}
                                                className='ModalMainButton'
                                            >
                                                Удалить
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {this.state.SuccessModalShown && (
                            <div className='ModalBackground'>
                                <div className='ModalWindow'>
                                    <div
                                        onClick={() => this.setState({SuccessModalShown: false})}
                                        className='CloseModal'
                                    >
                                        <i
                                            style={{ color: '#636363' }}
                                            class='fi fi-rr-cross-small'
                                        ></i>
                                    </div>
                                    <div className='ModalContainer'>
                                        <p className='ModalTitle'>Товар успешно сохранен!</p>
                                        <div className='ModalButtonsContainer'>
                                            <div
                                                onClick={() => this.setState({ SuccessModalShown: false })}
                                                className='ModalSecondaryButton'
                                                style={{ width: "600px", alignItems: "center", textAlign: "center" }}
                                            >
                                                Продолжить редактирование
                                            </div>
                                            <div
                                                onClick={() => window.location.href = '/admin/products'}
                                                className='ModalMainButtonGreen'
                                            >
                                                Готово
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

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
                                        <p className='ModalTitle'>Сохранение товара</p>
                                        <p style={{ lineHeight: '150%', fontSize: '18px' }}>
                                            Вы уверены, что хотите сохранить товар?
                                            Удалить новые цвета товара будет невозможно
                                        </p>
                                        <div className='ModalButtonsContainer'>
                                            <div
                                                onClick={() => this.closeModalWindow()}
                                                className='ModalSecondaryButton'
                                            >
                                                Отмена
                                            </div>
                                            <div
                                                onClick={() => this.saveProductToBD()}
                                                className='ModalMainButtonGreen'
                                            >
                                                Сохранить
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {this.state.product.length <= 0 &&
                            <div class='PageContent'>
                                <div class='CartCardsContainer'>
                                    <div
                                        style={{ flexDirection: 'column', gap: '5px' }}
                                        class='CartCard'
                                    >
                                        <p style={{ fontSize: '32px' }} class='AlertContainerTitle'>
                                            Такого товара нет
                                        </p>
                                        <p style={{ marginBottom: '20px' }} className='PageCardText'>
                                            Проверьте правильность ссылки или попробуйте еще раз
                                        </p>
                                    </div>
                                </div>
                            </div>
                        }
                        <ADMINHeader />
                        <Footer />
                    </div>
                }
                {this.props.user?.user_role === 1 &&
                    <div class="Content">
                        <div class="PageTitle">
                            <div class="PageTitleTextContainer">
                                <h1 class="PageTitleText">Доступ запрещен</h1>
                            </div>

                            <div class="PageTitleLine" />
                        </div>

                        <div class='PageContent'>
                            <div class='CartCardsContainer'>
                                <div
                                    style={{ flexDirection: 'column', gap: '5px' }}
                                    class='CartCard'
                                >
                                    <p style={{ fontSize: '32px' }} class='AlertContainerTitle'>
                                        У вас нет доступа к данной странице
                                    </p>
                                    <a href='../catalogue'>
                                        <div class='MainButton'>Каталог товаров</div>
                                    </a>
                                </div>
                            </div>
                            <div class='PageSideContainer' />
                        </div>
                        <Header />
                        <Footer />
                    </div>
                }
            </>
        )
    }

    DeteleProduct(){
        this.state.colors.filter(el => el.color_ischecked === true && el.color_readonly === true).map(el => document.getElementById('product_onstock' + el.color_id).value = 0)
        this.state.colors.filter(el => el.color_ischecked === true && el.color_readonly === true).map(el => this.updateDetails(el))

        this.setState({ DeleteModalShown: false });
        this.setState({ SuccessModalShown: true });
    }

    savePRODUCT() {
        this.setState({ ShowError: false })

        if (this.checkAllFilled()) {
            this.openModalWindow()
        }
    }

    saveProductToBD() {
        this.updateProduct();

        this.deleteStyles();
        this.deleteMaterials();
        this.deleteFiles();

        this.state.colors.filter(el => el.color_ischecked === true && el.color_readonly === true).map(el => this.deleteImages(el.productd_id))

        this.state.colors.filter(el => el.color_ischecked === true && el.color_readonly === true).map(el => this.updateDetails(el))

        this.state.colors.filter(el => el.color_ischecked === true && el.color_readonly === false).map(el => this.addColors(el))

        this.getProductsForCovers()

        this.closeModalWindow()
        this.setState({ SuccessModalShown: true });
    }

    updateProduct() {

        let disountcprice = Number.parseFloat(document.getElementById('product_price' + this.state.ProdId).value)
        let discount = Number.parseFloat(document.getElementById('product_discount' + this.state.ProdId).value)

        if (discount != 0) {
            disountcprice = disountcprice - disountcprice * (discount / 100)
        }

        const qs = require('qs');
        let data = qs.stringify({
            'name': document.getElementById('product_name' + this.state.ProdId).value,
            'price': document.getElementById('product_price' + this.state.ProdId).value,
            'discprice': disountcprice,
            'discount': discount,

            'length': document.getElementById('product_lenght' + this.state.ProdId).value,
            'width': document.getElementById('product_width' + this.state.ProdId).value,
            'height': document.getElementById('product_height' + this.state.ProdId).value,
            'weight': document.getElementById('product_weight' + this.state.ProdId).value,

            'shape': document.getElementById('select_shape').value,
            'subcategory': document.getElementById('select_subcategory').value,

            'id': this.state.ProdId,
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/admin/product/`,
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

    deleteStyles() {
        const qs = require('qs');
        let data = qs.stringify({

        });

        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/admin/styles/` + this.state.ProdId,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                this.state.styles.filter(el => el.style_ischecked === true).map(el => this.updateStyles(el.style_id))
            })
            .catch((error) => {
                console.log(error);
            });
    }

    updateStyles(styllid) {

        const qs = require('qs');
        let data = qs.stringify({
            'prod': this.state.ProdId,
            'style': styllid
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/admin/styles`,
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

    deleteMaterials() {
        const qs = require('qs');
        let data = qs.stringify({

        });

        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/admin/materials/` + this.state.ProdId,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                this.state.materials.filter(el => el.material_ischecked === true).map(el => this.updateMaterials(el.material_id))
            })
            .catch((error) => {
                console.log(error);
            });
    }

    updateMaterials(id) {
        const qs = require('qs');
        let data = qs.stringify({
            'prod': this.state.ProdId,
            'material': id
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/admin/materials`,
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

    deleteFiles() {
        const qs = require('qs');
        let data = qs.stringify({

        });

        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/admin/files/` + this.state.ProdId,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                this.state.files.map(el => this.updateFiles(el))
            })
            .catch((error) => {
                console.log(error);
            });
    }

    updateFiles(el) {
        const qs = require('qs');
        let data = qs.stringify({
            'prod': this.state.ProdId,
            'name': document.getElementById('file_name' + el.file_id).value,
            'path': el.file_path
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/admin/files`,
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

    addColors(color) {
        const qs = require('qs');
        let data = qs.stringify({
            'prod': this.state.ProdId,
            'color': color.color_id,
            'onstock': document.getElementById('product_onstock' + color.color_id).value
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/admin/productdetails`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                this.state.images.filter(el => el.productd_id === color.productd_id).map(el => this.uploadNewImages(el.image_path))
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deleteImages(id) {
        const qs = require('qs');
        let data = qs.stringify({

        });

        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/admin/images/` + id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                this.state.images.filter(el => el.productd_id === id).map(el => this.updateImages(el.image_path, el.productd_id))
            })
            .catch((error) => {
                console.log(error);
            });
    }

    uploadNewImages(path) {
        const qs = require('qs');
        let data = qs.stringify({
            'path': path
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/admin/images`,
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

    updateImages(path, id) {
        const qs = require('qs');
        let data = qs.stringify({
            'path': path,
            'id': id
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/admin/updateimages`,
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

    getProductsForCovers() {
        const qs = require('qs');
        let data = qs.stringify({
            'id': this.state.ProdId
        });

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/admin/covers/` + this.state.ProdId,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                response.data.filter(el => setTimeout(this.updateCovers(el.productd_id), 10000))
            })
            .catch((error) => {
                console.log(error);
            });
    }

    updateCovers(pid) {
        const qs = require('qs');
        let data = qs.stringify({
            'id': pid
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/admin/covers`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log('[]')
            })
            .catch((error) => {
                console.log(error);
            });
    }

    updateDetails(color) {

        const qs = require('qs');
        let data = qs.stringify({
            'id': color.productd_id,
            'onstock': document.getElementById('product_onstock' + color.color_id).value
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/admin/productdetails`,
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











    checkAllFilled() {
        if (document.getElementById('product_name' + this.state.ProdId).value === '') {
            this.setState({ ShowError: true })
            this.setState({ ErrorText: 'Заполните поле названия!' })
            return false;
        }

        if (document.getElementById('product_price' + this.state.ProdId).value === '') {
            this.setState({ ShowError: true })
            this.setState({ ErrorText: 'Заполните поле цены!' })
            return false;
        }

        var inputprice = document.getElementById('product_price' + this.state.ProdId)

        if (!inputprice.checkValidity()) {
            this.setState({ ShowError: true })
            this.setState({ ErrorText: 'Поле цены должно содержать только числа' })
            return false;
        }

        if (document.getElementById('product_discount' + this.state.ProdId).value === '') {
            this.setState({ ShowError: true })
            this.setState({ ErrorText: 'Заполните поле скидки. Чтобы товар был без скидки, поставьте 0' })
            return false;
        }

        var inputdiscount = document.getElementById('product_discount' + this.state.ProdId)

        if (!inputdiscount.checkValidity()) {
            this.setState({ ShowError: true })
            this.setState({ ErrorText: 'Поле скидки должно содержать значение от 0 до 99' })
            return false;
        }


        if (document.getElementById('product_weight' + this.state.ProdId).value === '') {
            this.setState({ ShowError: true })
            this.setState({ ErrorText: 'Заполните поле веса' })
            return false;
        }

        var inputweight = document.getElementById('product_weight' + this.state.ProdId)

        if (!inputweight.checkValidity()) {
            this.setState({ ShowError: true })
            this.setState({ ErrorText: 'Поле веса должно содержать только число. Для нецелого значения используйте точку (2.3)' })
            return false;
        }

        if (document.getElementById('product_width' + this.state.ProdId).value === '') {
            this.setState({ ShowError: true })
            this.setState({ ErrorText: 'Заполните поле ширины' })
            return false;
        }

        var inputwidth = document.getElementById('product_width' + this.state.ProdId)

        if (!inputwidth.checkValidity()) {
            this.setState({ ShowError: true })
            this.setState({ ErrorText: 'Поле ширины должно содержать только число. Для нецелого значения используйте точку (2.3)' })
            return false;
        }


        if (document.getElementById('product_height' + this.state.ProdId).value === '') {
            this.setState({ ShowError: true })
            this.setState({ ErrorText: 'Заполните поле высоты' })
            return false;
        }

        var inputheight = document.getElementById('product_height' + this.state.ProdId)

        if (!inputheight.checkValidity()) {
            this.setState({ ShowError: true })
            this.setState({ ErrorText: 'Поле высоты должно содержать только число. Для нецелого значения используйте точку (2.3)' })
            return false;
        }



        if (document.getElementById('product_lenght' + this.state.ProdId).value === '') {
            this.setState({ ShowError: true })
            this.setState({ ErrorText: 'Заполните поле длины' })
            return false;
        }

        var inputlenght = document.getElementById('product_lenght' + this.state.ProdId)

        if (!inputlenght.checkValidity()) {
            this.setState({ ShowError: true })
            this.setState({ ErrorText: 'Поле длины должно содержать только число. Для нецелого значения используйте точку (2.3)' })
            return false;
        }





        // СТИЛИ И МАТЕРИАЛЫ

        if (this.state.colors.filter(el => el.color_ischecked === true).length < 1) {
            this.setState({ ShowError: true })
            this.setState({ ErrorText: 'Необходимо добавить цвета для товара' })
            return false;
        }

        if (this.state.materials.filter(el => el.material_ischecked === true).length < 1) {
            this.setState({ ShowError: true })
            this.setState({ ErrorText: 'Необходимо добавить хотя бы один материал' })
            return false;
        }

        if (this.state.styles.filter(el => el.style_ischecked === true).length < 1) {
            this.setState({ ShowError: true })
            this.setState({ ErrorText: 'Необходимо добавить хотя бы один стиль' })
            return false;
        }

        let ColorsImages = this.state.colors;
        ColorsImages = ColorsImages.filter(el => el.color_ischecked === true)

        for (let index = 0; index < ColorsImages.length; index++) {

            if (this.state.images.filter(el => el.productd_id === ColorsImages[index].productd_id).length < 1) {
                this.setState({ ShowError: true })
                this.setState({ ErrorText: 'Необходимо добавить хотя бы одну фотографию на каждый цвет' })
                return false;
            }
        }

        for (let index = 0; index < ColorsImages.length; index++) {

            if (document.getElementById('product_onstock' + ColorsImages[index].color_id).value === '') {
                this.setState({ ShowError: true })
                this.setState({ ErrorText: 'Необходимо добавить количество товара на складе' })
                return false;
            }

            if (!document.getElementById('product_onstock' + ColorsImages[index].color_id).checkValidity()) {
                this.setState({ ShowError: true })
                this.setState({ ErrorText: 'Поле «В наличии» должно содержать только цифры' })
                return false;
            }
        }

        return true;
    }

    closeModalWindow() {
        this.setState({ IsModalShown: false })
    }

    openModalWindow() {
        this.setState({ IsModalShown: true })
    }











    removeFile(id) {
        let originproducts = this.state.files
        originproducts = originproducts.filter(a => a.file_id !== id)
        this.setState({ files: originproducts })
    }

    addNewFile() {
        let objectToAdd = [{ file_id: Math.floor(Math.random() * (1000000 - 50000 + 1) + 50000), file_path: null, file_name: null, file_product: this.ProdId }];
        let newArray = this.state.files;
        newArray = [...newArray, ...objectToAdd];

        this.setState({ files: newArray })
    }

    saveFile(filepath, fileid) {
        const productindex = this.state.files
            .map(a => a.file_id)
            .indexOf(fileid)
        const originproducts = this.state.files
        originproducts[productindex].file_path = filepath

        this.setState({ files: originproducts })

        console.log(originproducts)
    }

    removeImage(img) {
        let originproducts = this.state.images
        originproducts = originproducts.filter(a => a.image_path !== img)
        this.setState({ images: originproducts })
    }

    uploadImage(id, file_path) {
        let objectToAdd = [{ image_path: file_path, productd_id: Number.parseInt(id) }];
        let newArray = this.state.images;
        newArray = [...newArray, ...objectToAdd];

        this.setState({ images: newArray })
    }

    changeCurrentCategory(category_id) {
        const originproducts = this.state.product
        originproducts[0].category_id = category_id

        this.setState({ product: originproducts })
    }

    changeSelectedStyle(styleid, selection) {
        const productindex = this.state.styles
            .map(a => a.style_id)
            .indexOf(styleid)
        const originproducts = this.state.styles
        originproducts[productindex].style_ischecked = selection

        this.setState({ styles: originproducts })
    }

    changeSelectedMaterial(materialid, selection) {

        const productindex = this.state.materials
            .map(a => a.material_id)
            .indexOf(materialid)
        const originproducts = this.state.materials
        originproducts[productindex].material_ischecked = selection

        this.setState({ materials: originproducts })
    }

    changeSelectedColor(colorid, selection) {
        const productindex = this.state.colors
            .map(a => a.color_id)
            .indexOf(colorid)
        const originproducts = this.state.colors
        originproducts[productindex].color_ischecked = selection

        this.setState({ colors: originproducts })
    }
}

export default ADMIN_ADD_product