import { parseIngredients } from './helpers'

describe('parses ingredients list', () => {
  it('splits input by commas', () => {
    const inputIngredients = 'water,flour,salt'
    const expectedSeparatedIngredients = ['water', 'flour', 'salt']
    const separatedIngredients = parseIngredients(inputIngredients)
    expect(separatedIngredients).toEqual(expectedSeparatedIngredients)
  })
  it('ignores spaces', () => {
    const inputIngredients = 'water ,flour,  salt  '
    const expectedSeparatedIngredients = ['water', 'flour', 'salt']
    const separatedIngredients = parseIngredients(inputIngredients)
    expect(separatedIngredients).toEqual(expectedSeparatedIngredients)
  })
  it('ignores tabs', () => {
    const inputIngredients = 'water\t,\tflour,salt'
    const expectedSeparatedIngredients = ['water', 'flour', 'salt']
    const separatedIngredients = parseIngredients(inputIngredients)
    expect(separatedIngredients).toEqual(expectedSeparatedIngredients)
  })
  it('handles empty string', () => {
    const inputIngredients = ''
    const expectedSeparatedIngredients = []
    const separatedIngredients = parseIngredients(inputIngredients)
    expect(separatedIngredients).toEqual(expectedSeparatedIngredients)
  })
  it('ignores empty ingredients', () => {
    const inputIngredients = 'water,,salt,,,'
    const expectedSeparatedIngredients = ['water', 'salt']
    const separatedIngredients = parseIngredients(inputIngredients)
    expect(separatedIngredients).toEqual(expectedSeparatedIngredients)
  })
  it('ignores duplicated ingredients', () => {
    const inputIngredients = 'water,salt,water'
    const expectedSeparatedIngredients = ['water', 'salt']
    const separatedIngredients = parseIngredients(inputIngredients)
    expect(separatedIngredients).toEqual(expectedSeparatedIngredients)
  })
})
