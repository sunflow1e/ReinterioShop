import React, { Component } from 'react'
import axios from 'axios'
import FilterColor from './FilterColor';
import Bubble from './Bubble';
import BubbleMaterial from './BubbleMaterial';
import { UploadImage } from './UploadImage';

const hostUrl = process.env.REACT_APP_API_URL + '/uploadfile'

export class ADMIN_ADDP_FILES extends Component {
    constructor(props) {
        super(props)

        this.state = {
            IsModalShown: false,

            selectedFile: null,
            uploaded: null,
        }
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

        this.props.saveFile(data.filePath, this.props.file.file_id)
    }

    render() {

        return (
            <div style={{ padding: "0", boxShadow: "none" }} className='AdminCard'>
                <div className='AdminInfoContainer'>
                    <div style={{ display: "flex", flexDirection: "row", gap: "10px", boxSizing: "border-box", alignItems: "flex-end" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", boxSizing: "border-box", width: "100%" }}>
                            <p className='PageCardText'>Отображаемое название</p>
                            <input
                                pattern='[А-Яа-я]+'
                                id={'file_name' + this.props.file.file_id}
                                autocomplete="off"
                                type='text'
                                maxLength='50'
                                style={{ width: "100%", boxSizing: "border-box", height: "35px" }}
                                className='MainTextArea'
                                defaultValue={this.props.file.file_name}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "flex-end" }} className='AdminInfoContainer'>

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", boxSizing: "border-box", width: "100%" }}>
                        <p className='PageCardText'>Файл</p>
                        <a target="_blank" href={this.props.file.file_path ? '/files/' + this.props.file.file_path : null}>
                            <div
                                style={{ width: "100%", boxSizing: "border-box", height: "35px", cursor: "pointer", justifyContent:"left" }}
                                className='MainTextArea'
                                id={'file_path' + this.props.file.file_id}>{this.props.file.file_path}
                            </div>
                        </a>
                    </div>

                    <div><label htmlFor={'file' + this.props.file.file_id}><div id={'Upload'} className='GrayBlock'><i class='fi fi-rr-clip' /></div></label></div>
                    <input id={'file' + this.props.file.file_id} type='file' className='hidden' onChange={this.handleUpload} accept='.pdf,.word,.excel,.zip,.rar' />


                    <div id={'Delete'} onClick={() => this.openModalWindow()} className='GrayBlock'><i class='fi fi-rr-trash' /></div>
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
                                <p className='ModalTitle'>Удаление файла</p>
                                <p style={{ lineHeight: '150%', fontSize: '18px' }}>
                                    Вы уверены, что хотите удалить файл?
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
                                        onClick={() => this.props.removeFile(this.props.file.file_id)}
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
}

export default ADMIN_ADDP_FILES