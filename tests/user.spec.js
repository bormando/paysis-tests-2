import UserHelper from '../helpers/user.helper'
import {expect} from 'chai'

describe.only('User', function () {
  describe('Create', function () {
    let response
    const userHelper = new UserHelper()

    before(async function () {
      response = await userHelper.create()
    })

    after(async function () {
      await userHelper.delete(response.body.id)
    })

    it('Response status code is 200', function () {
      expect(response.statusCode).to.eq(200)
    })

    it('Response body contains User ID', function () {
      expect(response.body.id).to.be.a('string')
    })

    it('Response body contains amount', function () {
      expect(response.body.amount).to.be.a('number')
    })
  })
})
