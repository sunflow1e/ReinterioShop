import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class ColorPicker extends Component {
    render() {
        return (
            <a href = {"/product/" + this.props.color.productd_id}>
                <div title={this.props.color.color_name} className={this.props.CurrentColor === this.props.color.color_name ? 'CurrentColorBorder' : 'ColorBorder' }>
                    <div style={{ backgroundColor: this.props.color.color_hex }} className='Color'></div>
                </div>
            </a>
        )
    }
}

export default ColorPicker