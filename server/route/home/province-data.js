const { Province } = require('../../model/province-data')
const { City } = require('../../model/city-data')

module.exports = async (req, res, next) => {
  let provincelist = req.query.province
    .concat([
      'year',
      'dataIndeCate2',
      'dataIndeCate1',
      'dataIndeCate3',
      'unit',
      'resource'
    ])
    .toString()
    .split(',')
    .join(' ')
  console.log(provincelist)
  let provinceComData
  if (!req.query.year) {
    provinceComData = await Province.find({}, provincelist)
  } else {
    provinceComData = await Province.find(
      { year: { $in: req.query.year } },
      provincelist
    )
  }
  res.send({
    meta: { status: 200 },
    data: { provinceComData, message: '获取省级对比数据成功' }
  })
}
