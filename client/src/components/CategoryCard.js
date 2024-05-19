import React, { Component } from 'react'

export class CategoryCard extends Component {

  render() {
    return (
      <div style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.5)), url(img/" + this.props.category.category_image }} class="CategoryCard">
        <h class="CategoryText">{this.props.category.category_name}</h>
      </div>
    )
  }
}

export default CategoryCard