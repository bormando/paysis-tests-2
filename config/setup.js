import 'dotenv/config'
import AuthHelper from '../helpers/auth.helper'

before(async function () {
  const authHelper = new AuthHelper()
  await authHelper.logIn(process.env.LOGIN, process.env.PASSWORD)
  process.env['TOKEN'] = authHelper.result.body.token
})
