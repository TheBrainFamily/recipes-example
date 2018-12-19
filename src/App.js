import React, { Component } from 'react'
import Alert from 'react-s-alert'
import RecipeList from './components/RecipeList'
import RecipeForm from './components/RecipeForm'
import { parseIngredients } from './helpers'
import { initialRecipes } from './data'

import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/slide.css'

export default class App extends Component {
  constructor (props) {
    super(props)

    const savedRecipes = JSON.parse(localStorage.getItem('recipes'))

    this.state = {
      isAddRecipeFormOpen: false,
      recipes: savedRecipes ? savedRecipes : initialRecipes
    }
  }

  saveRecipes = (recipes) => {
    this.setState({ recipes })
    localStorage.setItem('recipes', JSON.stringify(recipes))
  }

  showAddRecipeForm = () => {
    this.setState({ isAddRecipeFormOpen: true })
  }

  closeAddRecipeForm = () => {
    this.setState({ isAddRecipeFormOpen: false })
  }

  addRecipe = (recipe) => {
    if (recipe.recipeName.trim().length === 0) {
      const errorMessage = 'The recipe name cannot be empty.'
      Alert.error(errorMessage, {
        timeout: 5000
      })
      return
    }
    if (this.state.recipes.find(recipeItem => recipeItem.recipeName === recipe.recipeName)) {
      const errorMessage = 'You cannot add two recipes with the same name.'
      Alert.error(errorMessage, {
        timeout: 5000
      })
      return
    }

    const newRecipe = { ...recipe, ingredients: parseIngredients(recipe.ingredients) }
    const recipes = [...this.state.recipes, newRecipe]
    this.setState({ isAddRecipeFormOpen: false }, () => this.saveRecipes(recipes))
  }

  render () {
    return (
      <div id="app">
        <RecipeList recipes={this.state.recipes} onRecipeChange={this.saveRecipes} />
        <button className="btn btn-primary" onClick={this.showAddRecipeForm}>Add Recipe</button>
        {this.state.isAddRecipeFormOpen && (
          <RecipeForm onSubmit={this.addRecipe}
                      onClose={this.closeAddRecipeForm}
                      formHeader="Add a Recipe"
                      formSubmitText="Add Recipe" />
        )}
        <Alert stack={{ limit: 3 }} />
      </div>
    )
  }
}
