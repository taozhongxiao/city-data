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
        <span></span>
        <div class="mainMenuSearch">
          <input type="text" placeholder="搜索" />
          <i class="el-icon-search" style="font-size: 18px"></i>
        </div>
        <span></span>
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
                <el-option
                  v-for="item in years"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
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
            <router-link to="/bbs">
              <span>#{{ imgInfo.name }}</span>
              <img :src="imgInfo.url" alt="" />
            </router-link>
          </div>
        </div>
        <div class="graph">
          <div id="myChart"></div>
          <div id="myChartColumn"></div>
        </div>
      </div>
      <div class="cityCompare">
        <div class="cityCompareTitle">
          <p>探索城市数据</p>
          <span
            >国民经济、人口、财政、就业及工资、资源与环境等多维度数据，全方位对比中国城市。</span
          >
          <div>
            <router-link to="/city"
              ><div><span>对比城市</span></div></router-link
            >
            <router-link to="/province"
              ><div><span>对比省份</span></div></router-link
            >
          </div>
        </div>
        <div class="cityImg">
          <img src="../assets/528.jpg" alt="" />
        </div>
      </div>
      <div class="bbsArea">
        <div class="bbsContent">
          <div class="bbsContentC">
            <p>交流城市发展</p>
            <span
              >分享你在城市的生活感受、对城市发展的见解、关于城市未来的憧憬。</span
            >
            <div>
              <router-link to="/bbs"
                ><div><span>城市论坛</span></div></router-link
              >
            </div>
          </div>
          <div class="bbsContentI">
            <img src="../assets/bbs1.jpg" alt="" />
            <img src="../assets/bbs3.jpg" alt="" />
            <img src="../assets/bbs4.jpg" alt="" />
            <img src="../assets/bbs2.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
    <footer>
      <a
        href="https://github.com/taozhongxiao"
        title="github"
        target="_blank"
        class="iconfont"
        >&#xe6f6;</a
      >
      <a class="identity" href="http://beian.miit.gov.cn/" target="_blank"
        >鄂ICP备2021002553号</a
      >
      <p>Hosted by <b>taozhongxiao</b></p>
    </footer>
  </div>
</template>

<script>
import chinaMapJson from '../assets/map/china-province.json'
import chinaCityMapJson from '../assets/map/china-province-city.json'
import { getProvinceCityName } from '../utils/getProvinceCityName'
import { getProvinceName } from '../utils/getProvinceName'
import { getProvinceCode } from '../utils/getProvinceCode'

export default {
  data() {
    return {
      chinaMap: '',
      myChart: '',
      myChartColumn: '',
      queryMapInfo: {
        year: 2019,
        quarter: '',
        dataIndeCate3: '人均地区生产总值',
        level: '省级行政区',
        // 决定加载具体的省份名
        provinceToMap: ''
      },
      // 地图数据
      mapData: [],
      // 柱状图种类
      columnData: [],
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
      years: [],
      imgInfo: {
        name: '湖北省论坛',
        url: require('../../server/uploads/img/province-city-img/湖北省.jpg')
      },
      imgPath: {
        北京市: require('../../server/uploads/img/province-city-img/北京市.jpg'),
        天津市: require('../../server/uploads/img/province-city-img/天津市.jpg'),
        河北省: require('../../server/uploads/img/province-city-img/河北省.jpg'),
        山西省: require('../../server/uploads/img/province-city-img/山西省.jpg'),
        内蒙古自治区: require('../../server/uploads/img/province-city-img/内蒙古自治区.jpg'),
        辽宁省: require('../../server/uploads/img/province-city-img/辽宁省.jpg'),
        吉林省: require('../../server/uploads/img/province-city-img/吉林省.jpg'),
        黑龙江省: require('../../server/uploads/img/province-city-img/黑龙江省.jpg'),
        上海市: require('../../server/uploads/img/province-city-img/上海市.jpg'),
        江苏省: require('../../server/uploads/img/province-city-img/江苏省.jpg'),
        浙江省: require('../../server/uploads/img/province-city-img/浙江省.jpg'),
        安徽省: require('../../server/uploads/img/province-city-img/安徽省.jpg'),
        福建省: require('../../server/uploads/img/province-city-img/福建省.jpg'),
        江西省: require('../../server/uploads/img/province-city-img/江西省.jpg'),
        山东省: require('../../server/uploads/img/province-city-img/山东省.jpg'),
        河南省: require('../../server/uploads/img/province-city-img/河南省.jpg'),
        湖北省: require('../../server/uploads/img/province-city-img/湖北省.jpg'),
        湖南省: require('../../server/uploads/img/province-city-img/湖南省.jpg'),
        广东省: require('../../server/uploads/img/province-city-img/广东省.jpg'),
        广西壮族自治区: require('../../server/uploads/img/province-city-img/广西壮族自治区.jpg'),
        海南省: require('../../server/uploads/img/province-city-img/海南省.jpg'),
        重庆市: require('../../server/uploads/img/province-city-img/重庆市.jpg'),
        四川省: require('../../server/uploads/img/province-city-img/四川省.jpg'),
        贵州省: require('../../server/uploads/img/province-city-img/贵州省.jpg'),
        云南省: require('../../server/uploads/img/province-city-img/云南省.jpg'),
        西藏自治区: require('../../server/uploads/img/province-city-img/西藏自治区.jpg'),
        陕西省: require('../../server/uploads/img/province-city-img/陕西省.jpg'),
        甘肃省: require('../../server/uploads/img/province-city-img/甘肃省.jpg'),
        青海省: require('../../server/uploads/img/province-city-img/青海省.jpg'),
        宁夏回族自治区: require('../../server/uploads/img/province-city-img/宁夏回族自治区.jpg'),
        新疆维吾尔自治区: require('../../server/uploads/img/province-city-img/新疆维吾尔自治区.jpg')
      }
    }
  },
  mounted() {},
  async created() {
    await this.getMapData()
    await this.getFormIndexData()
    await this.getTimeIndexData()
    this.drawMapGraph(0)
    this.drawBarGraph()
  },
  methods: {
    drawMapGraph(code, name) {
      const that = this
      if (
        this.myChart !== null &&
        this.myChart !== '' &&
        this.myChart !== undefined
      ) {
        this.myChart.dispose()
      }
      this.myChart = this.$echarts.init(document.getElementById('myChart'))
      let optionMap
      if (code === 0) {
        // 省级行政区
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
              itemStyle: {},
              data: this.mapData
            }
          ]
        }
      } else if (code === 1) {
        // 地级行政区
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
                return info + ', ' + params.name + ', ' + params.value
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
        // 单个省
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
          tooltip: {
            show: true,
            trigger: 'item',
            formatter: function(params) {
              const value = params.value
              return String(value)
            },
            padding: 5,
            backgroundColor: '#eeeeee',
            textStyle: {
              fontSize: 10,
              fontWeight: 'bolder'
            }
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
              itemStyle: {},
              data: this.mapData
            }
          ]
        }
      }
      this.myChart.setOption(optionMap, true)
      this.myChart.on('click', async function(arg) {
        that.handleImgChange(arg.name)
        that.code = getProvinceCode(arg.name)
        that.queryMapInfo.level = '地级行政区'
        that.queryMapInfo.provinceToMap = arg.name
        that.mapLevelChange(that.code, arg.name)
      })
      if (this.code === 0 || this.code === 1) {
        this.myChart.on('mouseover', function(params) {
          that.myChartColumn.dispatchAction({
            type: 'highlight',
            dataIndex: params.dataIndex
          })
        })
        this.myChart.on('mouseout', function(params) {
          that.myChartColumn.dispatchAction({
            type: 'downplay',
            dataIndex: params.dataIndex
          })
        })
      }
      function resizeGraph() {
        that.myChart.resize()
      }
      function throttle(fn, delay) {
        let timer = null
        return function() {
          const context = this
          const args = arguments
          if (!timer) {
            timer = setTimeout(() => {
              fn.apply(context, args)
              timer = null
            }, delay)
          }
        }
      }
      window.addEventListener('resize', throttle(resizeGraph, 1000))
    },
    drawBarGraph() {
      if (
        this.myChartColumn !== null &&
        this.myChartColumn !== '' &&
        this.myChartColumn !== undefined
      ) {
        this.myChartColumn.dispose()
      }
      this.myChartColumn = this.$echarts.init(
        document.getElementById('myChartColumn')
      )
      let optionColumn
      if (this.code === 1) {
        optionColumn = {
          xAxis: {
            type: 'value',
            inverse: false,
            splitNumber: 2
          },
          yAxis: {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: this.columnCategory
          },
          grid: {
            top: 15,
            bottom: 35,
            left: 70,
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
              barMinWidth: 12,
              barMaxWidth: 12,
              barCategoryGap: '50%',
              data: this.columnValue,
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
              }
            }
          ],
          dataZoom: [
            {
              realtime: true,
              type: 'inside', // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
              orient: 'vertical',
              start: 92, // 表示默认展示20%～80%这一段。
              end: 100,
              maxValueSpan: 31,
              minValueSpan: 25
            }
          ]
        }
      } else if (this.code === 0) {
        optionColumn = {
          xAxis: {
            type: 'value',
            inverse: false,
            splitNumber: 2
          },
          yAxis: {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: this.columnCategory
          },
          grid: {
            top: 15,
            bottom: 35,
            left: 70,
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
              data: this.columnValue,
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
              }
            }
          ]
        }
      } else {
        optionColumn = {
          xAxis: {
            type: 'value',
            inverse: false,
            splitNumber: 2
          },
          yAxis: {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: this.columnCategory
          },
          grid: {
            top: 15,
            bottom: 35,
            left: 70,
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
              barCategoryGap: '50%',
              data: this.columnValue,
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
              }
            }
          ]
        }
      }
      this.myChartColumn.setOption(optionColumn, true)
      this.myChartColumn.on('mouseover', function(params) {})
      const that = this
      function resizeGraph() {
        that.myChartColumn.resize()
      }
      function throttle(fn, delay) {
        let timer = null
        return function() {
          const context = this
          const args = arguments
          if (!timer) {
            timer = setTimeout(() => {
              fn.apply(context, args)
              timer = null
            }, delay)
          }
        }
      }
      window.addEventListener('resize', throttle(resizeGraph, 1000))
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
    },
    async getTimeIndexData() {
      this.years = []
      const { data: res } = await this.$http.get('/timeindex-data', {
        params: { level: this.queryMapInfo.level }
      })
      const that = this
      for (var i = 0; i < res.data.formData.length; i++) {
        if (that.years.indexOf(res.data.formData[i].year) === -1) {
          that.years.push(res.data.formData[i].year)
        }
      }
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
        newdata.value = Math.round(
          Number(res.data.mapData[0][provinceArray[i]])
        )
        if (newdata.value) {
          that.mapData.push(newdata)
        }
      }
      this.mapData.sort(function(a, b) {
        return a.value - b.value
      })
      this.deepCopy(this.mapData, this.columnData)
      for (let i = 0; i < this.mapData.length; i++) {
        that.columnCategory.push(this.mapData[i].name)
        that.columnValue.push(this.mapData[i].value)
      }
      this.replaceCategory(this.columnCategory)
      this.min = Math.min.apply(null, this.columnValue)
      this.max = Math.max.apply(null, this.columnValue)
    },
    loadMapJson(code) {
      if (code === 0) {
        // 省级行政区
        this.chinaMap = chinaMapJson
      } else if (code === 1) {
        // 地级行政区
        this.chinaMap = chinaCityMapJson
      } else {
        // 单个省
        const currentMap = require('../assets/map/province/' + code + '.json')
        this.chinaMap = currentMap
      }
    },
    async handleIndexChange(value) {
      this.queryMapInfo.dataIndeCate3 = value[2]
      this.clearMap()
      await this.getMapData()
      const that = this
      if (this.queryMapInfo.level === '省级行政区') {
        that.code = 0
        that.loadMapJson(0)
        that.drawMapGraph(0)
      } else if (this.code !== 0 && this.code !== 1) {
        that.mapLevelChange(that.code, that.queryMapInfo.provinceToMap)
      } else {
        that.code = 1
        that.loadMapJson(1)
        that.drawMapGraph(1)
      }
      this.drawBarGraph()
    },
    // 年份改变
    async handleYearChange() {
      this.clearMap()
      await this.getMapData()
      const that = this
      if (this.queryMapInfo.level === '省级行政区') {
        that.code = 0
        that.loadMapJson(0)
        that.drawMapGraph(0)
      } else if (this.code !== 0 && this.code !== 1) {
        that.mapLevelChange(that.code, that.queryMapInfo.provinceToMap)
      } else {
        that.code = 1
        that.loadMapJson(1)
        that.drawMapGraph(1)
      }
      this.drawBarGraph()
    },
    async handleLevelChange() {
      const that = this
      if (this.queryMapInfo.level === '地级行政区') {
        that.code = 1
        that.loadMapJson(1)
        that.clearMap()
        await that.getMapData()
        that.drawMapGraph(1)
      } else {
        that.code = 0
        that.loadMapJson(0)
        that.clearMap()
        await that.getMapData()
        that.drawMapGraph(0)
      }
      this.drawBarGraph()
    },
    clearMap() {
      this.columnData = []
      this.mapData = []
      this.columnValue = []
      this.columnCategory = []
      this.min = ''
      this.max = ''
      this.unit = ''
    },
    deepCopy(p, c) {
      c = c || {}
      for (var i in p) {
        if (typeof p[i] === 'object') {
          c[i] = p[i].constructor === Array ? [] : {}
          this.deepCopy(p[i], c[i])
        } else {
          c[i] = p[i]
        }
      }
      return c
    },
    replaceCategory(arr) {
      arr.forEach((value, index, arr) => {
        arr[index] = value.replace(
          /省|地区|柯尔克孜自治州|回族自治区|彝族自治州|哈尼族彝族自治州|傣族自治州|布依族苗族自治州|朝鲜族自治州|藏族羌族自治州|傈僳族自治州|土家族自治州|哈尼族彝族自治州|土家族苗族自治州|壮族苗族自治州|苗族侗族自治州|白族自治州|藏族自治州|蒙古族藏族自治州|回族自治州|蒙古自治州|哈萨克自治州|壮族自治区|自治州|自治区|维吾尔自治区|维吾尔自治州|市|盟/,
          ''
        )
      })
    },
    async mapLevelChange(code, name) {
      this.clearMap()
      await this.getMapData()
      const provinceColumn = getProvinceCityName(name)
      this.columnData = this.columnData.filter(function(item) {
        return provinceColumn.find(value => {
          return value.name === item.name
        })
      })
      this.columnValue = []
      this.columnCategory = []
      for (var i = 0; i < this.columnData.length; i++) {
        this.columnCategory.push(this.columnData[i].name)
        this.columnValue.push(this.columnData[i].value)
      }
      this.replaceCategory(this.columnCategory)
      this.drawMapGraph(code, name)
      this.drawBarGraph()
    },
    handleImgChange(name) {
      if (Object.keys(this.imgPath).includes(name)) {
        this.imgInfo.name = name + '论坛'
        this.imgInfo.url = this.imgPath[name]
      }
    }
  },
  watch: {
    async 'queryMapInfo.level'(val) {
      await this.getFormIndexData()
      await this.getTimeIndexData()
    }
  }
}
</script>

<style lang="less" scoped>
.home_container {
  margin: 0;
  padding: 0;
  height: auto;
  background-color: #fcfeff;
}

header {
  border-bottom: 1px solid #e1e2e1;
  height: 80px;
  display: flex;
  justify-content: space-between;
  > a {
    width: 20%;
  }
  img {
    float: left;
    height: 25px;
    padding-left: 30px;
    margin-top: 27px;
  }
  .headersection {
    height: 80px;
    float: left;
    width: 80%;
    padding-right: 30px;
    display: flex;
    justify-content: space-between;
    .mainMenuSearch {
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      input {
        border: 0;
        border-bottom: 1px solid #e1e2e1;
        width: 200px;
        height: 20px;
      }
      input:focus {
        outline: none;
      }
      i {
        vertical-align: center;
      }
    }
    a {
      text-decoration: none;
      span {
        line-height: 80px;
        font-size: 14px;
        color: #808080;
      }
    }
  }
}

.main {
  width: 100%;
  margin-top: 50px;
  /deep/ .el-input__suffix {
    right: -7px;
  }
  /deep/ .el-input__inner {
    border: 0;
    border-bottom: 1px solid #e7e7e9;
    border-radius: 0;
    padding-left: 0;
  }
  .main-map {
    margin: 0 auto;
    max-width: 1311px;
    height: 546px;
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
        position: relative;
        display: block;
        font-size: 30px;
        line-height: 28px;
        font-weight: bold;
        z-index: 1000;
      }
      .bgcolor {
        position: relative;
        border-radius: 5px;
        top: -15px;
        width: 40%;
        height: 25px;
        background-color: #fadf6d !important;
        z-index: 0;
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
        a {
          text-decoration: none;
        }
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        span {
          color: #ffffff;
          font-size: 16px;
          height: 0;
          position: relative;
          display: block;
          top: 45%;
          margin: 0 auto;
          text-decoration: none;
        }
        img {
          display: block;
          border-radius: 8px;
          width: 100%;
        }
      }
    }
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
  box-sizing: border-box;
}

#myChartColumn {
  width: 33.4%;
  height: 100%;
  box-sizing: border-box;
  z-index: 1000;
  overflow: auto;
}

.cityCompare {
  margin-top: 80px;
  margin: 0 auto;
  max-width: 1311px;
  background-color: #fcfeff;
  box-sizing: border-box;
  padding-top: 65px;
  padding-bottom: 65px;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  .cityCompareTitle {
    width: 35%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
      display: block;
      margin-top: 0;
      margin-bottom: 40px;
      font-size: 48px;
      font-weight: bold;
    }
    > span {
      display: block;
      font-size: 18px;
    }
    a {
      text-decoration: none;
      div {
        height: 35px;
        float: left;
        width: 100px;
        border-radius: 12px;
        background-color: #000;
        margin-right: 30px;
        margin-top: 50px;
        margin-bottom: 60px;
        span {
          width: 100%;
          display: inline-block;
          font-size: 14px;
          color: #fff;
          text-align: center;
          line-height: 35px;
        }
      }
    }
  }
  .cityImg {
    width: 60%;
    transform: translateX(150px);
    transition: all 0.6s;
  }
  img {
    width: 100%;
  }
}
.cityCompare:hover {
  .cityImg {
    transform: translateX(0px);
  }
}

.bbsArea {
  width: 100%;
  background-color: #fafafb;
  .bbsContent {
    margin: 0 auto;
    max-width: 1311px;
    display: flex;
    justify-content: space-between;
    .bbsContentC {
      width: 35%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      p {
        display: block;
        margin-top: 0;
        margin-bottom: 40px;
        font-size: 48px;
        font-weight: bold;
      }
      > span {
        display: block;
        font-size: 18px;
      }
      a {
        text-decoration: none;
        div {
          height: 35px;
          float: left;
          width: 100px;
          border-radius: 12px;
          background-color: #000;
          margin-right: 30px;
          margin-top: 50px;
          margin-bottom: 30px;
          span {
            width: 100%;
            display: inline-block;
            font-size: 14px;
            color: #fff;
            text-align: center;
            line-height: 35px;
          }
        }
      }
    }
    .bbsContentI {
      width: 60%;
      img {
        border-radius: 10px;
        width: 45%;
        margin-left: 5%;
        margin-top: 6%;
        transition: all 0.4s;
      }
      img:nth-child(3) {
        margin-bottom: 6%;
      }
      img:nth-child(4) {
        margin-bottom: 6%;
      }
      img:hover {
        transform: scale(1.1);
      }
    }
  }
}

footer {
  height: 40px;
  margin: 0 4%;
  width: 92%;
  margin-top: 70px;
  border-top: 1px solid #e1e2e1;
  line-height: 40px;
  > p {
    line-height: 55px;
    display: block;
    float: right;
    margin: 0;
    font-size: 14px;
  }
  a {
    display: block;
    font-size: 16px;
    float: left;
    font-weight: bold;
    margin: 0 25px 0 0;
    line-height: 55px;
    color: #000000;
    text-decoration: none;
  }
  .identity {
    position: absolute;
    left: 50%;
    font-weight: normal;
    transform: translateX(-50%);
    font-size: 14px;
  }
  > a:hover {
    color: #808080;
  }
}

/deep/ .el-form-item__content {
  padding: 0;
  margin: 0 !important;
}

/deep/ .el-radio__label {
  font-size: 14px;
  font-weight: normal;
}
</style>
