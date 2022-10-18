import supertest from 'supertest'

export default class UserHelper {
  result

  async create() {
    this.result = await supertest(process.env.BASE_URL)
      .post('/users')
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
    return this.result
  }

  async delete(id) {
    this.result = await supertest(process.env.BASE_URL)
      .delete('/users')
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .send({id})
    return this.result
  }

  async get(id = '') {
    this.result = await supertest(process.env.BASE_URL)
      .get(`/users${id === '' ? '' : `?id=${id}`}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
    return this.result
  }
}
