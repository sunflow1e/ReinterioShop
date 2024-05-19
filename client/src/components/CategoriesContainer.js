import React, { Component } from 'react'
import { CategoryCard } from './CategoryCard'

export class CategoriesContainer extends Component {
  render() {
    return (
        <div class = "CategoriesContainer">
            {this.props.categories?.map(CurrentCategory => (
            <CategoryCard key = {CurrentCategory.category_id} category = {CurrentCategory} />
        ))}
        </div>
    )
  }
}

export default CategoriesContainer