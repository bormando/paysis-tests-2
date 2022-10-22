import UserHelper from '../helpers/user.helper'
import {expect} from 'chai'

describe('User', function () {
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

  describe('Delete', function () {
    describe('With existing User ID', function () {
      let response
      const userHelper = new UserHelper()

      before(async function () {
        const userId = (await userHelper.create()).body.id
        response = await userHelper.delete(userId)
      })

      it('Response status code is 200', function () {
        expect(response.statusCode).to.eq(200)
      })

      it('Response body contains success message', function () {
        expect(response.body.message).to.eq('User deleted.')
      })
    })

    describe('With non-existing User ID', function () {
      let response
      const userHelper = new UserHelper()

      before(async function () {
        response = await userHelper.delete('abracadabra')
      })

      it('Response status code is 400', function () {
        expect(response.statusCode).to.eq(400)
      })

      it('Response body contains error message', function () {
        expect(response.body.message).to.eq('No user found.')
      })
    })
  })

  describe('Get', function () {
    describe('All users', function () {
      const userHelper = new UserHelper()
      let response
      let userId1
      let userId2

      before(async function () {
        userId1 = (await userHelper.create()).body.id
        userId2 = (await userHelper.create()).body.id
        response = await userHelper.get()
      })

      after(async function () {
        await userHelper.delete(userId1)
        await userHelper.delete(userId2)
      })

      it('Response status code is 200', function () {
        expect(response.statusCode).to.eq(200)
      })

      it('Response body contains array of at least 2 users', function () {
        expect(response.body.length).to.be.at.least(2)
      })

      it('Users in response body contain user id', function () {
        for (let user of response.body) {
          expect(user.id).to.be.a('string')
        }
      })

      it('Users in response body contain amount', function () {
        for (let user of response.body) {
          expect(user.amount).to.be.a('number')
        }
      })
    })

    describe('Single user', function () {
      const userHelper = new UserHelper()
      let response
      let userId

      before(async function () {
        userId = (await userHelper.create()).body.id
        response = await userHelper.get(userId)
      })

      after(async function () {
        await userHelper.delete(userId)
      })

      it('Response status code is 200', function () {
        expect(response.statusCode).to.eq(200)
      })

      it('Response body contains User ID', function () {
        expect(response.body.id).to.eq(userId)
      })

      it('Response body contains amount', function () {
        expect(response.body.amount).to.be.a('number')
      })
    })
  })
})
