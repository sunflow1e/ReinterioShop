import axios from 'axios'
import React, { Component } from 'react'


export class LastOrdersPicture extends Component {

    render() {
        return (
            <div>
                {this.props.products.length > 0 &&
                    <div className='LastOrderPicturesContainer'>
                        {this.props.products[0] && (
                            <a style = {{width: "100%", maxWidth: "85px", transition: "all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1)"}} href={this.props.review ? '/reviews' : '/product/' + this.props.products[0].productd_id}>
                            <div
                                className='LastOrderPic'
                                style={{
                                    backgroundImage:
                                        'url(/img/' + this.props.products[0].image_path,
                                }}
                            ></div>
                            </a>
                        )}
                        {this.props.products[1] && (
                            <a style = {{width: "100%", maxWidth: "85px", transition: "all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1)"}} href={this.props.review ? '/reviews' : '/product/' + this.props.products[1].productd_id}>
                            <div
                                className='LastOrderPic'
                                style={{
                                    backgroundImage:
                                        'url(/img/' + this.props.products[1].image_path,
                                }}
                            ></div></a>
                        )}
                        {this.props.products[2] && (
                            <a  style = {{width: "100%", maxWidth: "85px", transition: "all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1)"}} href={this.props.review ? '/reviews' : '/product/' + this.props.products[2].productd_id}>
                            <div
                                className='LastOrderPic'
                                style={{
                                    backgroundImage:
                                        'url(/img/' + this.props.products[2].image_path,
                                }}
                            ></div></a>
                        )}
                        {this.props.products[3] && (
                            <a style = {{width: "100%", maxWidth: "85px", transition: "all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1)"}} href={this.props.review ? '/reviews' : '/product/' + this.props.products[3].productd_id}>
                            <div
                                className='LastOrderPic'
                                style={{
                                    backgroundImage:
                                        'url(/img/' + this.props.products[3].image_path,
                                }}
                            ></div></a>
                        )}
                        {this.props.products[4] && (
                            <a style = {{width: "100%", maxWidth: "85px", transition: "all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1)"}} href={this.props.review ? '/reviews' : '/product/' + this.props.products[0].productd_id}>
                            <div
                                className='LastOrderPic'
                                style={{
                                    backgroundImage:
                                        'url(/img/' + this.props.products[4].image_path,
                                }}
                            ></div></a>
                        )}
                    </div>
                }
            </div>
        )
    }
}

export default LastOrdersPicture