/* eslint-disable */
<template>
  <div class="home_container">
    <header>
      <router-link to="/">
        <img src="../../assets/city-data.png" />
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
      <div class="mainContentArea">
        <div class="provinceselection">
          <div id="provinceChart"></div>
          <div class="province1" v-bind:style="{ display: showProvince1 }">
            <i class="iconfont">{{ detailList[0].logo }}</i>
            <span>{{ detailList[0].name }}</span>
            <span>{{ detailList[0].area }}</span>
            <span>国土面积 / 万平方公里</span>
            <span>{{ detailList[0].admin }}</span>
            <span>地级行政区 / 个</span>
            <span>{{ detailList[0].pop }}</span>
            <span>年末常住人口 / 万人</span>
            <p></p>
          </div>
          <div class="province2" v-bind:style="{ display: showProvince2 }">
            <i class="iconfont">{{ detailList[1].logo }}</i>
            <span>{{ detailList[1].name }}</span>
            <span>{{ detailList[1].area }}</span>
            <span>国土面积 / 万平方公里</span>
            <span>{{ detailList[1].admin }}</span>
            <span>地级行政区 / 个</span>
            <span>{{ detailList[1].pop }}</span>
            <span>年末常住人口 / 万人</span>
            <p></p>
          </div>
          <div class="province3" v-bind:style="{ display: showProvince3 }">
            <i class="iconfont">{{ detailList[2].logo }}</i>
            <span>{{ detailList[2].name }}</span>
            <span>{{ detailList[2].area }}</span>
            <span>国土面积 / 万平方公里</span>
            <span>{{ detailList[2].admin }}</span>
            <span>地级行政区 / 个</span>
            <span>{{ detailList[2].pop }}</span>
            <span>年末常住人口 / 万人</span>
            <p></p>
          </div>
        </div>
        <section>
          <div class="report">
            <i class="iconfont">&#xe653;</i>
            <span>对比报告</span>
          </div>
          <div class="report_area">
            <div class="main_map">
              <div id="caiZhengShouRuGraph" class="dataChart"></div>
              <div id="caiZhengZhiChuGraph" class="dataChart"></div>
              <div id="caiZhengShouRuZhiChuBiGraph" class="dataChart"></div>
              <div id="gdpGraph" class="dataChart"></div>
              <div id="averageGdpGraph" class="dataChart"></div>
              <div id="juMinXiaoFeiGraph" class="dataChart"></div>
              <div id="chengZhenJuMinXiaoFeiGraph" class="dataChart"></div>
              <div id="nongCunJuMinXiaoFeiGraph" class="dataChart"></div>
              <div
                id="chengZhenNongCunJuMinXiaoFeiBiGraph"
                class="dataChart"
              ></div>
            </div>
            <div class="filter_section">
              <div class="index_filter">
                <span>一级指标</span>
                <el-checkbox-group
                  v-model="cateArrSelected"
                  :min="1"
                  @change="drawCateGraph"
                >
                  <el-checkbox
                    v-for="index in cateArrList"
                    :label="index"
                    :key="index"
                    >{{ index }}</el-checkbox
                  >
                </el-checkbox-group>
                <span>三级指标</span>
                <el-checkbox-group
                  v-model="indexArrSelected"
                  :min="1"
                  @change="drawIndexGraph"
                >
                  <el-checkbox
                    v-for="index in indexArrList"
                    :label="index"
                    :key="index"
                    >{{ index }}</el-checkbox
                  >
                </el-checkbox-group>
                <span>时间</span>
                <el-checkbox-group v-model="yearArrSelected" :min="1">
                  <el-checkbox
                    v-for="index in yearArrList"
                    :label="index"
                    :key="index"
                    >{{ index }}</el-checkbox
                  >
                </el-checkbox-group>
              </div>
            </div>
          </div>
        </section>
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
import chinaMapJson from '../../assets/map/china-province.json'

export default {
  data() {
    return {
      showProvince1: 'none!important',
      showProvince2: 'none!important',
      showProvince3: 'none!important',
      provinceDetailList: {
        北京市: { 人口: 2154, 面积: 1.6, 地级行政区: 0, logo: '\ue669' },
        天津市: { 人口: 1562, 面积: 1.2, 地级行政区: 0, logo: '\ue66e' },
        河北省: { 人口: 7592, 面积: 18.8, 地级行政区: 11, logo: '\ue63c' },
        山西省: { 人口: 3729, 面积: 15.7, 地级行政区: 11, logo: '\ue63b' },
        内蒙古自治区: {
          人口: 2540,
          面积: 119,
          地级行政区: 12,
          logo: '\ue64a'
        },
        辽宁省: { 人口: 4352, 面积: 14.9, 地级行政区: 14, logo: '\ue63e' },
        吉林省: { 人口: 2691, 面积: 18.7, 地级行政区: 9, logo: '\ue63d' },
        黑龙江省: { 人口: 3751, 面积: 45, 地级行政区: 13, logo: '\ue64d' },
        上海市: { 人口: 2428, 面积: 1.64, 地级行政区: 0, logo: '\ue66d' },
        江苏省: { 人口: 8070, 面积: 10.7, 地级行政区: 13, logo: '\ue636' },
        浙江省: { 人口: 5850, 面积: 10.6, 地级行政区: 11, logo: '\ue633' },
        安徽省: { 人口: 6366, 面积: 14, 地级行政区: 16, logo: '\ue690' },
        福建省: { 人口: 3973, 面积: 12.4, 地级行政区: 9, logo: '\ue638' },
        江西省: { 人口: 4666, 面积: 16.7, 地级行政区: 11, logo: '\ue630' },
        山东省: { 人口: 10070, 面积: 15.8, 地级行政区: 16, logo: '\ue63a' },
        河南省: { 人口: 9640, 面积: 16.7, 地级行政区: 17, logo: '\ue62d' },
        湖北省: { 人口: 5927, 面积: 18.6, 地级行政区: 13, logo: '\ue62e' },
        湖南省: { 人口: 6918, 面积: 21, 地级行政区: 14, logo: '\ue62f' },
        广东省: { 人口: 11521, 面积: 18, 地级行政区: 21, logo: '\ue637' },
        广西壮族自治区: {
          人口: 4960,
          面积: 24,
          地级行政区: 14,
          logo: '\ue643'
        },
        海南省: { 人口: 945, 面积: 3.5, 地级行政区: 4, logo: '\ue62c' },
        重庆市: { 人口: 3124, 面积: 8.2, 地级行政区: 0, logo: '\ue649' },
        四川省: { 人口: 8375, 面积: 49, 地级行政区: 21, logo: '\ue639' },
        贵州省: { 人口: 3623, 面积: 17.6, 地级行政区: 9, logo: '\ue641' },
        云南省: { 人口: 4858, 面积: 39, 地级行政区: 16, logo: '\ue634' },
        西藏自治区: { 人口: 351, 面积: 123, 地级行政区: 7, logo: '\ue646' },
        陕西省: { 人口: 3876, 面积: 20.6, 地级行政区: 10, logo: '\ue632' },
        甘肃省: { 人口: 2647, 面积: 43, 地级行政区: 14, logo: '\ue642' },
        青海省: { 人口: 608, 面积: 72, 地级行政区: 8, logo: '\ue631' },
        宁夏回族自治区: {
          人口: 695,
          面积: 6.6,
          地级行政区: 5,
          logo: '\ue644'
        },
        新疆维吾尔自治区: {
          人口: 2523,
          面积: 166,
          地级行政区: 14,
          logo: '\ue647'
        }
      },
      detailList: [
        { name: '', area: '', pop: '', admin: '', logo: '' },
        { name: '', area: '', pop: '', admin: '', logo: '' },
        { name: '', area: '', pop: '', admin: '', logo: '' }
      ],
      queryMapInfo: {
        province: []
      },
      provinceComData: [],
      // 三级指标
      indexArrList: [],
      indexArrSelected: [],
      // 一级指标
      cateArrList: [],
      cateArrSelected: [],
      // 指标对应关系
      allIndex: {},
      // 单位
      unitList: [],
      // 年份
      yearArrSelected: [],
      yearArrList: [],
      // graph
      caiZhengShouRuGraph: '',
      caiZhengZhiChuGraph: '',
      caiZhengShouRuZhiChuBiGraph: '',
      gdpGraph: '',
      juMinXiaoFeiGraph: '',
      // 年末常住人口
      averageGdpGraph: '',
      chengZhenJuMinXiaoFeiGraph: '',
      dataChart: [
        'caiZhengShouRuGraph',
        'caiZhengZhiChuGraph',
        'caiZhengShouRuZhiChuBiGraph',
        'gdpGraph',
        'juMinXiaoFeiGraph',
        'averageGdpGraph',
        'chengZhenJuMinXiaoFeiGraph'
      ],
      // 各图表dataset
      firstData: [[]],
      // 各图标增长率情况
      rateData: [[]]
      // option: {
      //   title: {
      //     // text: '各省' + this.indexArrSelected[0] + '&增长率对比',
      //     left: -6,
      //     top: 10,
      //     // subtext: '单位: ' + this.unitList[0],
      //     textStyle: {
      //       fontWeight: 'bolder'
      //     }
      //   },
      //   grid: {
      //     // left: 0,
      //     top: 95,
      //     right: 40,
      //     left: 50,
      //     bottom: 30,
      //     show: false
      //   },
      //   series: [
      //     {
      //       type: 'bar',
      //       datasetIndex: 0,
      //       barMaxWidth: 28,
      //       itemStyle: {
      //         color: '#a84635',
      //         borderRadius: [8, 8, 0, 0]
      //       }
      //     },
      //     {
      //       type: 'bar',
      //       datasetIndex: 0,
      //       barMaxWidth: 28,
      //       itemStyle: {
      //         color: '#fade6d',
      //         borderRadius: [7, 7, 0, 0]
      //       }
      //     },
      //     {
      //       type: 'bar',
      //       datasetIndex: 0,
      //       barMaxWidth: 28,
      //       itemStyle: {
      //         color: '#669ef1',
      //         borderRadius: [10, 10, 0, 0]
      //       }
      //     },
      //     {
      //       type: 'line',
      //       yAxisIndex: 1,
      //       datasetIndex: 1,
      //       itemStyle: {
      //         color: '#a84635'
      //       }
      //     },
      //     {
      //       type: 'line',
      //       yAxisIndex: 1,
      //       datasetIndex: 1,
      //       itemStyle: {
      //         color: '#fade6d'
      //       }
      //     },
      //     {
      //       type: 'line',
      //       yAxisIndex: 1,
      //       datasetIndex: 1,
      //       itemStyle: {
      //         color: '#669ef1'
      //       }
      //     }
      //   ],
      //   xAxis: { type: 'category' },
      //   yAxis: [
      //     {
      //       type: 'value',
      //       splitNumber: 5,
      //       boundaryGap: false,
      //       // interval: (max - min) / 5,
      //       max: function(value) {
      //         return ((value.max * 1.8) / 10000).toFixed(0) * 10000
      //         // return value.toFixed(0)
      //         // if (value.max < 5000) {
      //         //   return 7000
      //         // } else if (value.max < 20000) {
      //         //   return 30000
      //         // } else {
      //         //   return (value.max + 50000).toFixed(0)
      //         // }
      //       }
      //     },
      //     {
      //       type: 'value',
      //       // max: 'dataMax',
      //       splitNumber: 5,
      //       boundaryGap: false,
      //       axisLabel: {
      //         formatter: function(value) {
      //           return value * 100 + '%'
      //         }
      //       },
      //       splitLine: {
      //         show: false
      //       },
      //       // interval: (max - min) / 5,
      //       min: function(value) {
      //         return -0.1
      //       }
      //     }
      //   ],
      //   dataset: [
      //     {
      //       // source: this.firstData[0]
      //     },
      //     {
      //       //   source: this.rateData[0]
      //     }
      //   ],
      //   legend: {
      //     top: 38,
      //     left: 'right',
      //     orient: 'horizontal'
      //   },
      //   tooltip: {
      //     textStyle: {
      //       fontSize: 12
      //     }
      //   }
      // }
    }
  },
  methods: {
    drawMapGraph() {
      const that = this
      this.provinceChart = this.$echarts.init(
        document.getElementById('provinceChart')
      )
      this.$echarts.registerMap('chinaMap', chinaMapJson)
      const optionMap = {
        title: {
          text: '请点击选择省份',
          left: '2%',
          top: '2%',
          subtext: '最多可选择3个',
          textStyle: {
            fontWeight: 'bolder'
          }
        },
        series: [
          {
            type: 'map',
            map: 'chinaMap',
            roam: true,
            zoom: 1.5,
            scaleLimit: {
              min: 1.5,
              max: 2
            },
            center: [104.2363, 35.8572],
            itemStyle: {},
            selectedMode: 'multiple'
          }
        ]
      }
      this.provinceChart.setOption(optionMap, true)
      this.provinceChart.on('click', function(arg) {
        // console.log(arg)
        that.showProvinceDetail(arg.name)
      })
    },
    showProvinceDetail(name) {
      const detail = {}
      detail.name = name
      detail.pop = this.provinceDetailList[name].人口
      detail.area = this.provinceDetailList[name].面积
      detail.admin = this.provinceDetailList[name].地级行政区
      detail.logo = this.provinceDetailList[name].logo
      let index = this.detailList.findIndex(function(item) {
        return item.name === name
      })
      // console.log(index)
      if (index !== -1) {
        this.detailList[index].name = ''
        this.detailList[index].area = ''
        this.detailList[index].admin = ''
        this.detailList[index].pop = ''
        this.detailList[index].logo = ''
        this.getMapData()
        index = index + 1
        const str = 'showProvince' + index
        // console.log(str)
        this[str] = 'none!important'
        // console.log(that.province1)
        return
      }
      if (
        !this.detailList[0].name ||
        !this.detailList[1].name ||
        !this.detailList[2].name
      ) {
        if (!this.detailList[0].name) {
          this.detailList[0] = detail
          // console.log(this.detailList[0])
          this.showProvince1 = 'block'
          this.getMapData()
        } else if (!this.detailList[1].name) {
          this.detailList[1] = detail
          this.showProvince2 = 'block'
          this.getMapData()
        } else if (!this.detailList[2].name) {
          this.detailList[2] = detail
          this.showProvince3 = 'block'
          this.getMapData()
        }
      }
      // console.log(this.detailList[0].name)
    },
    async getMapData() {
      let num = 0
      this.queryMapInfo.province = []
      for (const item of this.detailList) {
        if (item.name) {
          this.queryMapInfo.province.push(item.name)
          num++
        }
      }
      // console.log(this.queryMapInfo.province)
      if (num >= 2) {
        const { data: res } = await this.$http.get('/province-data', {
          params: this.queryMapInfo
        })
        this.clearGraph()
        this.provinceComData = res.data.provinceComData
        // console.log(this.provinceComData)
        const indexSet = new Set()
        const cateSet = new Set()
        const yearSet = new Set()
        this.provinceComData.forEach(item => {
          indexSet.add(item.dataIndeCate3)
          cateSet.add(item.dataIndeCate1)
          yearSet.add(item.year)
          this.unitList.push(item.unit)
        })
        // 三级指标
        this.indexArrList = Array.from(indexSet)
        this.indexArrSelected = this.indexArrList
        // 一级指标
        this.cateArrList = Array.from(cateSet)
        this.cateArrSelected = this.cateArrList
        // 年份
        this.yearArrList = Array.from(yearSet)
        this.yearArrSelected = this.yearArrList
        // 所有指标
        this.provinceComData.forEach(item => {
          if (Object.keys(this.allIndex).indexOf(item.dataIndeCate1) === -1) {
            this.allIndex[item.dataIndeCate1] = []
          }
          if (
            this.allIndex[item.dataIndeCate1].indexOf(item.dataIndeCate3) === -1
          ) {
            this.allIndex[item.dataIndeCate1].push(item.dataIndeCate3)
          }
        })
        // console.log(this.allIndex)
        for (let i = 0; i < this.indexArrList.length; i++) {
          this.firstData[i] = []
          this.rateData[i] = []
        }
        this.provinceComData.forEach(item => {
          for (let i = 0; i < this.indexArrList.length; i++) {
            if (item.dataIndeCate3 === this.indexArrList[i]) {
              const value = {}
              value.year = item.year
              for (let j = 0; j < this.queryMapInfo.province.length; j++) {
                value[this.queryMapInfo.province[j]] =
                  item[this.queryMapInfo.province[j]]
              }
              this.firstData[i].push(value)
              // console.log(value)
            }
          }
        })
        for (let k = 0; k < this.firstData.length; k++) {
          this.firstData[k].sort(function(a, b) {
            return a.year - b.year
          })
        }
        console.log(this.firstData)
        for (let k = 0; k < this.firstData.length; k++) {
          const indexLength = Object.keys(this.firstData[k][0]).length
          let value = {}
          for (let i = 0; i < this.firstData[k].length; i++) {
            value = {}
            for (let j = 0; j < indexLength; j++) {
              if (i === 0 && j !== 0) {
                value[Object.keys(this.firstData[k][i])[j]] = ''
              } else if (i !== 0 && j !== 0) {
                value[Object.keys(this.firstData[k][i])[j]] = (
                  (this.firstData[k][i][Object.keys(this.firstData[k][i])[j]] -
                    this.firstData[k][i - 1][
                      Object.keys(this.firstData[k][i - 1])[j]
                    ]) /
                  this.firstData[k][i - 1][
                    Object.keys(this.firstData[k][i - 1])[j]
                  ]
                ).toFixed(3)
              } else {
                value[Object.keys(this.firstData[k][i])[j]] = this.firstData[k][
                  i
                ][Object.keys(this.firstData[k][i])[j]]
              }
              // console.log(value)
            }
            // console.log(value)
            this.rateData[k].push(value)
          }
        }
        console.log(this.rateData)
        // const yearArr = []
        // const p1 = []
        // const p2 = []
        // const p3 = []
        // this.firstData.forEach(item => {
        //   for (const item1 of item) {
        //     yearArr.push(item1.year)
        //     for (let i = 0; i< this.queryMapInfo.province.length; i++) {
        //       p1.push(item1[this.queryMapInfo.province[i]])
        //     }

        //     p1.push(item1)
        //     yearArr.push(item1.year)
        //     yearArr.push(item1.year)
        //   }
        // })
        // console.log(this.firstData[0])
        this.drawCaiZhengShouRuGraph()
        this.drawCaiZhengZhiChuGraph()
        this.drawCaiZhengShouRuZhiChuBiGraph()
        this.drawGdpGraph()
        this.drawAverageGdpGraph()
        this.drawJuMinXiaoFeiGraph()
        this.drawChengZhenJuMinXiaoFeiGraph()
        this.drawNongCunJuMinXiaoFeiGraph()
        this.drawChengZhenNongCunJuMinXiaoFeiBiGraph()
      }
    },
    // 初始化数据
    clearGraph() {
      this.provinceComData = []
      this.indexArrList = []
      this.yearArrList = []
      this.allIndex = {}
      this.cateArrList = []
      this.unitList = []
      this.firstData = [[]]
    },
    // 财政收入图表
    drawCaiZhengShouRuGraph() {
      if (
        this.caiZhengShouRuGraph !== null &&
        this.caiZhengShouRuGraph !== '' &&
        this.caiZhengShouRuGraph !== undefined
      ) {
        this.caiZhengShouRuGraph.dispose()
      }
      this.caiZhengShouRuGraph = this.$echarts.init(
        document.getElementById('caiZhengShouRuGraph')
      )
      const num = this.indexArrList.indexOf('地方财政一般预算收入')
      const option = {
        title: {
          text: '各省' + this.indexArrSelected[num] + '&增长率对比',
          left: -6,
          top: 10,
          subtext: '单位: ' + this.unitList[num],
          textStyle: {
            fontWeight: 'bolder'
          }
        },
        grid: {
          top: 95,
          right: 0,
          left: 0,
          containLabel: true,
          bottom: 20,
          show: false
        },
        series: [
          {
            type: 'bar',
            datasetIndex: 0,
            barMaxWidth: 28,
            itemStyle: {
              color: '#a84635',
              borderRadius: [8, 8, 0, 0]
            }
          },
          {
            type: 'bar',
            datasetIndex: 0,
            barMaxWidth: 28,
            itemStyle: {
              color: '#fade6d',
              borderRadius: [7, 7, 0, 0]
            }
          },
          {
            type: 'bar',
            datasetIndex: 0,
            barMaxWidth: 28,
            itemStyle: {
              color: '#669ef1',
              borderRadius: [10, 10, 0, 0]
            }
          },
          {
            type: 'line',
            yAxisIndex: 1,
            datasetIndex: 1,
            smooth: true,
            itemStyle: {
              color: '#a84635'
            }
          },
          {
            type: 'line',
            yAxisIndex: 1,
            smooth: true,
            datasetIndex: 1,
            itemStyle: {
              color: '#fade6d'
            }
          },
          {
            type: 'line',
            yAxisIndex: 1,
            smooth: true,
            datasetIndex: 1,
            itemStyle: {
              color: '#669ef1'
            }
          }
        ],
        xAxis: { type: 'category' },
        yAxis: [
          {
            type: 'value',
            splitNumber: 5,
            boundaryGap: false,
            max: function(value) {
              if (Math.floor(value.max / 1000) === 0) {
                return ((value.max * 2) / 100).toFixed(0) * 100
              } else if (Math.floor(value.max / 10000) === 0) {
                return ((value.max * 2) / 1000).toFixed(0) * 1000
              } else if (Math.floor(value.max / 100000) === 0) {
                return ((value.max * 2) / 10000).toFixed(0) * 10000
              }
            }
          },
          {
            type: 'value',
            splitNumber: 4,
            boundaryGap: false,
            axisLabel: {
              formatter: function(value) {
                return (value * 100).toFixed(0) + '%'
              }
            },
            splitLine: {
              show: false
            },
            min: function(value) {
              return (value.min - value.max).toFixed(1)
            }
          }
        ],
        dataset: [
          {
            source: this.firstData[num]
          },
          {
            source: this.rateData[num]
          }
        ],
        legend: {
          top: 38,
          left: 'right',
          orient: 'horizontal'
        },
        tooltip: {
          textStyle: {
            fontSize: 12
          }
        }
      }
      if (Object.keys(this.firstData[0][0]).length === 3) {
        option.series.pop()
        option.series.splice(2, 1)
      }
      this.caiZhengShouRuGraph.setOption(option, true)
    },
    // 财政支出图表
    drawCaiZhengZhiChuGraph() {
      if (
        this.caiZhengZhiChuGraph !== null &&
        this.caiZhengZhiChuGraph !== '' &&
        this.caiZhengZhiChuGraph !== undefined
      ) {
        this.caiZhengZhiChuGraph.dispose()
      }
      this.caiZhengZhiChuGraph = this.$echarts.init(
        document.getElementById('caiZhengZhiChuGraph')
      )
      const num = this.indexArrList.indexOf('地方财政一般预算支出')
      const option = {
        title: {
          text: '各省' + this.indexArrSelected[num] + '&增长率对比',
          left: -6,
          top: 10,
          subtext: '单位: ' + this.unitList[num],
          textStyle: {
            fontWeight: 'bolder'
          }
        },
        grid: {
          top: 95,
          right: 0,
          left: 0,
          containLabel: true,
          bottom: 20,
          show: false
        },
        series: [
          {
            type: 'bar',
            datasetIndex: 0,
            barMaxWidth: 28,
            itemStyle: {
              color: '#a84635',
              borderRadius: [8, 8, 0, 0]
            }
          },
          {
            type: 'bar',
            datasetIndex: 0,
            barMaxWidth: 28,
            itemStyle: {
              color: '#fade6d',
              borderRadius: [7, 7, 0, 0]
            }
          },
          {
            type: 'bar',
            datasetIndex: 0,
            barMaxWidth: 28,
            itemStyle: {
              color: '#669ef1',
              borderRadius: [10, 10, 0, 0]
            }
          },
          {
            type: 'line',
            yAxisIndex: 1,
            smooth: true,
            datasetIndex: 1,
            itemStyle: {
              color: '#a84635'
            }
          },
          {
            type: 'line',
            yAxisIndex: 1,
            smooth: true,
            datasetIndex: 1,
            itemStyle: {
              color: '#fade6d'
            }
          },
          {
            type: 'line',
            yAxisIndex: 1,
            smooth: true,
            datasetIndex: 1,
            itemStyle: {
              color: '#669ef1'
            }
          }
        ],
        xAxis: { type: 'category' },
        yAxis: [
          {
            type: 'value',
            splitNumber: 5,
            boundaryGap: false,
            max: function(value) {
              if (Math.floor(value.max / 1000) === 0) {
                return ((value.max * 2) / 100).toFixed(0) * 100
              } else if (Math.floor(value.max / 10000) === 0) {
                return ((value.max * 2) / 1000).toFixed(0) * 1000
              } else if (Math.floor(value.max / 100000) === 0) {
                return ((value.max * 2) / 10000).toFixed(0) * 10000
              }
            }
          },
          {
            type: 'value',
            splitNumber: 5,
            boundaryGap: false,
            axisLabel: {
              formatter: function(value) {
                return value * 100 + '%'
              }
            },
            splitLine: {
              show: false
            },
            min: function(value) {
              return (value.min - value.max).toFixed(1)
            }
          }
        ],
        dataset: [
          {
            source: this.firstData[num]
          },
          {
            source: this.rateData[num]
          }
        ],
        legend: {
          top: 38,
          left: 'right',
          orient: 'horizontal'
        },
        tooltip: {
          textStyle: {
            fontSize: 12
          }
        }
      }
      if (Object.keys(this.firstData[0][0]).length === 3) {
        option.series.pop()
        option.series.splice(2, 1)
      }
      this.caiZhengZhiChuGraph.setOption(option, true)
    },
    // 财政收入支出比图表
    drawCaiZhengShouRuZhiChuBiGraph() {
      if (
        this.caiZhengShouRuZhiChuBiGraph !== null &&
        this.caiZhengShouRuZhiChuBiGraph !== '' &&
        this.caiZhengShouRuZhiChuBiGraph !== undefined
      ) {
        this.caiZhengShouRuZhiChuBiGraph.dispose()
      }
      this.caiZhengShouRuZhiChuBiGraph = this.$echarts.init(
        document.getElementById('caiZhengShouRuZhiChuBiGraph')
      )
      const numS = this.indexArrList.indexOf('地方财政一般预算收入')
      const numZ = this.indexArrList.indexOf('地方财政一般预算支出')
      const caiZhengShouRuZhiChuBiData = []
      const indexNum = Object.keys(this.firstData[numS][0]).length
      this.firstData[numS].forEach(itemS => {
        this.firstData[numZ].forEach(itemZ => {
          const item = {}
          if (itemZ.year === itemS.year) {
            for (let i = 1; i < indexNum; i++) {
              item.year = itemZ.year
              item[Object.keys(this.firstData[numS][0])[i]] = (
                itemS[Object.keys(this.firstData[numS][0])[i]] /
                itemZ[Object.keys(this.firstData[numZ][0])[i]]
              ).toFixed(3)
            }
            caiZhengShouRuZhiChuBiData.push(item)
          }
        })
      })
      console.log(caiZhengShouRuZhiChuBiData)
      const option = {
        title: {
          text: '各省地方财政一般预算收入/支出比',
          left: -6,
          top: 10,
          subtext: '单位: 比例',
          textStyle: {
            fontWeight: 'bolder'
          }
        },
        grid: {
          top: 95,
          right: 0,
          left: 0,
          containLabel: true,
          bottom: 20,
          show: false
        },
        series: [
          {
            type: 'line',
            itemStyle: {
              color: '#a84635'
            },
            smooth: true
          },
          {
            type: 'line',
            itemStyle: {
              color: '#fade6d'
            },
            smooth: true
          },
          {
            type: 'line',
            itemStyle: {
              color: '#669ef1'
            },
            smooth: true
          }
        ],
        xAxis: { type: 'category' },
        yAxis: [
          {
            type: 'value',
            splitNumber: 3,
            axisLabel: {
              formatter: function(value) {
                return (value * 100).toFixed(0) + '%'
              }
            },
            boundaryGap: false,
            max: function(value) {
              return Math.ceil(value.max * 100) / 100
            },
            min: function(value) {
              return Math.floor(value.min * 100) / 100
            }
          }
        ],
        dataset: [
          {
            source: caiZhengShouRuZhiChuBiData
          }
        ],
        legend: {
          top: 38,
          left: 'right',
          orient: 'horizontal'
        },
        tooltip: {
          textStyle: {
            fontSize: 12
          }
        }
      }
      if (Object.keys(this.firstData[0][0]).length === 3) {
        option.series.pop()
        option.series.splice(2, 1)
      }
      this.caiZhengShouRuZhiChuBiGraph.setOption(option, true)
    },
    // 地区生产总值图表
    drawGdpGraph() {
      if (
        this.gdpGraph !== null &&
        this.gdpGraph !== '' &&
        this.gdpGraph !== undefined
      ) {
        this.gdpGraph.dispose()
      }
      this.gdpGraph = this.$echarts.init(document.getElementById('gdpGraph'))
      const num = this.indexArrList.indexOf('地区生产总值')
      const option = {
        title: {
          text: '各省' + this.indexArrSelected[num] + '&增长率对比',
          left: -6,
          top: 10,
          subtext: '单位: ' + this.unitList[num],
          textStyle: {
            fontWeight: 'bolder'
          }
        },
        grid: {
          top: 95,
          right: 0,
          left: 0,
          containLabel: true,
          bottom: 20,
          show: false
        },
        series: [
          {
            type: 'bar',
            datasetIndex: 0,
            barMaxWidth: 28,
            itemStyle: {
              color: '#a84635',
              borderRadius: [8, 8, 0, 0]
            }
          },
          {
            type: 'bar',
            datasetIndex: 0,
            barMaxWidth: 28,
            itemStyle: {
              color: '#fade6d',
              borderRadius: [7, 7, 0, 0]
            }
          },
          {
            type: 'bar',
            datasetIndex: 0,
            barMaxWidth: 28,
            itemStyle: {
              color: '#669ef1',
              borderRadius: [10, 10, 0, 0]
            }
          },
          {
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            datasetIndex: 1,
            itemStyle: {
              color: '#a84635'
            }
          },
          {
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            datasetIndex: 1,
            itemStyle: {
              color: '#fade6d'
            }
          },
          {
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            datasetIndex: 1,
            itemStyle: {
              color: '#669ef1'
            }
          }
        ],
        xAxis: { type: 'category' },
        yAxis: [
          {
            type: 'value',
            splitNumber: 5,
            boundaryGap: false,
            max: function(value) {
              if (Math.floor(value.max / 1000) === 0) {
                return ((value.max * 2) / 100).toFixed(0) * 100
              } else if (Math.floor(value.max / 10000) === 0) {
                return ((value.max * 2) / 1000).toFixed(0) * 1000
              } else if (Math.floor(value.max / 100000) === 0) {
                return ((value.max * 2) / 10000).toFixed(0) * 10000
              } else {
                return ((value.max * 2) / 100000).toFixed(0) * 100000
              }
            }
          },
          {
            type: 'value',
            splitNumber: 5,
            boundaryGap: false,
            axisLabel: {
              formatter: function(value) {
                return (value * 100).toFixed(0) + '%'
              }
            },
            splitLine: {
              show: false
            },
            min: function(value) {
              return (value.min - value.max).toFixed(1)
            }
          }
        ],
        dataset: [
          {
            source: this.firstData[num]
          },
          {
            source: this.rateData[num]
          }
        ],
        legend: {
          top: 38,
          left: 'right',
          orient: 'horizontal'
        },
        tooltip: {
          textStyle: {
            fontSize: 12
          }
        }
      }
      if (Object.keys(this.firstData[0][0]).length === 3) {
        option.series.pop()
        option.series.splice(2, 1)
      }
      this.gdpGraph.setOption(option, true)
    },
    // 人均生产总值图表
    drawAverageGdpGraph() {
      if (
        this.averageGdpGraph !== null &&
        this.averageGdpGraph !== '' &&
        this.averageGdpGraph !== undefined
      ) {
        this.averageGdpGraph.dispose()
      }
      this.averageGdpGraph = this.$echarts.init(
        document.getElementById('averageGdpGraph')
      )
      const num = this.indexArrList.indexOf('人均地区生产总值')
      const option = {
        title: {
          text: '各省' + this.indexArrSelected[num] + '对比',
          left: -6,
          top: 10,
          subtext: '单位: ' + this.unitList[num],
          textStyle: {
            fontWeight: 'bolder'
          }
        },
        grid: {
          top: 95,
          right: 0,
          left: 0,
          containLabel: true,
          bottom: 20,
          show: false
        },
        series: [
          {
            type: 'scatter',
            symbol: 'circle',
            symbolSize: function(value) {
              return Math.pow(value[Object.keys(value)[1]], 0.35)
            },
            itemStyle: {
              color: '#a84635'
            },
            label: {
              show: true,
              textStyle: {
                color: '#000'
              },
              position: 'inside',
              formatter: function(p) {
                const index = Object.keys(p.data)[1]
                // console.log(p.data[index])
                let value = ''
                if (p.data[index] > 0) {
                  value = p.data[index]
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
          },
          {
            type: 'scatter',
            symbol: 'circle',
            symbolSize: function(value) {
              return Math.pow(value[Object.keys(value)[2]], 0.35)
            },
            itemStyle: {
              color: '#fade6d'
            },
            label: {
              show: true,
              position: 'inside',
              formatter: function(p) {
                const index = Object.keys(p.data)[2]
                // console.log(p.data[index])
                let value = ''
                if (p.data[index] > 0) {
                  value = p.data[index]
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
          },
          {
            type: 'scatter',
            symbol: 'circle',
            label: {
              show: true,
              position: 'inside',
              formatter: function(p) {
                const index = Object.keys(p.data)[3]
                console.log(p.data[index])
                let value = ''
                if (p.data[index] > 0) {
                  value = p.data[index]
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
            symbolSize: function(value) {
              return Math.pow(value[Object.keys(value)[3]], 0.35)
            },
            itemStyle: {
              color: '#669ef1'
            }
          }
        ],
        xAxis: { type: 'category' },
        yAxis: {
          type: 'value',
          boundaryGap: false,
          max: function(value) {
            return Math.ceil(value.max / 10000) * 10000
          },
          min: function(value) {
            return Math.floor(value.min / 10000) * 10000 - 10000
          }
        },
        dataset: {
          source: this.firstData[num]
        },
        legend: {
          top: 38,
          left: 'right',
          orient: 'horizontal'
        },
        tooltip: {
          textStyle: {
            fontSize: 12
          }
        }
      }
      if (Object.keys(this.firstData[0][0]).length === 3) {
        option.series.pop()
      }
      this.averageGdpGraph.setOption(option, true)
    },
    // 居民消费图表
    drawJuMinXiaoFeiGraph() {
      if (
        this.juMinXiaoFeiGraph !== null &&
        this.juMinXiaoFeiGraph !== '' &&
        this.juMinXiaoFeiGraph !== undefined
      ) {
        this.juMinXiaoFeiGraph.dispose()
      }
      this.juMinXiaoFeiGraph = this.$echarts.init(
        document.getElementById('juMinXiaoFeiGraph')
      )
      const num = this.indexArrList.indexOf('居民消费水平')
      const option = {
        title: {
          text: '各省' + this.indexArrSelected[num] + '&增长率对比',
          left: -6,
          top: 10,
          subtext: '单位: ' + this.unitList[num],
          textStyle: {
            fontWeight: 'bolder'
          }
        },
        grid: {
          top: 95,
          right: 0,
          left: 0,
          containLabel: true,
          bottom: 20,
          show: false
        },
        series: [
          {
            type: 'bar',
            datasetIndex: 0,
            barMaxWidth: 28,
            itemStyle: {
              color: '#a84635',
              borderRadius: [8, 8, 0, 0]
            }
          },
          {
            type: 'bar',
            datasetIndex: 0,
            barMaxWidth: 28,
            itemStyle: {
              color: '#fade6d',
              borderRadius: [7, 7, 0, 0]
            }
          },
          {
            type: 'bar',
            datasetIndex: 0,
            barMaxWidth: 28,
            itemStyle: {
              color: '#669ef1',
              borderRadius: [10, 10, 0, 0]
            }
          },
          {
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            datasetIndex: 1,
            itemStyle: {
              color: '#a84635'
            }
          },
          {
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            datasetIndex: 1,
            itemStyle: {
              color: '#fade6d'
            }
          },
          {
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            datasetIndex: 1,
            itemStyle: {
              color: '#669ef1'
            }
          }
        ],
        xAxis: { type: 'category' },
        yAxis: [
          {
            type: 'value',
            splitNumber: 5,
            boundaryGap: false,
            max: function(value) {
              if (Math.floor(value.max / 1000) === 0) {
                return ((value.max * 2) / 100).toFixed(0) * 100
              } else if (Math.floor(value.max / 10000) === 0) {
                return ((value.max * 2) / 1000).toFixed(0) * 1000
              } else if (Math.floor(value.max / 100000) === 0) {
                return ((value.max * 2) / 10000).toFixed(0) * 10000
              }
            }
          },
          {
            type: 'value',
            splitNumber: 5,
            boundaryGap: false,
            axisLabel: {
              formatter: function(value) {
                return (value * 100).toFixed(0) + '%'
              }
            },
            splitLine: {
              show: false
            },
            min: function(value) {
              return (value.min - value.max).toFixed(1)
            }
          }
        ],
        dataset: [
          {
            source: this.firstData[num]
          },
          {
            source: this.rateData[num]
          }
        ],
        legend: {
          top: 38,
          left: 'right',
          orient: 'horizontal'
        },
        tooltip: {
          textStyle: {
            fontSize: 12
          }
        }
      }
      if (Object.keys(this.firstData[0][0]).length === 3) {
        option.series.pop()
        option.series.splice(2, 1)
      }
      this.juMinXiaoFeiGraph.setOption(option, true)
    },
    // 城镇居民消费图表
    drawChengZhenJuMinXiaoFeiGraph() {
      if (
        this.chengZhenJuMinXiaoFeiGraph !== null &&
        this.chengZhenJuMinXiaoFeiGraph !== '' &&
        this.chengZhenJuMinXiaoFeiGraph !== undefined
      ) {
        this.chengZhenJuMinXiaoFeiGraph.dispose()
      }
      this.chengZhenJuMinXiaoFeiGraph = this.$echarts.init(
        document.getElementById('chengZhenJuMinXiaoFeiGraph')
      )
      const num = this.indexArrList.indexOf('城镇居民消费水平')
      const option = {
        title: {
          text: '各省' + this.indexArrSelected[num] + '&增长率对比',
          left: -6,
          top: 10,
          subtext: '单位: ' + this.unitList[num],
          textStyle: {
            fontWeight: 'bolder'
          }
        },
        grid: {
          top: 95,
          right: 0,
          left: 0,
          containLabel: true,
          bottom: 20,
          show: false
        },
        series: [
          {
            type: 'bar',
            datasetIndex: 0,
            barMaxWidth: 28,
            itemStyle: {
              color: '#a84635',
              borderRadius: [8, 8, 0, 0]
            }
          },
          {
            type: 'bar',
            datasetIndex: 0,
            barMaxWidth: 28,
            itemStyle: {
              color: '#fade6d',
              borderRadius: [7, 7, 0, 0]
            }
          },
          {
            type: 'bar',
            datasetIndex: 0,
            barMaxWidth: 28,
            itemStyle: {
              color: '#669ef1',
              borderRadius: [10, 10, 0, 0]
            }
          },
          {
            type: 'line',
            yAxisIndex: 1,
            smooth: true,
            datasetIndex: 1,
            itemStyle: {
              color: '#a84635'
            }
          },
          {
            type: 'line',
            yAxisIndex: 1,
            smooth: true,
            datasetIndex: 1,
            itemStyle: {
              color: '#fade6d'
            }
          },
          {
            type: 'line',
            yAxisIndex: 1,
            smooth: true,
            datasetIndex: 1,
            itemStyle: {
              color: '#669ef1'
            }
          }
        ],
        xAxis: { type: 'category' },
        yAxis: [
          {
            type: 'value',
            splitNumber: 5,
            boundaryGap: false,
            max: function(value) {
              if (Math.floor(value.max / 1000) === 0) {
                return ((value.max * 2) / 100).toFixed(0) * 100
              } else if (Math.floor(value.max / 10000) === 0) {
                return ((value.max * 2) / 1000).toFixed(0) * 1000
              } else if (Math.floor(value.max / 100000) === 0) {
                return ((value.max * 2) / 10000).toFixed(0) * 10000
              }
            }
          },
          {
            type: 'value',
            splitNumber: 5,
            boundaryGap: false,
            axisLabel: {
              formatter: function(value) {
                return (value * 100).toFixed(0) + '%'
              }
            },
            splitLine: {
              show: false
            },
            min: function(value) {
              return (value.min - value.max).toFixed(1)
            }
          }
        ],
        dataset: [
          {
            source: this.firstData[num]
          },
          {
            source: this.rateData[num]
          }
        ],
        legend: {
          top: 38,
          left: 'right',
          orient: 'horizontal'
        },
        tooltip: {
          textStyle: {
            fontSize: 12
          }
        }
      }
      if (Object.keys(this.firstData[0][0]).length === 3) {
        option.series.pop()
        option.series.splice(2, 1)
      }
      this.chengZhenJuMinXiaoFeiGraph.setOption(option, true)
    },
    // 农村居民消费图表
    drawNongCunJuMinXiaoFeiGraph() {
      if (
        this.nongCunJuMinXiaoFeiGraph !== null &&
        this.nongCunJuMinXiaoFeiGraph !== '' &&
        this.nongCunJuMinXiaoFeiGraph !== undefined
      ) {
        this.nongCunJuMinXiaoFeiGraph.dispose()
      }
      this.nongCunJuMinXiaoFeiGraph = this.$echarts.init(
        document.getElementById('nongCunJuMinXiaoFeiGraph')
      )
      const num = this.indexArrList.indexOf('农村居民消费水平')
      const option = {
        title: {
          text: '各省' + this.indexArrSelected[num] + '&增长率对比',
          left: -6,
          top: 10,
          subtext: '单位: ' + this.unitList[num],
          textStyle: {
            fontWeight: 'bolder'
          }
        },
        grid: {
          top: 95,
          right: 0,
          left: 0,
          containLabel: true,
          bottom: 20,
          show: false
        },
        series: [
          {
            type: 'bar',
            datasetIndex: 0,
            barMaxWidth: 28,
            itemStyle: {
              color: '#a84635',
              borderRadius: [8, 8, 0, 0]
            }
          },
          {
            type: 'bar',
            datasetIndex: 0,
            barMaxWidth: 28,
            itemStyle: {
              color: '#fade6d',
              borderRadius: [7, 7, 0, 0]
            }
          },
          {
            type: 'bar',
            datasetIndex: 0,
            barMaxWidth: 28,
            itemStyle: {
              color: '#669ef1',
              borderRadius: [10, 10, 0, 0]
            }
          },
          {
            type: 'line',
            yAxisIndex: 1,
            smooth: true,
            datasetIndex: 1,
            itemStyle: {
              color: '#a84635'
            }
          },
          {
            type: 'line',
            yAxisIndex: 1,
            smooth: true,
            datasetIndex: 1,
            itemStyle: {
              color: '#fade6d'
            }
          },
          {
            type: 'line',
            yAxisIndex: 1,
            smooth: true,
            datasetIndex: 1,
            itemStyle: {
              color: '#669ef1'
            }
          }
        ],
        xAxis: { type: 'category' },
        yAxis: [
          {
            type: 'value',
            splitNumber: 5,
            boundaryGap: false,
            max: function(value) {
              if (Math.floor(value.max / 1000) === 0) {
                return ((value.max * 2) / 100).toFixed(0) * 100
              } else if (Math.floor(value.max / 10000) === 0) {
                return ((value.max * 2) / 1000).toFixed(0) * 1000
              } else if (Math.floor(value.max / 100000) === 0) {
                return ((value.max * 2) / 10000).toFixed(0) * 10000
              }
            }
          },
          {
            type: 'value',
            splitNumber: 5,
            boundaryGap: false,
            axisLabel: {
              formatter: function(value) {
                return (value * 100).toFixed(0) + '%'
              }
            },
            splitLine: {
              show: false
            },
            min: function(value) {
              return (value.min - value.max).toFixed(1)
            }
          }
        ],
        dataset: [
          {
            source: this.firstData[num]
          },
          {
            source: this.rateData[num]
          }
        ],
        legend: {
          top: 38,
          left: 'right',
          orient: 'horizontal'
        },
        tooltip: {
          textStyle: {
            fontSize: 12
          }
        }
      }
      if (Object.keys(this.firstData[0][0]).length === 3) {
        option.series.pop()
        option.series.splice(2, 1)
      }
      this.nongCunJuMinXiaoFeiGraph.setOption(option, true)
    },
    drawChengZhenNongCunJuMinXiaoFeiBiGraph() {
      if (
        this.chengZhenNongCunJuMinXiaoFeiBiGraph !== null &&
        this.chengZhenNongCunJuMinXiaoFeiBiGraph !== '' &&
        this.chengZhenNongCunJuMinXiaoFeiBiGraph !== undefined
      ) {
        this.chengZhenNongCunJuMinXiaoFeiBiGraph.dispose()
      }
      this.chengZhenNongCunJuMinXiaoFeiBiGraph = this.$echarts.init(
        document.getElementById('chengZhenNongCunJuMinXiaoFeiBiGraph')
      )
      const numS = this.indexArrList.indexOf('城镇居民消费水平')
      const numZ = this.indexArrList.indexOf('农村居民消费水平')
      const ChengZhenNongCunJuMinXiaoFeiBiData = []
      const indexNum = Object.keys(this.firstData[numS][0]).length
      this.firstData[numS].forEach(itemS => {
        this.firstData[numZ].forEach(itemZ => {
          const item = {}
          if (itemZ.year === itemS.year) {
            for (let i = 1; i < indexNum; i++) {
              item.year = itemZ.year
              item[Object.keys(this.firstData[numS][0])[i]] = (
                itemS[Object.keys(this.firstData[numS][0])[i]] /
                itemZ[Object.keys(this.firstData[numZ][0])[i]]
              ).toFixed(3)
            }
            ChengZhenNongCunJuMinXiaoFeiBiData.push(item)
          }
        })
      })
      const option = {
        title: {
          text: '各省城镇/农村居民消费水平比',
          left: -6,
          top: 10,
          subtext: '单位: 比例',
          textStyle: {
            fontWeight: 'bolder'
          }
        },
        grid: {
          top: 95,
          right: 0,
          left: 0,
          containLabel: true,
          bottom: 20,
          show: false
        },
        series: [
          {
            type: 'line',
            itemStyle: {
              color: '#a84635'
            },
            smooth: true
          },
          {
            type: 'line',
            itemStyle: {
              color: '#fade6d'
            },
            smooth: true
          },
          {
            type: 'line',
            itemStyle: {
              color: '#669ef1'
            },
            smooth: true
          }
        ],
        xAxis: { type: 'category' },
        yAxis: [
          {
            type: 'value',
            splitNumber: 3,
            axisLabel: {
              formatter: function(value) {
                return (value * 100).toFixed(0) + '%'
              }
            },
            boundaryGap: false,
            max: function(value) {
              return Math.ceil(value.max * 100) / 100
            },
            min: function(value) {
              return Math.floor(value.min * 100) / 100
            }
          }
        ],
        dataset: [
          {
            source: ChengZhenNongCunJuMinXiaoFeiBiData
          }
        ],
        legend: {
          top: 38,
          left: 'right',
          orient: 'horizontal'
        },
        tooltip: {
          textStyle: {
            fontSize: 12
          }
        }
      }
      if (Object.keys(this.firstData[0][0]).length === 3) {
        option.series.pop()
        option.series.splice(2, 1)
      }
      this.chengZhenNongCunJuMinXiaoFeiBiGraph.setOption(option, true)
    },
    // 三级指标改变
    async drawIndexGraph(val) {
      console.log(val)
    },
    // 一级指标改变
    drawCateGraph(val) {
      console.log(val)
      this.indexArrSelected = []
      for (const item of val) {
        console.log(this.allIndex[item])
        this.indexArrSelected = this.indexArrSelected.concat(
          this.allIndex[item]
        )
      }
      console.log(this.indexArrSelected)
    }
  },
  mounted() {
    this.drawMapGraph()
  },
  async created() {
    // await this.getMapData()
  },
  watch: {}
}
</script>

<style lang="less" scoped>
.home_container {
  margin: 0;
  padding: 0;
  height: auto;
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
    height: 80px;
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
  // height: ;
  width: 100%;
  margin-top: 50px;
  .mainContentArea {
    width: 100%;
  }
}

.provinceselection {
  width: 92%;
  margin: 0 auto;
  height: 450px;
  max-width: 1311px;
  display: flex;
  justify-content: flex-start;
  .province1 {
    width: 18%;
    height: 100%;
    border-radius: 15px;
    background-color: #eeeeee;
    margin-left: 2%;
    display: flex !important;
    flex-direction: column;
    justify-content: space-between;
    i {
      display: block;
      width: 92%;
      padding: 2% 4%;
      height: 30px;
      line-height: 30px;
      font-size: 20px;
      color: #b63d2e;
      text-align: right;
      // padding-right: 20px;
      // padding-top: 10px;
    }
    span {
      display: block;
      width: 100%;
      height: 30px;
      text-align: center;
    }
    span:nth-child(2) {
      font-size: 20px;
      font-weight: bold;
      color: #b63d2e;
      padding-bottom: 15px;
    }
    span:nth-child(odd) {
      margin-top: 20px;
      line-height: 42px;
      font-size: 48px;
      // color: #464646;
      font-weight: bold;
    }
    span:nth-child(2n + 4) {
      font-size: 14px;
      color: #808080;
      // font-weight: bold;
    }
    p {
      height: 5px;
      margin: 0;
    }
  }
  .province2 {
    width: 18%;
    height: 100%;
    border-radius: 15px;
    background-color: #eeeeee;
    margin-left: 2%;
    display: flex !important;
    flex-direction: column;
    justify-content: space-between;
    i {
      display: block;
      width: 92%;
      padding: 2% 4%;
      height: 30px;
      line-height: 30px;
      font-size: 20px;
      color: #fdd835;
      text-align: right;
      // padding-right: 20px;
      // padding-top: 10px;
    }
    span {
      display: block;
      width: 100%;
      height: 30px;
      text-align: center;
    }
    span:nth-child(2) {
      font-size: 20px;
      font-weight: bold;
      color: #fdd835;
      padding-bottom: 15px;
    }
    span:nth-child(odd) {
      margin-top: 20px;
      line-height: 42px;
      font-size: 48px;
      // color: #464646;
      font-weight: bold;
    }
    span:nth-child(2n + 4) {
      font-size: 14px;
      color: #808080;
      // font-weight: bold;
    }
    p {
      height: 5px;
      margin: 0;
    }
  }
  .province3 {
    width: 18%;
    height: 100%;
    border-radius: 15px;
    background-color: #eeeeee;
    margin-left: 2%;
    display: flex !important;
    flex-direction: column;
    justify-content: space-between;
    i {
      display: block;
      width: 92%;
      padding: 2% 4%;
      height: 30px;
      line-height: 30px;
      font-size: 20px;
      color: #669ef1;
      text-align: right;
      // padding-right: 20px;
      // padding-top: 10px;
    }
    span {
      display: block;
      width: 100%;
      height: 30px;
      text-align: center;
    }
    span:nth-child(2) {
      font-size: 20px;
      font-weight: bold;
      color: #669ef1;
      padding-bottom: 15px;
    }
    span:nth-child(odd) {
      margin-top: 20px;
      line-height: 42px;
      font-size: 48px;
      // color: #464646;
      font-weight: bold;
    }
    span:nth-child(2n + 4) {
      font-size: 14px;
      color: #808080;
      // font-weight: bold;
    }
    p {
      height: 5px;
      margin: 0;
    }
  }
}

#provinceChart {
  width: 40%;
  height: 450px;
  float: left;
  padding: 0;
  box-sizing: border-box;
  border-radius: 5%;
  overflow: hidden;
  // border-top: 2px solid #000000;
  // border-bottom: 2px solid #000000;
  background-color: #fafafb;
}

#provinceChartColumn {
  min-width: 25%;
  height: 100%;
  box-sizing: border-box;
  border-top: 2px solid #000000;
  border-bottom: 2px solid #000000;
}

section {
  max-width: 1311px;
  width: 92%;
  margin: 0 auto;
  margin-top: 80px;
  // height: 450px;
}
.report {
  // padding-bottom: 40px;
  font-size: 28px;
  margin: 0;
  font-weight: bold;
  display: block;
  padding-bottom: 10px;
  i {
    transform: rotate(45deg);
    font-size: 26px;
    color: #b63d2e;
    display: inline-block;
  }
}
.report_area {
  display: flex;
  justify-content: space-between;
  // border-top: 1px solid #eeeeee;
  width: 100%;
  // height: auto;
}
.main_map {
  width: 60%;
  // background-color: #000;
  border-top: 1px solid #eee;
}
.dataChart {
  width: 100%;
  height: 420px;
  margin: 30px 0;
  border-bottom: 1px solid #eee;
}
.dataChart:hover {
  border-bottom: 1px solid #000;
}
.filter_section {
  // margin-top: 50px;
  width: 25%;
  max-width: 400px;
  // height: 600px;
  // background-color: #fafafb;
}
.index_filter {
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 30px;
  height: auto;
  border: 1px solid #eee;
  border-radius: 15px;
  span {
    font-weight: bold;
    margin-bottom: 15px;
    padding-bottom: 10px;
    padding-top: 30px;
    font-size: 16px;
    display: block;
    border-bottom: 1px solid #eee;
  }
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

/deep/ .is-checked {
  font-weight: normal;
  .el-checkbox__inner {
    background-color: #a84635 !important;
    border-color: #a84635 !important;
  }
}
// /deep/ .is-focus {
//   background-color: #a84635!important;
// }
/deep/ .el-checkbox__label {
  color: #464646 !important;
  font-weight: normal;
}
/deep/ .el-checkbox {
  display: block;
  padding-bottom: 6px;
}
</style>
