const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  dataIndeCate3: {
    type: String,
    required: true
  },
  dataIndeCate2: {
    type: String,
    required: true
  },
  dataIndeCate1: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  quarter: {
    type: Number,
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  resource: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  updatetime: {
    type: Date,
    required: true
  },
  北京市: {
    type: Number
  },
  天津市: {
    type: Number
  },
  河北省: {
    type: Number
  },
  山西省: {
    type: Number
  },
  内蒙古自治区: {
    type: Number
  },
  辽宁省: {
    type: Number
  },
  吉林省: {
    type: Number
  },
  黑龙江省: {
    type: Number
  },
  上海市: {
    type: Number
  },
  江苏省: {
    type: Number
  },
  浙江省: {
    type: Number
  },
  安徽省: {
    type: Number
  },
  福建省: {
    type: Number
  },
  江西省: {
    type: Number
  },
  山东省: {
    type: Number
  },
  河南省: {
    type: Number
  },
  湖北省: {
    type: Number
  },
  湖南省: {
    type: Number
  },
  广东省: {
    type: Number
  },
  广西壮族自治区: {
    type: Number
  },
  海南省: {
    type: Number
  },
  重庆市: {
    type: Number
  },
  四川省: {
    type: Number
  },
  贵州省: {
    type: Number
  },
  云南省: {
    type: Number
  },
  西藏自治区: {
    type: Number
  },
  陕西省: {
    type: Number
  },
  甘肃省: {
    type: Number
  },
  青海省: {
    type: Number
  },
  宁夏回族自治区: {
    type: Number
  },
  新疆维吾尔自治区: {
    type: Number
  }
})

const Province = mongoose.model('Province', userSchema)

// Province.create({
//   dataIndeCate3: '地区生产总值',
//   dataIndeCate2: '地区生产总值',
//   dataIndeCate1: '国民经济核算',
//   year: 2015,
//   quarter: 0,
//   month: 0,
//   unit: '亿元',
//   resource: '国家统计局',
//   updatetime: '2021/2/27',
//   北京市: 24779.1,
//   天津市: 10879.5,
//   河北省: 26398.4,
//   山西省: 11836.4,
//   内蒙古自治区: 12949,
//   辽宁省: 20210.3,
//   吉林省: 10018,
//   黑龙江省: 11690,
//   上海市: 26887,
//   江苏省: 71255.9,
//   浙江省: 43507.7,
//   安徽省: 23831.2,
//   福建省: 26819.5,
//   江西省: 16780.9,
//   山东省: 55288.8,
//   河南省: 37084.1,
//   湖北省: 30344,
//   湖南省: 28538.6,
//   广东省: 74732.4,
//   广西壮族自治区: 14797.8,
//   海南省: 3734.2,
//   重庆市: 16040.5,
//   四川省: 30342,
//   贵州省: 10541,
//   云南省: 14960,
//   西藏自治区: 1043,
//   陕西省: 17898.8,
//   甘肃省: 6556.6,
//   青海省: 2011,
//   宁夏回族自治区: 2579.4,
//   新疆维吾尔自治区: 9306.9
// })

module.exports = {
  Province
}
