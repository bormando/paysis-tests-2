import supertest from 'supertest'
import {expect} from 'chai'

describe('Authentication', function () {
  it('Log in with valid credentials', function () {
    supertest('https://paysis.herokuapp.com')
      .post('/auth')
      .send({login: 'adminius', password: 'supers3cret'})
      .end((err, res) => {
        expect(res.statusCode).to.eq(200)
        expect(res.body.token).not.to.be.undefined
      })
  })

  it('Log in with incorrect credentials', function () {
    supertest('https://paysis.herokuapp.com')
      .post('/auth')
      .send({login: 'invalid', password: 'invalid'})
      .end((err, res) => {
        expect(res.statusCode).to.eq(404)
        expect(res.body.message).to.eq('Wrong login or password.')
      })
  })
})
