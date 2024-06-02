import React, { Component } from 'react'
import { CategoryCard } from './CategoryCard'

export class CategoriesContainer extends Component {
  render() {
    return (
        <div className = {this.props.small ? "SmallCategoriesContainer" : "CategoriesContainer"}>
            {this.props.categories?.map(CurrentCategory => (
            <CategoryCard changeCurrentCategory = {this.props.changeCurrentCategory} small = {this.props.small} key = {CurrentCategory.category_id} category = {CurrentCategory} />
        ))}
        </div>
    )
  }
}

export default CategoriesContainer