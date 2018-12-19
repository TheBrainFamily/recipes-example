import React from 'react'
import ReactDOM from 'react-dom'
import 'jest-dom/extend-expect'
import { render, fireEvent, within } from 'react-testing-library'
import App from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

describe('data is saved in the localStorage', () => {
  const initialRecipes = [
    {
      recipeName: 'Spaghetti',
      ingredients: [
        'Noodles',
        'Tomato Sauce',
        '(Optional) Meatballs'
      ],
    },
    {
      recipeName: 'Onion Pie',
      ingredients: ['Onion', 'Pie'],
    }
  ]

  beforeEach(() => {
    localStorage.clear()
    localStorage.setItem.mockClear()
  })

  it('should read recipes from localStorage', () => {
    render(<App />)
    expect(localStorage.getItem).toHaveBeenCalledWith('recipes')
  })

  it('should initialize recipes in app when localStorage is empty', async () => {
    const { getByTestId } = render(<App />)
    expect(localStorage.__STORE__.recipes).toBe(undefined)
    expect(getByTestId('recipes')).toHaveTextContent('Spaghetti')
    expect(getByTestId('recipes')).toHaveTextContent('Onion Pie')
  })

  it('should add a new recipe to localStorage', () => {
    const { getByTestId, getByText } = render(<App />)
    const newRecipe = {
      recipeName: 'recipeName',
      ingredients: ['Chickpea', 'Cumin']
    }
    const expectedSavedRecipes = JSON.stringify([...initialRecipes, newRecipe])

    fireEvent.click(getByText('Add Recipe'))
    fireEvent.change(getByTestId('recipeName'), {
      target: { value: newRecipe.recipeName },
    })
    fireEvent.change(getByTestId('ingredients'), {
      target: { value: 'Chickpea, Cumin' },
    })
    const addRecipeButton = within(getByTestId('recipeForm')).getByText('Add Recipe')
    fireEvent.click(addRecipeButton)

    expect(localStorage.setItem).toHaveBeenCalledWith('recipes', expectedSavedRecipes)
    expect(localStorage.__STORE__.recipes).toEqual(expectedSavedRecipes)
  })
})
