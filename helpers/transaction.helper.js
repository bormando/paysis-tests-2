import supertest from 'supertest'

export default class TransactionHelper {
  result

  async create(from, to, amount) {
    this.result = await supertest(process.env.BASE_URL)
      .post('/transactions')
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .send({from, to, amount})
    return this.result
  }

  async get(id = '') {
    this.result = await supertest(process.env.BASE_URL)
      .get(`/transactions${id === '' ? '' : `?id=${id}`}`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
    return this.result
  }
}
