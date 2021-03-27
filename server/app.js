const express = require('express')
const app = express()
// const path = require('path')
// const bodyParser = require('body-parser')
// const session = require('express-session')
const cors = require('cors')
const fs = require('fs')
const https = require('https')

app.use('/uploads', express.static(__dirname + '/uploads'))

app.use(
  cors({
    origin: ['http://localhost:8080'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    alloweHeaders: ['Content-Type', 'Authorization']
  })
)

require('./model/connect')

const home = require('./route/home')

app.use('/', home)
app.use('/admin', admin)

app.listen(8888)
console.log('服务器启动成功')
