const { City } = require('../../model/city-data')

module.exports = async (req, res, next) => {
  let cityList = req.query.city
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
  console.log(cityList)
  let cityComData
  if (!req.query.year) {
    cityComData = await City.find({}, cityList)
  } else {
    cityComData = await City.find(
      { year: { $in: req.query.year } },
      cityList
    )
  }
  res.send({
    meta: { status: 200 },
    data: { cityComData, message: '获取地级对比数据成功' }
  })
  console.log(cityComData)
}
