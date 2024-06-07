import React, { Component } from 'react'
import axios from 'axios'

export class EDIT_STATUS extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Editable: this.props.status.status_id === 999 ? true : false,
            FinishStatus: this.props.status.status_finish,
            IsModalShown: false,
        }
    }

    render() {
        return (
            <div className='EditContainer'>
                <div style={{ color: "#BBBBBB", pointerEvents: "none" }} className='GrayBlock'>{this.props.status.status_id === 999 ? '#' : this.props.status.status_id}</div>
                <input
                    pattern='[А-Яа-я]+'
                    id={'status_name' + this.props.status.status_id}
                    autocomplete="off"
                    type='text'
                    maxLength='50'
                    className='MainTextArea'
                    defaultValue={this.props.status.status_name}
                    readOnly={this.state.Editable ? false : true}
                ></input>

                <div onClick={() => { this.state.Editable ? this.saveStatus() : this.startEdit() }} className={this.state.Editable ? 'GreenBlock' : 'GrayBlock'}>{this.state.Editable ? <i className='fi fi-rr-check'></i> : <i className='fi fi-rr-edit'></i>}</div>

                {this.props.status.status_id > 3 &&
                    <div onClick={() => this.openModalWindow()} className='GrayBlock'><i className='fi fi-rr-trash'></i></div>
                }
                {this.props.status.status_id < 4 &&
                    <div style={{ color: "#BBBBBB", pointerEvents: "none" }} className='GrayBlock'><i className='fi fi-rr-trash'></i></div>
                }

                <div onClick={() => this.state.Editable ? this.changeFinish() : null} id='StatusFinish' className={this.state.FinishStatus ? 'GreenBlock' : 'GrayBlock'}>{this.state.FinishStatus ? 'Конечный статус' : 'В работе'}<i className='fi fi-rr-refresh'></i></div>

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
                                        onClick={() => this.props.deleteStatus(this.props.status.status_id)}
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

    changeFinish() {
        this.setState({ FinishStatus: !this.state.FinishStatus })
    }

    startEdit() {
        this.setState({ Editable: true })
    }

    saveStatus() {
        if (this.props.status.status_id === 999) {
            this.setState({ Editable: false });
            this.AddNew()
            window.location.href = '/admin/edit/status'
        }
        else {
            this.setState({ Editable: false });
            this.saveChanges()
        }
    }

    saveChanges() {
        const qs = require('qs');
        let data = qs.stringify({
            'name': document.getElementById("status_name" + this.props.status.status_id).value,
            'finish': this.state.FinishStatus,
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/status/` + this.props.status.status_id,
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
            'name': document.getElementById("status_name" + this.props.status.status_id).value,
            'finish': this.state.FinishStatus
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_API_URL}/status`,
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

export default EDIT_STATUS