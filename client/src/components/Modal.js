import React, { Component } from 'react'

export class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div className='ModalBackground'>
                <div className='ModalWindow'>
                    <div onClick={() => this.props.closeModalWindow()} className='CloseModal'><i style={{ color: "#636363" }} class="fi fi-rr-cross-small"></i></div>
                    <div className='ModalContainer'>
                        <p className='ModalTitle'>{this.props.ModalTitle}</p>
                        <p style={{ lineHeight: "150%", fontSize: "20px" }}>{this.props.ModalText}</p>
                    </div>
                </div>
            </div >
        )
    }
}

export default Modal