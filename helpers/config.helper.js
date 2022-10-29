import supertest from 'supertest'

export default class ConfigHelper {
  result

  async delete() {
    this.result = supertest(process.env.BASE_URL)
      .delete('/config')
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
    return this.result
  }
}
