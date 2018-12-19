import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RecipeForm from './RecipeForm'
import { parseIngredients } from '../helpers'

export default class RecipeList extends Component {
  state = {
    openRecipe: null,
    isEditRecipeFormOpen: false
  }

  openRecipe = (index) => () => {
    const openRecipe = this.state.openRecipe === index ? null : index
    this.setState({ openRecipe })
  }

  editRecipe = (index) => (recipe) => {
    const recipes = [...this.props.recipes]
    recipe.ingredients = parseIngredients(recipe.ingredients)
    recipes[index] = recipe
    this.setState({ isEditRecipeFormOpen: false })
    this.props.onRecipeChange(recipes)
  }

  deleteRecipe = (index) => () => {
    const recipes = [...this.props.recipes]
    recipes.splice(index, 1)
    this.props.onRecipeChange(recipes)
    this.setState({ openRecipe: null })
  }

  closeEditRecipeForm = () => {
    this.setState({ isEditRecipeFormOpen: false })
  }

  showEditRecipeForm = () => {
    const currentRecipe = this.props.recipes[this.state.openRecipe]
    this.setState({
      isEditRecipeFormOpen: true,
      recipe: {
        recipeName: currentRecipe.recipeName,
        ingredients: currentRecipe.ingredients.join(', ')
      },
    })
  }

  render () {
    if (this.props.recipes.length === 0) {
      return <div><h3>You have no recipes</h3></div>
    }

    return (
      <ul id="recipes" data-testid="recipes">
        {this.props.recipes.map((recipe, index) => (
          <li className="recipe" key={recipe.recipeName}>
            <div className="recipe-header" onClick={this.openRecipe(index)}>{recipe.recipeName}</div>
            {this.state.openRecipe === index && (
              <div className="recipe-details">
                <h3 className="header">Ingredients</h3>
                <ul className="ingredients-list">
                  {recipe.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
                <div className="recipe-actions">
                  <button className="btn btn-danger" onClick={this.deleteRecipe(index)}>Delete</button>
                  <button className="btn" onClick={this.showEditRecipeForm}>Edit</button>
                </div>
                {this.state.isEditRecipeFormOpen && (
                  <RecipeForm recipe={recipe} onSubmit={this.editRecipe(index)} onClose={this.closeEditRecipeForm}
                              formHeader="Edit Recipe" formSubmitText="Edit Recipe" />
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    )
  }
}

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      recipeName: PropTypes.string.isRequired,
      ingredients: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  ).isRequired,
  onRecipeChange: PropTypes.func
}
