import React, { Component } from 'react'
import axios from 'axios'
import FilterColor from './FilterColor';
import Bubble from './Bubble';
import BubbleMaterial from './BubbleMaterial';
import { UploadImage } from './UploadImage';

export class ADMIN_ADDP_IMAGES extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {

        return (
            <div className='AdminGrayBackground'>

                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ display: "flex", flexDirection: "row", gap: "20px", alignItems: "center", width: "100%" }}>
                        <div title={this.props.productcolor.color_name} className={'ColorBorder'}>
                            <div style={{ backgroundColor: this.props.productcolor.color_hex }} className='Color'></div>
                        </div>
                        <p className='PageCardText'>{this.props.productcolor.color_name}</p>
                    </div>

                    <div className='ReviewPicturesContainer'>
                        <UploadImage productd_id = {this.props.productd_id} small={true} removeImage={this.props.removeImage} uploadImage={this.props.uploadImage} imgnum={1} key={1} isRated={this.state.isRatingSaved} image={this.props.images[0]?.image_path}></UploadImage>
                        <UploadImage productd_id = {this.props.productd_id} small={true} removeImage={this.props.removeImage} uploadImage={this.props.uploadImage} imgnum={2} key={2} isRated={this.state.isRatingSaved} image={this.props.images[1]?.image_path}></UploadImage>
                        <UploadImage productd_id = {this.props.productd_id} small={true} removeImage={this.props.removeImage} uploadImage={this.props.uploadImage} imgnum={3} key={3} isRated={this.state.isRatingSaved} image={this.props.images[2]?.image_path}></UploadImage>
                        <UploadImage productd_id = {this.props.productd_id} small={true} removeImage={this.props.removeImage} uploadImage={this.props.uploadImage} imgnum={4} key={4} isRated={this.state.isRatingSaved} image={this.props.images[3]?.image_path}></UploadImage>
                        <UploadImage productd_id = {this.props.productd_id} small={true} removeImage={this.props.removeImage} uploadImage={this.props.uploadImage} imgnum={5} key={5} isRated={this.state.isRatingSaved} image={this.props.images[4]?.image_path}></UploadImage>
                    </div>

                </div>

                <div className='AdminInfoContainer'>

                    <div style={{ display: "flex", flexDirection: "row", gap: "10px",  boxSizing: "border-box", alignItems: "flex-end", marginTop: "25px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", boxSizing: "border-box", width: "100%" }}>
                            <p className='PageCardText'>В наличии</p>
                            <input
                                pattern='^[ 0-9]+$'
                                id={'product_onstock' + this.props.productcolor.color_id}
                                autocomplete="off"
                                type='text'
                                maxLength='50'
                                style={{ width: "100%",  boxSizing: "border-box", height: "35px" }}
                                className='MainTextArea'
                                defaultValue={this.props.productcolor.product_onstock}
                            />
                        </div>

                        <div style={{ pointerEvents: "none" }} className='GrayBlock'>шт.</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ADMIN_ADDP_IMAGES