export function parseIngredients (ingredients) {
  return Array.from(new Set(ingredients.split(',')
    .map(ingredient => ingredient.trim())
    .filter(ingredient => ingredient.length > 0)
  ))
}
