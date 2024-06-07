import React, { Component } from 'react'
import axios from 'axios'

export class EDIT_DELIVERY extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Editable: this.props.delivery.delivery_id === 999 ? true : false,
            IsModalShown: false,
        }
    }

    render() {
        return (
            <div className='EditContainer'>
                <div style={{ color: "#BBBBBB", pointerEvents: "none" }} className='GrayBlock'>{this.props.delivery.delivery_id === 999 ? '#' : this.props.delivery.delivery_id}</div>
                <input
                    pattern='[А-Яа-я]+'
                    id={'delivery_name' + this.props.delivery.delivery_id}
                    autocomplete="off"
                    type='text'
                    maxLength='50'
                    className='MainTextArea'
                    defaultValue={this.props.delivery.delivery_name}
                    readOnly={this.state.Editable ? false : true}
                ></input>

                <input
                    pattern='[А-Яа-я]+'
                    id={'delprice' + this.props.delivery.delivery_id}
                    autocomplete="off"
                    type='text'
                    maxLength='50'
                    className='MainTextArea'
                    defaultValue={this.props.delivery.delivery_minprice}
                    readOnly={this.state.Editable ? false : true}
                ></input>

                <input
                    pattern='[А-Яа-я]+'
                    id={'delweight' + this.props.delivery.delivery_id}
                    autocomplete="off"
                    type='text'
                    maxLength='50'
                    className='MainTextArea'
                    defaultValue={this.props.delivery.delivery_weightprice}
                    readOnly={this.state.Editable ? false : true}
                ></input>

                <input
                    pattern='[А-Яа-я]+'
                    id={'deldays' + this.props.delivery.delivery_id}
                    autocomplete="off"
                    type='text'
                    maxLength='50'
                    className='MainTextArea'
                    defaultValue={this.props.delivery.delivery_days}
                    readOnly={this.state.Editable ? false : true}
                ></input>

                <div onClick={() => { this.state.Editable ? this.saveDelivery() : this.startEdit() }} className={this.state.Editable ? 'GreenBlock' : 'GrayBlock'}>{this.state.Editable ? <i className='fi fi-rr-check'></i> : <i className='fi fi-rr-edit'></i>}</div>

                {this.props.delivery.delivery_id > 0 &&
                    <div onClick={() => this.openModalWindow()} className='GrayBlock'><i className='fi fi-rr-trash'></i></div>
                }
                {this.props.delivery.delivery_id < 1 &&
                    <div style={{ color: "#BBBBBB", pointerEvents: "none" }} className='GrayBlock'><i className='fi fi-rr-trash'></i></div>
                }

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
                                        onClick={() => this.props.deleteDelivery(this.props.delivery.delivery_id)}
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

    startEdit() {
        this.setState({ Editable: true })
    }

    saveDelivery() {
        if (this.props.delivery.delivery_id === 999) {
            this.setState({ Editable: false });
            this.AddNew()
            window.location.href = '/admin/edit/delivery'
        }
        else {
            this.setState({ Editable: false });
            this.saveChanges()
        }
    }

    saveChanges() {
        const qs = require('qs');
        let data = qs.stringify({
            'name': document.getElementById("delivery_name" + this.props.delivery.delivery_id).value,
            'minprice': document.getElementById("delprice" + this.props.delivery.delivery_id).value,
            'weightprice': document.getElementById("delweight" + this.props.delivery.delivery_id).value,
            'days': document.getElementById("deldays" + this.props.delivery.delivery_id).value,
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/delivery/` + this.props.delivery.delivery_id,
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
            'name': document.getElementById("delivery_name" + this.props.delivery.delivery_id).value,
            'minprice': document.getElementById("delprice" + this.props.delivery.delivery_id).value,
            'weightprice': document.getElementById("delweight" + this.props.delivery.delivery_id).value,
            'days': document.getElementById("deldays" + this.props.delivery.delivery_id).value,
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/delivery`,
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

export default EDIT_DELIVERY