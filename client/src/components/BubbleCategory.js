import React, { Component } from 'react'

export class BubbleCategory extends Component {
  render() {
    return (
        <div onClick={() => {this.props.changeSelected(this.props.subcategory.subcategory_id, !this.props.subcategory.subcategory_ischecked)}} className={this.props.subcategory.subcategory_ischecked ? 'SelectedBubble' : 'Bubble'}>{this.props.subcategory.subcategory_name}</div>
    )
  }
}

export default BubbleCategory