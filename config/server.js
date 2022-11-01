import express from 'express'
import bodyParser from 'body-parser'
import responses from './responses.json'

function start(port) {
  const app = express()
  let server
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))

  app.post('/auth', function (req, res) {
    const login = req.body.login
    const password = req.body.password
    if (login === process.env.LOGIN && password === process.env.PASSWORD)
      res.status(200).send(responses.auth.valid)
    else
      res.status(404).send(responses.auth.incorrect)
  })

  app.post('/users', function (req, res) {
    res.status(200).send(responses.users.create)
  })
  
  app.delete('/users', function (req, res) {
    const userId = req.body.id
    if (userId === responses.users.create.id)
      res.status(200).send(responses.users.delete.existing)
    else
      res.status(400).send(responses.users.delete.nonExisting)
  })
  
  app.get('/users', function (req, res) {
    const userId = req.query.id
    if (userId)
      res.status(200).send({id: userId, amount: 1000})
    else
      res.status(200).send(responses.users.get.all)
  })

  app.post('/transactions', function (req, res) {
    const from = req.body.from
    const to = req.body.to
    const amount = req.body.amount

    if (amount > 0)
      res.status(200).send({
        id: 'a30c513c-be3c-43ad-a92a-450fed274543',
        from,
        to,
        amount,
      })
    else
      res.status(400).send(responses.transactions.create.invalid)
  })

  before(function() {
    server = app.listen(port)
    console.log(`Mock server is running on port ${port}`)
  })

  after(function () {
    server.close()
    console.log(`Mock server has stopped`)
  })
}

export {start}
