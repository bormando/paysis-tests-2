import supertest from 'supertest'
import {expect} from 'chai'

describe('Authentication', function () {
  describe('Log in with valid credentials', function () {
    let response

    before(async function () {
      response = await supertest(process.env.BASE_URL)
        .post('/auth')
        .send({login: process.env.LOGIN, password: process.env.PASSWORD})
    })

    it('Response status code is 200', function () {
      expect(response.statusCode).to.eq(200)
    })

    it('Response body contains token', function () {
      expect(response.body.token).not.to.be.undefined
    })
  })

  describe('Log in with incorrect credentials', function () {
    let response

    before(async function () {
      response = await supertest(process.env.BASE_URL)
        .post('/auth')
        .send({login: 'invalid', password: 'invalid'})
    })

    it('Response status code is 404', function () {
      expect(response.statusCode).to.eq(404)
    })

    it('Response body contains error message', function () {
      expect(response.body.message).to.eq('Wrong login or password.')
    })
  })
})
