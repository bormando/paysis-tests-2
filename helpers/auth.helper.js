import supertest from 'supertest'

export default class AuthHelper {
  result

  async logIn(login, password) {
    this.result = await supertest(process.env.BASE_URL)
      .post('/auth')
      .send({login, password})
    return this.result
  }
}
