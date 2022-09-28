import {expect} from 'chai'

describe('Operations with numbers', function () {
  const a = 5
  const b = 7

  it('Addition works properly', function () {
    expect(a + b).to.eq(12)
  })

  it('Subtraction works properly', function () {
    expect(a - b).to.eq(-2)
  })
})
