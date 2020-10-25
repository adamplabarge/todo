require('dotenv').config({path: __dirname + '/.env'})
const express = require('express')
const path = require('path')      
const bodyParser = require('body-parser')

const routes = require('./routes')

const app = express()
const port = process.env.PORT || 5000

const apiBase = 'api'
const apiVersion = 'v1.0'

const makeRoute = route => `/${apiBase}/${apiVersion}/${route}`

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

routes.get.forEach(({ route, handler }) => {
  app.get(makeRoute(route), handler)
})

routes.post.forEach(({ route, handler }) => {
  app.post(makeRoute(route), handler)
})

routes.delete.forEach(({ route, handler }) => {
  app.delete(makeRoute(route), handler)
})

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')))

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
  })
}

app.listen(port, () => console.log(`Listening on port ${port}`))