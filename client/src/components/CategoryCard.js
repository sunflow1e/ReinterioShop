import React, { Component } from 'react'

export class CategoryCard extends Component {

  render() {
    return (
      <div onClick={() => this.props.small ? this.props.changeCurrentCategory(this.props.category.category_id) : null} style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.5)), url(/img/" + this.props.category.category_image }} className={this.props.small ? "SmallCategoryCard" : "CategoryCard"}>
        <p class="CategoryText">{this.props.category.category_name}</p>
      </div>
    )
  }
}

export default CategoryCard