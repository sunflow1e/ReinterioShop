import React, { Component } from 'react'

export class ContentTitle extends Component{
  render() {
    return (
        <h1 class = "ContentTitle">{this.props.ContentText}</h1>
    )
  }
}

export default ContentTitle