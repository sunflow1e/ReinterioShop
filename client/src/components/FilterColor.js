import React, { Component } from 'react'

export class FilterColor extends Component {
    render() {
        return (
            <div title={this.props.color.color_name} onClick={() => this.props.changeSelectedColor(this.props.color.color_id, !this.props.color.color_ischecked )} className={this.props.color.color_ischecked ? 'CurrentColorBorder' : 'ColorBorder'}>
                <div style={{ backgroundColor: this.props.color.color_hex }} className='Color'></div>
            </div>
        )
    }
}

export default FilterColor