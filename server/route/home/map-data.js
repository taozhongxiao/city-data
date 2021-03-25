const { Province } = require('../../model/province-data')
const { City } = require('../../model/city-data')

module.exports = async (req, res, next) => {
  let year = req.query.year
  let cate = req.query.dataIndeCate3
  let level = req.query.level
  if (level === '省级行政区') {
    const mapData = await Province.find({ $and: [{ dataIndeCate3: cate }, { year: year }] }, '')
    res
      .send({
        meta: { status: 200 },
        data: { mapData , message: '获取省级地图依赖数据成功' }
    }) 
  } else {
    const mapData = await City.find({ $and: [{ dataIndeCate3: cate }, { year: year }] }, '')   
    res
      .send({
        meta: { status: 200 },
        data: { mapData , message: '获取地级市地图依赖数据成功' }
    }) 
  }
}