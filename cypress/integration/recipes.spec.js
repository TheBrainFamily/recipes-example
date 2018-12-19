describe('Recipes', function () {
  beforeEach(function () {
    cy.visit('/')
  })

  it('shows an index view where the names of all the recipes are visible', function () {
    const recipes = cy.get('#recipes > li')
    recipes.should('have.length', 2)
    recipes.should('contain', 'Spaghetti')
    recipes.should('contain', 'Onion Pie')
  })

  it('shows a recipe', function () {
    cy.getByText('Spaghetti').click()
    cy.getByText('Spaghetti').should('be.visible')
    cy.getByText('Ingredients').should('be.visible')
    cy.getByText('Noodles').should('be.visible')
    cy.getByText('Tomato Sauce').should('be.visible')
    cy.getByText('(Optional) Meatballs').should('be.visible')
  })

  it('closes a recipe', function () {
    cy.getByText('Spaghetti').click()
    cy.getByText('Noodles').should('be.visible')
    cy.getByText('Spaghetti').click()
    cy.getByTestId('recipes').should('not.contain', 'Noodles')
  })

  it('allows creating recipes that have names and ingredients', function () {
    cy.getByText('Add Recipe').click()
    cy.getByTestId('recipeForm').should('be.visible')
    cy.getByTestId('recipeName').type('Hummus')
    cy.getByTestId('ingredients').type('Chickpea, Cumin, Olive Oil, Lemon Juice, Salt')
    cy.getByTestId('recipeForm').within(() => {
      cy.getByText('Add Recipe').click()
    })
    cy.get('#recipeForm').should('not.be.visible')
    cy.getByText('Hummus').click()
    cy.getByText('Chickpea').should('be.visible')
  })

  it('cannot add a recipe without a name', function () {
    cy.getByText('Add Recipe').click()
    cy.getByTestId('recipeForm').should('be.visible')
    cy.getByTestId('ingredients').type('Chickpea')
    cy.getByTestId('recipeForm').within(() => {
      cy.getByText('Add Recipe').click()
    })

    const recipes = cy.get('#recipes > li')
    recipes.should('have.length', 2)
  })

  it('cannot add duplicating recipes names', function () {
    cy.getByText('Add Recipe').click()
    cy.getByTestId('recipeForm').should('be.visible')
    cy.getByTestId('recipeName').type('Hummus')
    cy.getByTestId('ingredients').type('Chickpea')
    cy.getByTestId('recipeForm').within(() => {
      cy.getByText('Add Recipe').click()
    })

    cy.getByText('Add Recipe').click()
    cy.getByTestId('recipeForm').should('be.visible')
    cy.getByTestId('recipeName').type('Hummus')
    cy.getByTestId('ingredients').type('Chickpea')
    cy.getByTestId('recipeForm').within(() => {
      cy.getByText('Add Recipe').click()
    })

    const recipes = cy.get('#recipes > li')
    recipes.should('contain', 'Hummus')
    recipes.should('have.length', 3)
  })

  it('added recipes are saved in localStorage', function () {
    cy.getByText('Add Recipe').click()
    cy.getByTestId('recipeForm').should('be.visible')
    cy.getByTestId('recipeName').type('Lemon Juice')
    cy.getByTestId('ingredients').type('Water,Lemon')
    cy.getByTestId('recipeForm').within(() => {
      cy.getByText('Add Recipe').click()
    })
    cy.get('#recipeForm').should('not.be.visible')
    cy.getByText('Lemon Juice').click()
    cy.getByText('Water').should('be.visible')
    cy.getByText('Lemon').should('be.visible')

    cy.reload() // reload the page, but without clearing the localStorage

    cy.getByText('Lemon Juice').click()
    cy.getByText('Water').should('be.visible')
    cy.getByText('Lemon').should('be.visible')
  })

  it('allows deleting a recipe', function () {
    cy.getByText('Spaghetti').click()
    cy.getByText('Delete').click()

    const recipes = cy.get('#recipes > li')
    recipes.should('have.length', 1)
    recipes.should('contain', 'Onion Pie')
    recipes.should('not.contain', 'Spaghetti')
    recipes.should('not.contain', 'Ingredients')
  })

  it('deleted recipe is saved in the localStorage', function () {
    cy.getByText('Spaghetti').click()
    cy.getByText('Delete').click()

    cy.reload()

    const recipes = cy.get('#recipes > li')
    recipes.should('have.length', 1)
    recipes.should('contain', 'Onion Pie')
    recipes.should('not.contain', 'Spaghetti')
  })

  it('allows editing a recipe', function () {
    cy.getByText('Spaghetti').click()
    cy.getByText('Noodles').should('be.visible')

    cy.getByText('Edit').click()
    cy.getByTestId('recipeForm').should('be.visible')

    cy.getByTestId('recipeForm').within(() => {
      cy.getByTestId('ingredients').clear()
      cy.getByTestId('ingredients').type('Pasta, Tomato Sauce')
    })
    cy.get('button').contains('Edit Recipe').click()
    cy.get('#recipeForm').should('not.be.visible')
    const recipes = cy.get('#recipes > li')
    recipes.should('contain', 'Pasta')
    recipes.should('not.contain', 'Noodles')
  })

  it('edited recipe is saved in localStorage', function () {
    cy.getByText('Spaghetti').click()
    cy.getByText('Noodles').should('be.visible')

    cy.getByText('Edit').click()
    cy.getByTestId('recipeForm').should('be.visible')

    cy.getByTestId('recipeForm').within(() => {
      cy.getByTestId('ingredients').clear()
      cy.getByTestId('ingredients').type('Pasta, Tomato Sauce')
    })
    cy.get('button').contains('Edit Recipe').click()
    cy.get('#recipeForm').should('not.be.visible')

    cy.reload()

    cy.getByText('Spaghetti').click()
    const recipes = cy.get('#recipes > li')
    recipes.should('contain', 'Pasta')
    recipes.should('not.contain', 'Noodles')
  })

  it('shows a message when the recipe list is empty', function () {
    cy.getByText('Spaghetti').click()
    cy.getByText('Delete').click()
    cy.getByText('Onion Pie').click()
    cy.getByText('Delete').click()

    cy.getByText('You have no recipes').should('be.visible')
    cy.get('#recipes').should('not.be.visible')
  })
})
