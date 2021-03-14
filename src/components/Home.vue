/* eslint-disable */
<template>
  <div class="home_container">
    <header>
      <router-link to="/">
        <img src="../assets/city-data.png" />
      </router-link>
      <div class="headersection">
        <router-link to="/city"><span>城市对比</span></router-link>
        <router-link to="/province"><span>省份对比</span></router-link>
        <router-link to="/bbs"><span>论坛</span></router-link>
        <span>搜索</span>
        <router-link to="/people" class="people"
          ><span>个人中心</span></router-link
        >
      </div>
    </header>
    <div class="main">
      <div class="main-map">
        <div class="filter">
          <div>
            <span class="filtertext">筛选</span>
            <div class="bgcolor"></div>
          </div>
          <!-- 表单区 -->
          <el-form ref="form" :model="queryMapInfo" label-width="70px">
            <!-- 区域选择区 -->
            <i class="el-icon-location-information">
              <span class="subfiltermenu">区域</span>
            </i>
            <el-form-item size="mini">
              <el-radio-group
                v-model="queryMapInfo.level"
                @change="handleLevelChange()"
              >
                <el-radio label="省级行政区" value="省级行政区"
                  >省级行政区</el-radio
                >
                <el-radio label="地级行政区" value="地级行政区"
                  >地级行政区</el-radio
                >
              </el-radio-group>
            </el-form-item>

            <!-- 时间选择区 -->
            <i class="el-icon-date">
              <span class="subfiltermenu">时间</span>
            </i>
            <el-form-item size="mini" class="timeinput">
              <el-select
                v-model="queryMapInfo.year"
                placeholder="请选择时间"
                @change="handleYearChange"
              >
                <el-option label="2020" value="2020"></el-option>
                <el-option label="2019" value="2019"></el-option>
                <el-option label="2018" value="2018"></el-option>
                <el-option label="2017" value="2017"></el-option>
                <el-option label="2016" value="2016"></el-option>
                <el-option label="2015" value="2015"></el-option>
              </el-select>
            </el-form-item>

            <!-- 指标选择区 -->
            <i class="el-icon-news">
              <span class="subfiltermenu">指标</span>
            </i>
            <el-form-item size="mini" class="cateinput">
              <el-cascader
                :options="options"
                :props="{ expandTrigger: 'hover', value: 'index' }"
                @change="handleIndexChange"
              ></el-cascader>
            </el-form-item>
          </el-form>

          <!-- 论坛banner区 -->
          <div class="homepic">
            <span>#湖北城市论坛</span>
            <img
              src="../../server/uploads/img/province-city-img/wuhan.jpg"
              alt=""
            />
          </div>
        </div>
        <div class="graph">
          <div id="myChart"></div>
          <div id="myChartColumn"></div>
        </div>
      </div>
      <div class="secondclass">
        <div>fuck</div>
      </div>
    </div>
    <footer>
      <i>
        <span>备案</span>
      </i>
    </footer>
  </div>
</template>

<script>
import chinaMapJson from '../assets/map/china-province.json'
import chinaCityMapJson from '../assets/map/china-province-city.json'
import { getProvinceName } from '../utils/getProvinceName'
import { getProvinceCode } from '../utils/getProvinceCode'

export default {
  data() {
    return {
      chinaMap: '',
      myChart: '',
      queryMapInfo: {
        year: 2019,
        quarter: '',
        dataIndeCate3: '人均地区生产总值',
        level: '省级行政区'
      },
      // 地图数据
      mapData: [],
      // 柱状图种类
      columnCategory: [],
      // 柱状图值
      columnValue: [],
      min: '',
      max: '',
      unit: '',
      // 级联index
      options: [],
      index: [],
      // 决定加载地图和相应数据的方式 0: 省级 / 1:地级市 / else:其他
      code: 0,
      // 决定加载具体的省份名称
      provinceToMap: ''
    }
  },
  mounted() {
  },
  created() {
    this.getMapData()
    this.getFormIndexData()
  },
  methods: {
    drawMapGraph(code, name) {
      this.myChart = this.$echarts.init(document.getElementById('myChart'))
      let optionMap
      // 省级行政区
      if (code === 0) {
        this.loadMapJson(code)
        this.$echarts.registerMap('chinaMap', this.chinaMap)
        optionMap = {
          title: {
            text:
              this.queryMapInfo.year +
              '年各省' +
              this.queryMapInfo.dataIndeCate3,
            subtext: '单位：' + this.unit,
            textStyle: {
              fontWeight: 'bolder'
            },
            padding: 15
          },
          tooltip: {
            show: true,
            trigger: 'item',
            formatter: function(params) {
              const info = getProvinceName(params.name)
              const value = params.value
              if (info) {
                return info + params.value
              } else {
                return String(value)
              }
            },
            padding: 5,
            backgroundColor: '#eeeeee',
            textStyle: {
              fontSize: 10,
              fontWeight: 'bolder'
            }
          },
          visualMap: {
            min: this.min,
            max: this.max,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            inRange: {
              color: ['#eeeeee', '#d50000']
            },
            padding: 15
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'bottom',
            feature: {
              restore: {},
              saveAsImage: {}
            },
            padding: [0, 0, 15, 0]
          },
          series: [
            {
              type: 'map',
              map: 'chinaMap',
              roam: true,
              zoom: 1.4,
              scaleLimit: {
                min: 1,
                max: 5
              },
              center: [103.5363, 35.8572],
              itemStyle: {
                // borderWidth: 0
              },
              data: this.mapData
            }
          ]
        }
      } else if (code === 1) {
        this.$echarts.registerMap('chinaMap', this.chinaMap)
        optionMap = {
          title: {
            text:
              this.queryMapInfo.year +
              '年各地级市' +
              this.queryMapInfo.dataIndeCate3,
            subtext: '单位：' + this.unit,
            textStyle: {
              fontWeight: 'bolder'
            },
            padding: 15
          },
          tooltip: {
            show: true,
            trigger: 'item',
            formatter: function(params) {
              const info = getProvinceName(params.name)
              const value = params.value
              if (info) {
                return info + params.value
              } else {
                return String(value)
              }
            },
            padding: 5,
            backgroundColor: '#eeeeee',
            textStyle: {
              fontSize: 10,
              fontWeight: 'bolder'
            }
          },
          visualMap: {
            min: this.min,
            max: this.max,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            inRange: {
              color: ['#eeeeee', '#d50000']
            },
            padding: 15
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'bottom',
            feature: {
              restore: {},
              saveAsImage: {}
            },
            padding: [0, 0, 15, 0]
          },
          series: [
            {
              type: 'map',
              map: 'chinaMap',
              roam: true,
              zoom: 1.4,
              scaleLimit: {
                min: 1,
                max: 5
              },
              center: [103.5363, 35.8572],
              itemStyle: {
                borderWidth: 0
              },
              data: this.mapData
            }
          ]
        }
      } else {
        this.loadMapJson(code)
        this.$echarts.registerMap('chinaMap', this.chinaMap)
        optionMap = {
          title: {
            text:
              this.queryMapInfo.year +
              '年' +
              name +
              this.queryMapInfo.dataIndeCate3,
            subtext: '单位：' + this.unit,
            textStyle: {
              fontWeight: 'bolder'
            },
            padding: 15
          },
          // tooltip: {
          //   show: true,
          //   trigger: 'item',
          //   formatter: function(params) {
          //     const info = getProvinceName(params.name)
          //     const value = params.value
          //     if (info) {
          //       return info + params.value
          //     } else {
          //       return String(value)
          //     }
          //   },
          //   padding: 5,
          //   backgroundColor: '#eeeeee',
          //   textStyle: {
          //     fontSize: 10,
          //     fontWeight: 'bolder'
          //   }
          // },
          visualMap: {
            min: this.min,
            max: this.max,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            inRange: {
              color: ['#eeeeee', '#d50000']
            },
            padding: 15
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'bottom',
            feature: {
              restore: {},
              saveAsImage: {}
            },
            padding: [0, 0, 15, 0]
          },
          series: [
            {
              type: 'map',
              map: 'chinaMap',
              roam: true,
              zoom: 1,
              scaleLimit: {
                min: 1,
                max: 4
              },
              // center: [104.2363, 35.8572],
              itemStyle: {
                // borderWidth: 0
              },
              data: this.mapData
            }
          ]
        }
      }
      this.myChart.setOption(optionMap, true)
      const that = this
      this.myChart.on('click', function(arg) {
        that.code = getProvinceCode(arg.name)
        that.queryMapInfo.level = '地级行政区'
        that.provinceToMap = arg.name
        that.getMapData()
        that.drawMapGraph(code, arg.name)
        console.log(that.mapData)
      })
      this.myChart.on('mouseover', function(params) {
        // console.log(params)
        that.myChartColumn.dispatchAction({
          type: 'highlight',
          dataIndex: params.dataIndex,
          seriesIndex: 0
        })
      })
      this.myChart.on('mouseout', function(params) {
        that.myChartColumn.dispatchAction({
          type: 'downplay',
          dataIndex: params.dataIndex,
          seriesIndex: 0
        })
      })
    },
    drawBarGraph() {
      this.myChartColumn = this.$echarts.init(
        document.getElementById('myChartColumn')
      )
      const optionColumn = {
        xAxis: {
          type: 'value',
          inverse: false,
          splitNumber: 3
        },
        yAxis: {
          type: 'category',
          data: this.columnCategory,
          axisTick: {
            alignWithLabel: true
          }
        },
        grid: {
          top: 15,
          bottom: 35,
          left: 60,
          right: 40
        },
        series: [
          {
            type: 'bar',
            itemStyle: {
              color: '#cd5651',
              borderRadius: [0, 7, 7, 0]
            },
            emphasis: {
              itemStyle: {
                color: 'rgb(250, 208, 1)',
                borderRadius: [0, 7, 7, 0]
              }
            },
            label: {
              show: true,
              position: 'right',
              formatter: function(p) {
                let value = ''
                if (p.value > 0) {
                  value = p.value
                  if (value > 999) {
                    // 数值加千分号
                    const parts = value.toString().split('.')
                    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    value = parts.join('.')
                  }
                }
                return value
              }
            },
            data: this.columnValue
          }
        ]
      }
      this.myChartColumn.setOption(optionColumn, true)
      this.myChartColumn.on('mouseover', function(params) {
        // console.log(params)
      })
    },
    async getFormIndexData() {
      this.options = []
      const { data: res } = await this.$http.get('/formindex-data', {
        params: { level: this.queryMapInfo.level }
      })
      const set1 = new Set()
      const set2 = new Set()
      const set3 = new Set()
      const that = this
      res.data.formData.forEach((value, index, arr) => {
        if (
          !set1.has(value.dataIndeCate1) ||
          !set2.has(value.dataIndeCate2) ||
          !set3.has(value.dataIndeCate3)
        ) {
          if (!set1.has(value.dataIndeCate1)) {
            if (!set2.has(value.dataIndeCate2)) {
              const index1 = {}
              const index2 = {}
              const index3 = {}
              index3.index = value.dataIndeCate3
              index3.label = value.dataIndeCate3
              index3.children = ''
              index2.index = value.dataIndeCate2
              index2.label = value.dataIndeCate2
              index2.children = []
              index2.children.push(index3)
              index1.index = value.dataIndeCate1
              index1.label = value.dataIndeCate1
              index1.children = []
              index1.children.push(index2)
              that.options.push(index1)
            } else {
              const index2 = {}
              const index3 = {}
              index3.index = value.dataIndeCate3
              index3.label = value.dataIndeCate3
              index3.children = ''
              index2.index = value.dataIndeCate2
              index2.label = value.dataIndeCate2
              index2.children = index3
              that.options.children.push(index2)
            }
          } else {
            if (!set2.has(value.dataIndeCate2)) {
              const index2 = {}
              const index3 = {}
              index3.index = value.dataIndeCate3
              index3.label = value.dataIndeCate3
              index3.children = ''
              index2.index = value.dataIndeCate2
              index2.label = value.dataIndeCate2
              index2.children = []
              index2.children.push(index3)
              const length = that.options.length
              that.options[length - 1].children.push(index2)
            } else {
              const index3 = {}
              index3.index = value.dataIndeCate3
              index3.label = value.dataIndeCate3
              index3.children = ''
              const length1 = that.options.length
              const length2 = that.options[length1 - 1].children.length
              that.options[length1 - 1].children[length2 - 1].children.push(
                index3
              )
            }
          }
          set1.add(value.dataIndeCate1)
          set2.add(value.dataIndeCate2)
          set3.add(value.dataIndeCate3)
        }
      })
      // console.log(this.options)
    },
    async getMapData() {
      const { data: res } = await this.$http.get('/map-data', {
        params: this.queryMapInfo
      })
      this.unit = res.data.mapData[0].unit
      const provinceArray = Object.keys(res.data.mapData[0]).slice(11)
      const that = this
      for (let i = 0; i < provinceArray.length; i++) {
        const newdata = {}
        newdata.name = provinceArray[i]
        newdata.value = Math.round(Number(res.data.mapData[0][provinceArray[i]]))
        if (newdata.value) {
          that.mapData.push(newdata)
        }
      }
      this.mapData.sort(function(a, b) {
        return a.value - b.value
      })
      // console.log(this.mapData)
      // console.log(1)
      for (let i = 0; i < this.mapData.length; i++) {
        if (this.mapData[i].value) {
          that.columnCategory.push(this.mapData[i].name)
          that.columnValue.push(this.mapData[i].value)
        }
      }
      this.columnCategory.forEach((value, index, arr) => {
        // console.log(value.length)
        if (value.length === 6) {
          arr[index] = value.slice(0, 3)
        } else if (value.length > 4) {
          arr[index] = value.slice(0, 2)
        } else {
          arr[index] = value.slice(0, value.length - 1)
        }
      })
      this.min = Math.min.apply(null, this.columnValue)
      this.max = Math.max.apply(null, this.columnValue)
      this.columnCategory = this.columnCategory.slice(-31)
      this.columnValue = this.columnValue.slice(-31)
      // console.log(this.columnCategory)
      // console.log(this.columnValue)
      // console.log(this.mapData)
      if (this.queryMapInfo.level === '省级行政区') {
        that.drawMapGraph(0)
      } else if (this.code !== 0 && this.code !== 1) {
        that.drawMapGraph(that.code, that.provinceToMap)
      } else {
        that.drawMapGraph(1)
      }
      this.drawBarGraph()
    },
    loadMapJson(code) {
      if (code === 0) {
        this.chinaMap = chinaMapJson
      } else {
        const currentMap = require('../assets/map/province/' + code + '.json')
        // console.log(3)
        this.chinaMap = currentMap
      }
    },
    handleIndexChange(value) {
      this.queryMapInfo.dataIndeCate3 = value[2]
      // console.log(value[2])
      this.clearMap()
      this.getMapData()
    },
    handleYearChange() {
      this.clearMap()
      this.getMapData()
    },
    handleLevelChange() {
      const that = this
      // console.log(this.queryMapInfo.level)
      if (this.queryMapInfo.level === '地级行政区') {
        that.chinaMap = chinaCityMapJson
        that.queryMapInfo.dataIndeCate3 = '地区生产总值'
        that.clearMap()
        that.getMapData()
      } else {
        that.queryMapInfo.level = '省级行政区'
        that.clearMap()
        that.getMapData()
      }
    },
    clearMap () {
      this.columnValue = []
      this.mapData = []
      this.columnCategory = []
      this.min = ''
      this.max = ''
      this.unit = ''
    }
  },
  watch: {
    'queryMapInfo.level'(val) {
      this.getFormIndexData()
    }
  }
}
</script>

<style lang="less" scoped>
.home_container {
  margin: 0;
  padding: 0;
  height: auto;
  // height: 100%;
}

header {
  border-bottom: 1px solid #e1e2e1;
  height: 80px;
  img {
    float: left;
    height: 25px;
    padding-left: 25px;
    margin-top: 27px;
  }
  .headersection {
    height: 70px;
    float: left;
    text-decoration: none;
    a {
      text-decoration: none;
      span {
        line-height: 80px;
        padding-left: 70px;
        font-size: 14px;
        color: #808080;
      }
    }
    span {
      line-height: 80px;
      padding-left: 70px;
      font-size: 14px;
      color: #808080;
      text-decoration: none;
    }
  }
}

.main {
  // height: 520px;
  width: 100%;
  margin-top: 50px;
  .main-map {
    // float: right;
    width: 92%;
    padding: 0 4%;
    height: 78vh;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    .filter {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      width: 25%;
      height: 100%;
      padding-right: 6%;
      .filtertext {
        display: block;
        font-size: 30px;
        line-height: 28px;
        font-weight: bold;
      }
      .bgcolor {
        position: relative;
        border-radius: 5px;
        top: -15px;
        width: 40%;
        height: 25px;
        background-color: #fadf6d;
        z-index: -100;
      }
      .el-form {
        .subfiltermenu {
          font-weight: bold;
          margin-left: 5px;
          font-size: 16px;
        }
        .timeinput {
          /deep/ .el-input {
            width: 120%;
            padding-left: 0;
          }
        }
        .cateinput {
          /deep/ .el-input {
            width: 180%;
            padding-left: 0;
          }
        }
        i {
          margin-bottom: 5px;
          margin-top: 8px;
        }
      }
      .homepic {
        text-align: center;
        span {
          color: #ffffff;
          font-size: 16px;
          height: 0;
          position: relative;
          display: block;
          top: 45%;
          margin: 0 auto;
        }
        img {
          display: block;
          border-radius: 8px;
          width: 100%;
        }
      }
    }
  }
  .secondclass {
    margin-top: 50px;
    width: 100%;
    height: 800px;
    background-color: #fafafb;
  }
}

.graph {
  width: 75%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 25px;
  background-color: #f3f3f4;
  overflow: hidden;
}
#myChart {
  width: 66.6%;
  height: 100%;
  padding: 0;
  // float: left;
  box-sizing: border-box;
  // background-color: #f3f3f4;
  // border-top: 2px solid #000000;
  // border-bottom: 2px solid #000000;
}

#myChartColumn {
  width: 33.4%;
  height: 100%;
  // float: left;
  box-sizing: border-box;
  // background-color: #f3f3f4;
  // border-top: 2px solid #000000;
  // border-bottom: 2px solid #000000;
}

footer {
  height: 40px;
  margin: 0 4%;
  width: 92%;
  margin-top: 50px;
  border-top: 1px solid #e1e2e1;
  line-height: 40px;
  span {
    padding-left: 25px;
    padding-right: 25px;
  }
}

/deep/ .el-input__inner {
  border: 0;
  border-bottom: 1px solid #e7e7e9;
  border-radius: 0;
  padding-left: 0;
}

/deep/ .el-form-item__content {
  padding: 0;
  margin: 0 !important;
}

/deep/ .el-radio__label {
  font-size: 14px;
  font-weight: normal;
}

/deep/ .el-input__suffix {
  right: -7px;
}
</style>
