import React, { Component } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ADMINHeader } from '../components/ADMINHeader';
import axios from 'axios'
import EDIT_MATERIAL from '../components/EDIT_MATERIAL';


export class ADMIN_EDIT_materials extends Component {
    constructor(props) {
        super(props)

        this.state = {
            materials: [],
            orders: [],
            IsModalShown: false,
        }
        this.deleteMaterial = this.deleteMaterial.bind(this)
    }

    componentDidMount() {
        this.getMaterials();
    }

    getMaterials() {
        const qs = require('qs')
        let data = qs.stringify({})

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url:
                `${process.env.REACT_APP_API_URL}/material`,
            headers: {},
            data: data,
        }

        axios
            .request(config)
            .then(response => {
                this.setState({ materials: response.data })
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
                                <h1 class="PageTitleText">Управление материалами</h1>
                            </div>

                            <div class="PageTitleLine"></div>
                        </div>
                        <div>

                        </div>
                        <div className='ReviewCard'>
                            {this.state.materials?.map(material => (
                                <EDIT_MATERIAL
                                    key={material.material_id}
                                    user_id={localStorage.getItem('userId')}
                                    material={material}
                                    deleteMaterial={this.deleteMaterial}
                                />
                            ))}

                            <div onClick={() => this.addMaterial()} style={{ width: "300px" }} className='ModalMainButtonGreen'>Добавить материал</div>
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

    addMaterial() {
        let objectToAdd = [{ material_id: 999, material_name: '' }];
        let newArray = this.state.materials;
        newArray = [...newArray, ...objectToAdd];

        this.setState({ materials: newArray })
    }

    deleteMaterial(id) {
        let origin = this.state.materials
        origin = origin.filter(a => a.material_id !== id)
        this.setState({ materials: origin })


        this.deleteLinksFromBD(id)
        this.deleteFromBD(id)
    }


    deleteLinksFromBD(id) {

        const qs = require('qs');
        let data = qs.stringify({

        });

        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/product/material/` + id,
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
            url: `${process.env.REACT_APP_API_URL}/material/` + id,
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

export default ADMIN_EDIT_materials