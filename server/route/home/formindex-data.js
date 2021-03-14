const { Province } = require('../../model/province-data')
const { City } = require('../../model/city-data')

module.exports = async (req, res, next) => {
  console.log(req.query.level)
  const level = req.query.level
  let formData = []
  if (level === '省级行政区') {
    formData = await Province.find({}, 'dataIndeCate3 dataIndeCate2 dataIndeCate1')
  } else {
    formData = await City.find({}, 'dataIndeCate3 dataIndeCate2 dataIndeCate1')
  }  
  res.send({
    meta: { status: 200 },
    data: { formData, message: '获取地图依赖数据成功' }
  })
}
