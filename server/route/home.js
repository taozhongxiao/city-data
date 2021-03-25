const express = require('express')

const home = express.Router()

home.get('/map-data', require('./home/map-data'))
home.get('/formindex-data', require('./home/formindex-data'))
home.get('/timeindex-data', require('./home/timeindex-data'))
home.get('/province-data', require('./home/province-data'))

//将路由对象做为模块成员进行导出
module.exports = home
