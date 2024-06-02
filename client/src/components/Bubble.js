import React, { Component } from 'react'

export class Bubble extends Component {
  render() {
    return (
      <div onClick={() => {this.props.changeSelected(this.props.style.style_id, !this.props.style.style_ischecked)}} className={this.props.style.style_ischecked ? 'SelectedBubble' : 'Bubble'}>{this.props.style.style_name}</div>
    )
  }
}

export default Bubble