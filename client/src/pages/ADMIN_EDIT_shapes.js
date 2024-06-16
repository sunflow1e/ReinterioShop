import React, { Component } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ADMINHeader } from '../components/ADMINHeader';
import axios from 'axios'
import EDIT_SHAPE from '../components/EDIT_SHAPE';


export class ADMIN_EDIT_shapes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            shapes: [],
            products: [],
            IsModalShown: false,
        }
        this.deleteShape = this.deleteShape.bind(this)
    }

    componentDidMount() {
        this.getShapes();
        this.getAllProduts();
    }

    getAllProduts() {
        const qs = require('qs')
        let data = qs.stringify({})

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url:
                `${process.env.REACT_APP_API_URL}/products/shape`,
            headers: {},
            data: data,
        }

        axios
            .request(config)
            .then(response => {
                this.setState({ products: response.data })
            })
            .catch(error => {
                console.log(error)
            })
    }

    getShapes() {
        const qs = require('qs')
        let data = qs.stringify({})

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url:
                `${process.env.REACT_APP_API_URL}/shape`,
            headers: {},
            data: data,
        }

        axios
            .request(config)
            .then(response => {
                this.setState({ shapes: response.data })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {

        return (
            <>
                {this.props.user?.user_role === 2 &&
                    <div class="Content">
                        <div class="PageTitle">
                            <div class="PageTitleTextContainer">
                                <h1 class="PageTitleText">Управление формами</h1>
                            </div>

                            <div class="PageTitleLine"></div>
                        </div>
                        <div>

                        </div>
                        <div className='ReviewCard'>
                            {this.state.shapes?.map(shape => (
                                <EDIT_SHAPE
                                    key={shape.shape_id}
                                    user_id={localStorage.getItem('userId')}
                                    shape={shape}
                                    deleteShape={this.deleteShape}
                                />
                            ))}

                            <div onClick={() => this.addShape()} style={{ width: "300px" }} className='ModalMainButtonGreen'>Добавить форму</div>
                        </div>


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
                                    <p shape={{ fontSize: '32px' }} class='AlertContainerTitle'>
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

    addShape() {
        let objectToAdd = [{ shape_id: 999, shape_name: '' }];
        let newArray = this.state.shapes;
        newArray = [...newArray, ...objectToAdd];

        this.setState({ shapes: newArray })
    }

    deleteShape(id) {
        let origin = this.state.shapes
        origin = origin.filter(a => a.shape_id !== id)
        this.setState({ shapes: origin })


        this.updateProducts(id)
        setTimeout(this.deleteFromBD(id), 2000)
    }


    updateProducts(id) {
        this.state.products.filter(el => Number.parseInt(el.product_shape) === id).map(el => this.updateProductShape(el.product_id))
    }

    updateProductShape(id) {
        const qs = require('qs');
        let data = qs.stringify({
            'shape': '0'
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/updateprod/shape/` + id,
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
            url: `${process.env.REACT_APP_API_URL}/shape/` + id,
            headers: {
                'Content-Type': 'application/x-www-shape-urlencoded'
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

export default ADMIN_EDIT_shapes