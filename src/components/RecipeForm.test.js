import React from 'react'
import ReactDOM from 'react-dom'
import RecipeForm from './RecipeForm'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<RecipeForm recipe={{ recipeName: 'testRecipe', ingredients: [] }} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
