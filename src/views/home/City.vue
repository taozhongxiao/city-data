/* eslint-disable */
<template>
  <div class="home_container">
    <!-- header -->
    <header>
      <router-link to="/">
        <img src="../../assets/city-data.png" />
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
    <!-- main -->
    <div class="main">
      <div id="provinceChart"></div>
      <div class="cityList" v-show="showCityList">
        <ul @click="handleClick">
          <li v-for="item in cityList" :key="item">{{ item }}</li>
        </ul>
      </div>
      <div class="citySelectedList">
        <div
          class="city"
          v-for="value in cityInfo"
          :key="value.name"
          v-show="value.name"
        >
          <div class="cityProfile">
            <span>{{ value.name }}</span>
            <span>{{ value.province }}</span>
          </div>
          <div class="cityPop">
            <span>{{ value.pop }}</span>
            <span>总人口(万)</span>
          </div>
        </div>
      </div>
    </div>
    <section>
      <div class="report_area">
        <div class="main_map">
          <!-- gdp图表 -->
          <bar-line-graph
            :newOption="graphOption.gdpOption"
            :data="graphData.gdpData"
            class="dataChart"
            v-show="
              cateArrSelected.includes('国民经济核算') &&
                indexArrSelected.includes('地区生产总值')
            "
          ></bar-line-graph>
          <!-- 人均gdp图表 -->
          <scatter-graph
            :newOption="graphOption.averageGdpOption"
            :data="graphData.averageGdpData"
            class="dataChart"
            v-show="
              cateArrSelected.includes('国民经济核算') &&
                indexArrSelected.includes('人均地区生产总值')
            "
          ></scatter-graph>
          <!-- 常住居民 -->
          <pictorial-bar-graph
            :newOption="graphOption.ChangZhuPopOption"
            :data="graphData.changZhuPopData"
            class="pictorialDataChart"
            v-show="
              cateArrSelected.includes('人口') &&
                indexArrSelected.includes('年末常住人口')
            "
          ></pictorial-bar-graph>
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
            <el-checkbox-group
              v-model="yearArrSelected"
              :min="4"
              @change="drawYearGraph"
            >
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
    <!-- footer -->
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
import chinaMapJson from '../../assets/map/china-province.json'
import { getCityName } from '../../utils/getCityName'
import { getProvinceName } from '../../utils/getProvinceName'
import BarLineGraph from '../../components/graph/Barlinegraph.vue'
import PictorialBarGraph from '../../components/graph/Pictorialbargraph'
import ScatterGraph from '../../components/graph/Scattergraph.vue'

export default {
  components: {
    BarLineGraph,
    ScatterGraph,
    PictorialBarGraph
  },
  data() {
    return {
      cityList: [],
      showCityList: false,
      queryInfo: {
        city: [],
        year: []
      },
      cityInfo: [],
      cityComData: [],
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
      // 图表数据
      graphData: {
        // 经济
        gdpData: [],
        averageGdpData: [],
        // 人口
        changZhuPopData: []
      },
      // 图表特别配置项
      graphOption: {
        gdpOption: {},
        averageGdpOption: {},
        ChangZhuPopOption: {}
      },
      // 各图表dataset
      firstData: [[]],
      // 各图表增长率情况
      rateData: [[]]
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
          subtext: '后选择省内相应地级行政区',
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
            itemStyle: {}
            // selectedMode: 'multiple'
          }
        ]
      }
      this.provinceChart.setOption(optionMap, true)
      this.provinceChart.on('click', arg => {
        this.getCityListByProvince(arg.name)
      })
      function resizeMapGraph() {
        that.provinceChart.resize()
      }
      function throttleMap(fn, delay) {
        let pre = 0
        return function() {
          const now = new Date().getTime()
          const context = this
          const args = arguments
          if (now - pre >= delay) {
            fn.apply(context, args)
            console.log('now', now)
            pre = now
          }
        }
      }
      window.addEventListener('resize', throttleMap(resizeMapGraph, 1000))
    },
    getCityListByProvince(name) {
      const arr = getCityName(name)
      this.cityList = []
      this.cityList = arr
      this.showCityList = true
    },
    handleClick(arg) {
      if (arg.target.innerText.length > 20) {
        return
      }
      if (this.queryInfo.city.includes(arg.target.innerText)) {
        const index1 = this.queryInfo.city.indexOf(arg.target.innerText)
        for (let i = 0; i < this.cityInfo.length; i++) {
          if (this.cityInfo[i].name === arg.target.innerText) {
            this.cityInfo.splice(i, 1)
          }
        }
        this.queryInfo.city.splice(index1, 1)
        return
      }
      if (this.queryInfo.city.length < 3) {
        this.queryInfo.city.push(arg.target.innerText)
      } else {
        this.queryInfo.city.shift()
        this.queryInfo.city.push(arg.target.innerText)
        this.cityInfo.shift()
      }
      const cityClass = {}
      cityClass.name = arg.target.innerText
      cityClass.province = getProvinceName(arg.target.innerText)
      const index1 = this.queryInfo.city.indexOf(arg.target.innerText)
      this.cityInfo.splice(index1, 1, cityClass)
      this.getCityData()
    },
    async getCityData() {
      const { data: res } = await this.$http.get('city-data', {
        params: this.queryInfo
      })
      console.log('res', res)
      res.data.cityComData.forEach(element => {
        if (element.dataIndeCate3 === '年末常住人口') {
          for (let i = 0; i < this.cityInfo.length; i++) {
            const className = {}
            className.name = this.cityInfo[i].name
            className.province = this.cityInfo[i].province
            className.pop = Math.round(element[this.cityInfo[i].name])
            this.cityInfo.splice(i, 1, className)
          }
        }
      })
      if (this.queryInfo.city.length > 1) {
        this.clearGraph()
        this.cityComData = res.data.cityComData
        const indexSet = new Set()
        const cateSet = new Set()
        const yearSet = new Set()
        this.cityComData.forEach(item => {
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
        this.cityComData.forEach(item => {
          if (Object.keys(this.allIndex).indexOf(item.dataIndeCate1) === -1) {
            this.allIndex[item.dataIndeCate1] = []
          }
          if (
            this.allIndex[item.dataIndeCate1].indexOf(item.dataIndeCate3) === -1
          ) {
            this.allIndex[item.dataIndeCate1].push(item.dataIndeCate3)
          }
        })
        for (let i = 0; i < this.indexArrList.length; i++) {
          this.firstData[i] = []
          this.rateData[i] = []
        }
        this.cityComData.forEach(item => {
          for (let i = 0; i < this.indexArrList.length; i++) {
            if (item.dataIndeCate3 === this.indexArrList[i]) {
              const value = {}
              value.year = item.year
              for (let j = 0; j < this.queryInfo.city.length; j++) {
                value[this.queryInfo.city[j]] = item[this.queryInfo.city[j]]
              }
              this.firstData[i].push(value)
            }
          }
        })
        for (let k = 0; k < this.firstData.length; k++) {
          this.firstData[k].sort(function(a, b) {
            return a.year - b.year
          })
        }
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
            }
            this.rateData[k].push(value)
          }
        }
        console.log(this.firstData)
        console.log(this.rateData)
        this.drawGdpGraph()
        this.drawAverageGdpGraph()
        this.drawChangZhuRenKouGraph()
      }
    },
    clearGraph() {
      this.cityComData = []
      this.indexArrList = []
      this.yearArrList = []
      this.allIndex = {}
      this.cateArrList = []
      this.unitList = []
      this.firstData = [[]]
      this.rateData = [[]]
      this.queryInfo.year = []
    },
    drawGdpGraph() {
      const newVal = this.dataTransformToLbGraphData('地区生产总值')
      this.graphData.gdpData = newVal
    },
    drawAverageGdpGraph() {
      const newVal = this.dataTransformToScatterGraphData('人均地区生产总值')
      this.graphData.averageGdpData = newVal
    },
    drawChangZhuRenKouGraph() {
      const path =
        'path://M950.270788 846.051145c0 23.871687-19.35072 43.222407-43.220361 43.222407-23.86964 0-43.220361-19.35072-43.220361-43.222407 0-0.271176 0.074701-0.520863 0.078795-0.792039l-0.26913 0c0.010233-0.9967 0.148379-1.961678 0.148379-2.962471 0-70.560032-27.910677-134.460388-73.056899-181.361581l0.260943-0.26299c-7.692193-7.528464-12.495592-17.998933-12.495592-29.614481 0-22.910802 18.570961-41.479717 41.47767-41.479717 11.617595 0 22.088064 4.800329 29.618575 12.495592l0.076748-0.078795c62.155618 62.318324 100.600209 148.297534 100.600209 243.266489l-0.078795 0C950.195064 845.531306 950.270788 845.779969 950.270788 846.051145zM606.40409 581.789483l0 0.107447c-0.212848-0.002047-0.419556-0.032746-0.63445-0.032746-142.497435 0-258.014378 116.599601-258.014378 260.432451 0 0.705058 0.060375 1.393743 0.105401 2.089591 0.020466 0.564865 0.167822 1.093914 0.167822 1.665942 0 23.871687-19.35072 43.222407-43.220361 43.222407-23.871687 0-43.222407-19.35072-43.222407-43.222407 0-0.271176 0.074701-0.520863 0.078795-0.792039l-0.394996 0c0-139.857305 83.486436-259.990383 203.215308-313.963645-49.822732-40.880059-81.626066-102.910834-81.626066-172.388209 0-123.111922 99.80203-222.909859 222.911906-222.909859S828.681546 235.795331 828.681546 358.907253C828.681546 481.803257 729.21823 581.442582 606.40409 581.789483zM605.76964 216.773092c-78.343299 0-141.850705 63.509453-141.850705 141.854798 0 78.341253 63.507406 141.850705 141.850705 141.850705s141.852752-63.509453 141.852752-141.850705C747.623415 280.282544 684.112939 216.773092 605.76964 216.773092zM342.330716 256.001535c-47.368844 13.066597-82.148975 55.764048-82.148975 106.555851 0 42.546002 24.40483 79.415724 60.170404 97.943706 14.476713 7.499811 28.541033 21.713534 30.846542 46.471404 1.998517 21.466917-4.369517 53.691853-32.766264 61.522192-94.958722 26.178219-165.045987 110.373807-168.481226 211.371058 0.210801 1.627057 0.496304 3.232624 0.496304 4.915963 0 21.160949-17.151635 38.314631-38.314631 38.314631-21.158902 0-38.312584-17.153682-38.312584-38.314631 0-0.372483 0.101307-0.719384 0.11154-1.091868l-0.202615-0.002047c0-128.593773 76.339666-230.92644 183.627181-275.247878-44.402279-33.932834-73.092715-86.830601-73.092715-146.441257 0-74.953086 45.225017-139.378397 110.262266-168.574347 30.41573-13.656021 52.572356 2.650363 57.93448 23.63121C358.886787 242.195088 342.330716 256.001535 342.330716 256.001535z'
      const newVal = this.dataTransformToPicBarGraphData('年末常住人口', path)
      this.graphData.changZhuPopData = newVal
    },
    // 数据transform到line-bar-graph
    dataTransformToLbGraphData(indexArr) {
      const num = this.indexArrList.indexOf(indexArr)
      const index = this.indexArrSelected[num]
      const unit = this.unitList[num]
      const newVal = []
      newVal.push(this.firstData[num])
      newVal.push(this.rateData[num])
      newVal.push(index)
      newVal.push(unit)
      return newVal
    },
    // 数据transform到scatter-graph
    dataTransformToScatterGraphData(indexArr) {
      const num = this.indexArrList.indexOf(indexArr)
      const index = this.indexArrSelected[num]
      const unit = this.unitList[num]
      const newVal = []
      newVal.push(this.firstData[num])
      newVal.push(index)
      newVal.push(unit)
      return newVal
    },
    // 数据transform到pic-bar-graph
    dataTransformToPicBarGraphData(indexArr, pathData) {
      const num = this.indexArrList.indexOf(indexArr)
      const index = this.indexArrSelected[num]
      const unit = this.unitList[num]
      const newVal = []
      newVal.push(this.firstData[num])
      newVal.push(index)
      newVal.push(unit)
      newVal.push(pathData)
      return newVal
    },
    // 三级指标改变
    drawIndexGraph(val) {
      Object.keys(this.allIndex).forEach(key => {
        let count = 0
        const l = this.allIndex[key].length
        for (let i = 0; i < l; i++) {
          if (val.includes(this.allIndex[key][i])) {
            count++
          }
        }
        if (count === 0) {
          if (this.cateArrSelected.includes(key)) {
            const num = this.cateArrSelected.indexOf(key)
            this.cateArrSelected.splice(num, 1)
          }
        } else {
          if (!this.cateArrSelected.includes(key)) {
            this.cateArrSelected.push(key)
          }
        }
      })
    },
    // 一级指标改变
    drawCateGraph(val) {
      this.indexArrSelected = []
      for (const item of val) {
        this.indexArrSelected = this.indexArrSelected.concat(
          this.allIndex[item]
        )
      }
    },
    drawYearGraph(val) {
      this.queryMapInfo.year = []
      val.forEach(item => {
        this.queryMapInfo.year.push(item)
      })
      this.getMapData()
    }
  },
  mounted() {
    this.drawMapGraph()
  }
}
</script>

<style lang="less" scoped>
.home_container {
  margin: 0;
  padding: 0;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
        // padding-left: 70px;
        font-size: 14px;
        color: #808080;
      }
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
  background-color: #fafafb;
}

.main {
  max-width: 1311px;
  margin: 0 auto;
  padding-top: 50px;
  width: 92%;
  display: flex;
  justify-content: flex-start;
}
::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
.cityList {
  margin-left: 50px;
  ul {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    flex-wrap: no-wrap;
    overflow: scroll;
    height: 450px;
    box-sizing: border-box;
    background-color: #fafafb;
    border-radius: 12px;
    padding: 20px;
    li {
      width: 160px;
      font-size: 14px;
      margin-bottom: 12px;
      height: 20px;
      line-height: 20px;
      color: #464646;
      list-style: none;
      transition: all 0.4s;
    }
  }
}
.citySelectedList {
  flex: 1;
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .city {
    height: 135px;
    border-radius: 12px;
    margin-bottom: 22.5px;
    background-color: #eee;
    display: flex;
    justify-content: space-between;
    .cityProfile {
      padding: 20px;
      width: 60%;
      span {
        display: block;
      }
      span:first-child {
        font-size: 24px;
        font-weight: bold;
      }
      span:last-child {
        font-size: 14px;
        color: #464646;
      }
    }
    .cityPop {
      padding: 15px;
      width: 40%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      span {
        display: block;
      }
      span:first-child {
        font-size: 60px;
        line-height: 60px;
        font-weight: bold;
        color: #000;
      }
      span:last-child {
        align-self: flex-end;
        font-size: 14px;
        color: #464646;
      }
    }
  }
  .city:last-child {
    margin: 0;
    .cityProfile {
      span:first-child {
        color: #669ef1;
      }
    }
  }
  .city:first-child {
    .cityProfile {
      span:first-child {
        color: #b63d2e;
      }
    }
  }
  .city:nth-child(2) {
    .cityProfile {
      span:first-child {
        color: #fade6d;
      }
    }
  }
}

section {
  max-width: 1311px;
  width: 92%;
  margin: 0 auto;
  margin-top: 80px;
}
.report {
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
  width: 100%;
}
.main_map {
  width: 60%;
  border-top: 1px solid #eee;
}
.dataChart {
  width: 100%;
  height: 420px;
  margin: 30px 0;
  border-bottom: 1px solid #eee;
}
.pictorialDataChart {
  width: 100%;
  height: 650px;
  margin: 30px 0;
  border-bottom: 1px solid #eee;
}
.dataChart:hover {
  border-bottom: 1px solid #000;
}
.pictorialDataChart:hover {
  border-bottom: 1px solid #000;
}
.filter_section {
  width: 25%;
  max-width: 400px;
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
/deep/ .el-checkbox__label {
  color: #464646 !important;
  font-weight: normal;
}
/deep/ .el-checkbox {
  display: block;
  padding-bottom: 6px;
}

footer {
  height: 40px;
  margin: 0 4%;
  width: 92%;
  margin-top: 60px;
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
* {
  margin: 0;
  padding: 0;
}
</style>
