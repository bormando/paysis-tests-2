import express from 'express'
import bodyParser from 'body-parser'

function start(port) {
  const app = express()
  let server
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))

  app.post('/auth', function (req, res) {
    const login = req.body.login
    const password = req.body.password
    if (login === process.env.LOGIN && password === process.env.PASSWORD)
      res.status(200).send({token: '1234567890'})
    else
      res.status(404).send({message: 'Wrong login or password.'})
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
