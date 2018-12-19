import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class RecipeForm extends Component {
  state = {
    recipe: {
      recipeName: this.props.recipe.recipeName,
      ingredients: this.props.recipe.ingredients.join(', ')
    }
  }

  onInputChange = (fieldName) => (event) => {
    const recipe = { ...this.state.recipe, [fieldName]: event.target.value }
    this.setState({ recipe })
  }

  onSubmit = () => {
    this.props.onSubmit(this.state.recipe)
  }

  render () {
    return <div className="modal" id="recipeForm" data-testid="recipeForm">
      <div className="modal-content">
        <span onClick={this.props.onClose} className="close">&times;</span>
        <div className="header">
          <span>{this.props.formHeader}</span>
        </div>
        <div className="field">
          <label htmlFor="recipeName">Recipe</label><br />
          <input data-testid="recipeName" type="text" placeholder="Recipe Name"
                 value={this.state.recipe.recipeName}
                 onChange={this.onInputChange('recipeName')} />
        </div>
        <div className="field">
          <label htmlFor="ingredients">Ingredients</label><br />
          <textarea data-testid="ingredients" placeholder="Enter ingredients separated by commas"
                    value={this.state.recipe.ingredients}
                    onChange={this.onInputChange('ingredients')} />
        </div>
        <div className="footer">
          <button className="btn btn-primary" onClick={this.onSubmit}>{this.props.formSubmitText}</button>
          <button className="btn" onClick={this.props.onClose}>Close</button>
        </div>
      </div>
    </div>
  }
}

RecipeForm.defaultProps = {
  recipe: {
    recipeName: '',
    ingredients: []
  }
}

RecipeForm.propTypes = {
  recipe: PropTypes.shape({
    recipeName: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  formHeader: PropTypes.string,
  formSubmitText: PropTypes.string
}
