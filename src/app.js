const express = require('express')
const songRouter = require('./routers/song')

const app = express() 

app.use(express.json())
app.use(songRouter)

module.exports = app