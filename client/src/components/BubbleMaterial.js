import React, { Component } from 'react'

export class BubbleMaterial extends Component {
    render() {
        return (
            <div onClick={() => { this.props.changeSelected(this.props.material.material_id, !this.props.material.material_ischecked) }} className={this.props.material.material_ischecked ? 'SelectedBubble' : 'Bubble'}>{this.props.material.material_name}</div>
        )
    }
}

export default BubbleMaterial