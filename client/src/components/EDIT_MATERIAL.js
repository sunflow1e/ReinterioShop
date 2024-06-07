import React, { Component } from 'react'
import axios from 'axios'

export class EDIT_MATERIAL extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Editable: this.props.material.material_id === 999 ? true : false,
            IsModalShown: false,
        }
    }

    render() {
        return (
            <div className='EditContainer'>
                <div style={{ color: "#BBBBBB", pointerEvents: "none" }} className='GrayBlock'>{this.props.material.material_id === 999 ? '#' : this.props.material.material_id}</div>
                <input
                    pattern='[А-Яа-я]+'
                    id={'material_name' + this.props.material.material_id}
                    autocomplete="off"
                    type='text'
                    maxLength='50'
                    className='MainTextArea'
                    defaultValue={this.props.material.material_name}
                    readOnly={this.state.Editable ? false : true}
                ></input>

                <div onClick={() => { this.state.Editable ? this.saveMaterial() : this.startEdit() }} className={this.state.Editable ? 'GreenBlock' : 'GrayBlock'}>{this.state.Editable ? <i className='fi fi-rr-check'></i> : <i className='fi fi-rr-edit'></i>}</div>

                {this.props.material?.material_id > 0 &&
                    <div onClick={() => this.openModalWindow()} className='GrayBlock'><i className='fi fi-rr-trash'></i></div>
                }
                {this.props.material?.material_id < 1 &&
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
                                        onClick={() => this.props.deleteMaterial(this.props.material.material_id)}
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

    saveMaterial() {
        if (this.props.material.material_id === 999) {
            this.setState({ Editable: false });
            this.AddNew()
            window.location.href = '/admin/edit/material'
        }
        else {
            this.setState({ Editable: false });
            this.saveChanges()
        }
    }

    saveChanges() {
        const qs = require('qs');
        let data = qs.stringify({
            'name': document.getElementById("material_name" + this.props.material.material_id).value,
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/material/` + this.props.material.material_id,
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
            'name': document.getElementById("material_name" + this.props.material.material_id).value,
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/material`,
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

export default EDIT_MATERIAL