const { Nuxt, Builder } = require('nuxt')
const express = require('express')
const app = express()
const port = process.env.PORT || 3001

// We instantiate Nuxt.js with the options
let config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)
app.use(express.static('staticServer'))
app.use(nuxt.render)

// Build only in dev mode
if (config.dev) {
  new Builder(nuxt).build()
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

// Listen the server
app.listen(port, () => {
  console.log('app listen on port ', port)
  // console.log('nuxt', nuxt)
  // nuxt.listen()
})
