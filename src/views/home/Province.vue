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
              <!-- 财政收入图表 -->
              <bar-line-graph
                :newOption="graphOption.caiZhengShouRuOption"
                :data="graphData.caiZhengShouRuData"
                class="dataChart"
                v-show="
                  cateArrSelected.includes('财政') &&
                    indexArrSelected.includes('地方财政一般预算收入')
                "
              ></bar-line-graph>
              <!-- 财政支出图表 -->
              <bar-line-graph
                :newOption="graphOption.caiZhengZhiChuOption"
                :data="graphData.caiZhengZhiChuData"
                class="dataChart"
                v-show="
                  cateArrSelected.includes('财政') &&
                    indexArrSelected.includes('地方财政一般预算支出')
                "
              ></bar-line-graph>
              <!-- 财政收入支出比图表 -->
              <line-only-graph
                :newOption="graphOption.caiZhengShouRuZhiChuBiOption"
                :data="graphData.caiZhengShouRuZhiChuBiData"
                class="dataChart"
                v-show="cateArrSelected.includes('财政')"
              ></line-only-graph>
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
              <!-- 居民消费水平 -->
              <bar-line-graph
                :newOption="graphOption.juMinXiaoFeiOption"
                :data="graphData.juMinXiaoFeiData"
                class="dataChart"
                v-show="
                  cateArrSelected.includes('国民经济核算') &&
                    indexArrSelected.includes('居民消费水平')
                "
              ></bar-line-graph>
              <!-- 城镇居民消费水平 -->
              <bar-line-graph
                :newOption="graphOption.chengZhenJuMinXiaoFeiOption"
                :data="graphData.chengZhenJuMinXiaoFeiData"
                class="dataChart"
                v-show="
                  cateArrSelected.includes('国民经济核算') &&
                    indexArrSelected.includes('城镇居民消费水平')
                "
              ></bar-line-graph>
              <!-- 农村居民消费水平 -->
              <bar-line-graph
                :newOption="graphOption.nongCunJuMinXiaoFeiOption"
                :data="graphData.nongCunJuMinXiaoFeiData"
                class="dataChart"
                v-show="
                  cateArrSelected.includes('国民经济核算') &&
                    indexArrSelected.includes('农村居民消费水平')
                "
              ></bar-line-graph>
              <!-- 城镇/农村居民消费水平比 -->
              <line-only-graph
                :newOption="graphOption.chengZhenNongCunJuMinXiaoFeiBiOption"
                :data="graphData.chengZhenNongCunJuMinXiaoFeiBiData"
                class="dataChart"
                v-show="cateArrSelected.includes('国民经济核算')"
              ></line-only-graph>

              <!-- 城镇平均工资 -->
              <bar-line-graph
                :newOption="graphOption.chengZhenAverageSalaryOption"
                :data="graphData.chengZhenAverageSalaryData"
                class="dataChart"
                v-show="cateArrSelected.includes('就业人员和工资')"
              ></bar-line-graph>

              <!-- 城镇人口 -->
              <bar-line-graph
                :newOption="graphOption.ChengZhenPopOption"
                :data="graphData.chengZhenPopData"
                class="dataChart"
                v-show="
                  cateArrSelected.includes('人口') &&
                    indexArrSelected.includes('城镇人口')
                "
              ></bar-line-graph>
              <!-- 农村人口 -->
              <bar-line-graph
                :newOption="graphOption.NongCunPopOption"
                :data="graphData.nongCunPopData"
                class="dataChart"
                v-show="
                  cateArrSelected.includes('人口') &&
                    indexArrSelected.includes('乡村人口')
                "
              ></bar-line-graph>
              <!-- 城镇农村人口比 -->
              <line-only-graph
                :newOption="graphOption.ChengZhenNongCunPopBiOption"
                :data="graphData.chengZhenNongCunPopBiData"
                class="dataChart"
                v-show="cateArrSelected.includes('人口')"
              ></line-only-graph>
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

              <!-- 森林覆盖率 -->
              <line-only-graph
                :newOption="graphOption.forestCoverRateOption"
                :data="graphData.forestCoverRateData"
                class="dataChart"
                v-show="
                  cateArrSelected.includes('资源和环境') &&
                    indexArrSelected.includes('森林覆盖率')
                "
              ></line-only-graph>
              <!-- 森林面积 -->
              <pictorial-bar-graph
                :newOption="graphOption.forestAreaOption"
                :data="graphData.forestAreaData"
                class="pictorialDataChart"
                v-show="
                  cateArrSelected.includes('资源和环境') &&
                    indexArrSelected.includes('森林面积')
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
import chinaMapJson from '../../assets/map/china-province.json'
import BarLineGraph from '../../components/graph/Barlinegraph.vue'
import LineOnlyGraph from '../../components/graph/Lineonlygraph.vue'
import ScatterGraph from '../../components/graph/Scattergraph.vue'
import PictorialBarGraph from '../../components/graph/Pictorialbargraph'

export default {
  components: {
    BarLineGraph,
    LineOnlyGraph,
    ScatterGraph,
    PictorialBarGraph
  },
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
        province: [],
        year: []
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
      // 图表数据
      graphData: {
        // 财政
        caiZhengShouRuData: [],
        caiZhengZhiChuData: [],
        caiZhengShouRuZhiChuBiData: [],
        // 经济
        gdpData: [],
        averageGdpData: [],
        juMinXiaoFeiData: [],
        chengZhenJuMinXiaoFeiData: [],
        nongCunJuMinXiaoFeiData: [],
        chengZhenNongCunJuMinXiaoFeiBiData: [],
        // 工资
        chengZhenAverageSalaryData: [],
        // 人口
        chengZhenPopData: [],
        nongCunPopData: [],
        chengZhenNongCunPopBiData: [],
        changZhuPopData: [],
        // 资源
        forestAreaData: [],
        forestCoverRateData: []
      },
      // 图表特别配置项
      graphOption: {
        caiZhengShouRuOption: {},
        caiZhengZhiChuOption: {},
        caiZhengShouRuZhiChuBiOption: {},
        // 经济
        gdpOption: {},
        averageGdpOption: {},
        juMinXiaoFeiOption: {},
        chengZhenJuMinXiaoFeiOption: {},
        nongCunJuMinXiaoFeiOption: {},
        chengZhenNongCunJuMinXiaoFeiBiOption: {},
        // 工资
        chengZhenAverageSalaryOption: {},
        // 人口
        ChengZhenPopOption: {},
        NongCunPopOption: {},
        ChengZhenNongCunPopBiOption: {},
        ChangZhuPopOption: {},
        // 资源
        forestAreaOption: {},
        forestCoverRateOption: {}
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
      if (index !== -1) {
        this.detailList[index].name = ''
        this.detailList[index].area = ''
        this.detailList[index].admin = ''
        this.detailList[index].pop = ''
        this.detailList[index].logo = ''
        this.getMapData()
        index = index + 1
        const str = 'showProvince' + index
        this[str] = 'none!important'
        return
      }
      if (
        !this.detailList[0].name ||
        !this.detailList[1].name ||
        !this.detailList[2].name
      ) {
        if (!this.detailList[0].name) {
          this.detailList[0] = detail
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
      if (num >= 2) {
        const { data: res } = await this.$http.get('/province-data', {
          params: this.queryMapInfo
        })
        this.clearGraph()
        this.provinceComData = res.data.provinceComData
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
        this.drawCaiZhengShouRuGraph()
        this.drawCaiZhengZhiChuGraph()
        this.drawCaiZhengShouRuZhiChuBiGraph()
        // 经济
        this.drawGdpGraph()
        this.drawAverageGdpGraph()
        this.drawJuMinXiaoFeiGraph()
        this.drawChengZhenJuMinXiaoFeiGraph()
        this.drawNongCunJuMinXiaoFeiGraph()
        this.drawChengZhenNongCunJuMinXiaoFeiBiGraph()
        // 工资
        this.drawChengZhenAverageSalaryGraph()
        // 人口
        this.drawChengZhenPopGraph()
        this.drawNongCunPopGraph()
        this.drawChengZhenNongCunPopBiGraph()
        this.drawChangZhuPopGraph()
        // 资源
        this.drawForestAreaGraph()
        this.drawForestCoverRateGraph()
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
      this.queryMapInfo.year = []
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
    // 数据transform到做比例的line-graph
    dataTransformToRateGraphData(indexArr1, indexArr2, graphname) {
      const numS = this.indexArrList.indexOf(indexArr1)
      const numZ = this.indexArrList.indexOf(indexArr2)
      const rateData = []
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
            rateData.push(item)
          }
        })
      })
      const newVal = []
      newVal.push(rateData)
      newVal.push(graphname)
      newVal.push('比例')
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
    // 财政收入图表
    drawCaiZhengShouRuGraph() {
      const newVal = this.dataTransformToLbGraphData('地方财政一般预算收入')
      this.graphData.caiZhengShouRuData = newVal
    },
    // 财政支出图表
    drawCaiZhengZhiChuGraph() {
      const newVal = this.dataTransformToLbGraphData('地方财政一般预算支出')
      this.graphData.caiZhengZhiChuData = newVal
    },
    // 财政收入支出比图表
    drawCaiZhengShouRuZhiChuBiGraph() {
      const newVal = this.dataTransformToRateGraphData(
        '地方财政一般预算收入',
        '地方财政一般预算支出',
        '各省地方财政一般预算收入/支出比'
      )
      this.graphData.caiZhengShouRuZhiChuBiData = newVal
    },
    // 地区生产总值图表
    drawGdpGraph() {
      const newVal = this.dataTransformToLbGraphData('地区生产总值')
      this.graphData.gdpData = newVal
    },
    // 人均生产总值图表
    drawAverageGdpGraph() {
      const newVal = this.dataTransformToScatterGraphData('人均地区生产总值')
      this.graphData.averageGdpData = newVal
    },
    // 居民消费图表
    drawJuMinXiaoFeiGraph() {
      const newVal = this.dataTransformToLbGraphData('居民消费水平')
      this.graphData.juMinXiaoFeiData = newVal
    },
    // 城镇居民消费图表
    drawChengZhenJuMinXiaoFeiGraph() {
      const newVal = this.dataTransformToLbGraphData('城镇居民消费水平')
      this.graphData.chengZhenJuMinXiaoFeiData = newVal
    },
    // 农村居民消费图表
    drawNongCunJuMinXiaoFeiGraph() {
      const newVal = this.dataTransformToLbGraphData('农村居民消费水平')
      this.graphData.nongCunJuMinXiaoFeiData = newVal
    },
    // 城镇/农村居民消费比图表
    drawChengZhenNongCunJuMinXiaoFeiBiGraph() {
      const newVal = this.dataTransformToRateGraphData(
        '城镇居民消费水平',
        '农村居民消费水平',
        '各省城镇/农村居民消费水平比'
      )
      this.graphData.chengZhenNongCunJuMinXiaoFeiBiData = newVal
    },
    // 工资
    drawChengZhenAverageSalaryGraph() {
      const newVal = this.dataTransformToLbGraphData('城镇单位就业人员平均工资')
      this.graphData.chengZhenAverageSalaryData = newVal
    },
    // 城镇人口
    drawChengZhenPopGraph() {
      const newVal = this.dataTransformToLbGraphData('城镇人口')
      this.graphData.chengZhenPopData = newVal
    },
    // 乡村人口
    drawNongCunPopGraph() {
      const newVal = this.dataTransformToLbGraphData('乡村人口')
      this.graphData.nongCunPopData = newVal
    },
    // 城镇乡村人口比
    drawChengZhenNongCunPopBiGraph() {
      const newVal = this.dataTransformToRateGraphData(
        '城镇人口',
        '乡村人口',
        '各省城镇/乡村人口比'
      )
      this.graphData.chengZhenNongCunPopBiData = newVal
    },
    // 常住人口
    drawChangZhuPopGraph() {
      const path =
        'path://M950.270788 846.051145c0 23.871687-19.35072 43.222407-43.220361 43.222407-23.86964 0-43.220361-19.35072-43.220361-43.222407 0-0.271176 0.074701-0.520863 0.078795-0.792039l-0.26913 0c0.010233-0.9967 0.148379-1.961678 0.148379-2.962471 0-70.560032-27.910677-134.460388-73.056899-181.361581l0.260943-0.26299c-7.692193-7.528464-12.495592-17.998933-12.495592-29.614481 0-22.910802 18.570961-41.479717 41.47767-41.479717 11.617595 0 22.088064 4.800329 29.618575 12.495592l0.076748-0.078795c62.155618 62.318324 100.600209 148.297534 100.600209 243.266489l-0.078795 0C950.195064 845.531306 950.270788 845.779969 950.270788 846.051145zM606.40409 581.789483l0 0.107447c-0.212848-0.002047-0.419556-0.032746-0.63445-0.032746-142.497435 0-258.014378 116.599601-258.014378 260.432451 0 0.705058 0.060375 1.393743 0.105401 2.089591 0.020466 0.564865 0.167822 1.093914 0.167822 1.665942 0 23.871687-19.35072 43.222407-43.220361 43.222407-23.871687 0-43.222407-19.35072-43.222407-43.222407 0-0.271176 0.074701-0.520863 0.078795-0.792039l-0.394996 0c0-139.857305 83.486436-259.990383 203.215308-313.963645-49.822732-40.880059-81.626066-102.910834-81.626066-172.388209 0-123.111922 99.80203-222.909859 222.911906-222.909859S828.681546 235.795331 828.681546 358.907253C828.681546 481.803257 729.21823 581.442582 606.40409 581.789483zM605.76964 216.773092c-78.343299 0-141.850705 63.509453-141.850705 141.854798 0 78.341253 63.507406 141.850705 141.850705 141.850705s141.852752-63.509453 141.852752-141.850705C747.623415 280.282544 684.112939 216.773092 605.76964 216.773092zM342.330716 256.001535c-47.368844 13.066597-82.148975 55.764048-82.148975 106.555851 0 42.546002 24.40483 79.415724 60.170404 97.943706 14.476713 7.499811 28.541033 21.713534 30.846542 46.471404 1.998517 21.466917-4.369517 53.691853-32.766264 61.522192-94.958722 26.178219-165.045987 110.373807-168.481226 211.371058 0.210801 1.627057 0.496304 3.232624 0.496304 4.915963 0 21.160949-17.151635 38.314631-38.314631 38.314631-21.158902 0-38.312584-17.153682-38.312584-38.314631 0-0.372483 0.101307-0.719384 0.11154-1.091868l-0.202615-0.002047c0-128.593773 76.339666-230.92644 183.627181-275.247878-44.402279-33.932834-73.092715-86.830601-73.092715-146.441257 0-74.953086 45.225017-139.378397 110.262266-168.574347 30.41573-13.656021 52.572356 2.650363 57.93448 23.63121C358.886787 242.195088 342.330716 256.001535 342.330716 256.001535z'
      const newVal = this.dataTransformToPicBarGraphData('年末常住人口', path)
      this.graphData.changZhuPopData = newVal
    },
    // 资源
    drawForestAreaGraph() {
      const path =
        'path://M952.75 515.22a194.77 194.77 0 0 0-60.23-141.49 168.81 168.81 0 0 0 6.73-47.29c0-93.36-75.94-169.31-169.29-169.31-87.69 0-160 67-168.47 152.52a126.44 126.44 0 0 0-126.15 30.67 127.91 127.91 0 0 0-12.73 14.6c-4.34-69.48-20.05-134-45.34-184.9-33-66.41-79.11-103-129.79-103S150.69 103.6 117.68 170c-30 60.41-46.57 140.14-46.57 224.48S87.42 558.57 117.45 619c27 54.4 63.55 88.76 102.55 99.42V903h-60.28a27 27 0 1 0 0 54h663.74a27 27 0 1 0 0-54H766V711.09c104-4.97 186.75-90.92 186.75-195.87zM730 211.12a115.38 115.38 0 0 1 106.16 160.37l-8.09 19 16.29 12.76a141.37 141.37 0 0 1 54.54 111.92c0 78.36-63.75 142.11-142.11 142.11a141.22 141.22 0 0 1-44.3-7 164.48 164.48 0 0 0-62.83-206.06 127.29 127.29 0 0 0 0.76-13.87 125.93 125.93 0 0 0-34.47-86.65v-0.28A115.39 115.39 0 0 1 730 211.12zM451.24 453.9l0.4-24.74a72.39 72.39 0 1 1 141.82 21.7l-6.6 22.43 21.25 9.71a110.54 110.54 0 0 1-80.24 205.61l-12.17-4-10.77 6.91a128.24 128.24 0 1 1-108-230.25 26.81 26.81 0 0 0 11-2.94 128.17 128.17 0 0 1 18.68-2.73zM166 594.95c-26.39-53.09-40.92-124.28-40.92-200.45S139.65 247.14 166 194.05c23.07-46.41 52.75-73 81.43-73s58.37 26.62 81.43 73c26.39 53.09 40.92 124.28 40.92 200.45 0 6.42-0.11 12.85-0.32 19.26A182.24 182.24 0 0 0 271.39 662a53.51 53.51 0 0 1-23.92 6c-28.68 0-58.36-26.65-81.47-73.05z m108 123.38a107.61 107.61 0 0 0 27.62-11.42 181.51 181.51 0 0 0 133.87 58.85 179.31 179.31 0 0 0 47.51-6.32V903H274zM537 903V748.48c0-0.77 0.19-1.54 0.13-2.29a166.77 166.77 0 0 0 24.87 1.86 163.88 163.88 0 0 0 119.48-51.64 207.69 207.69 0 0 0 30.52 9.86V903z'
      const newVal = this.dataTransformToPicBarGraphData('森林面积', path)
      this.graphData.forestAreaData = newVal
    },
    drawForestCoverRateGraph() {
      const num = this.indexArrList.indexOf('森林覆盖率')
      const unit = this.unitList[num]
      const newVal = []
      newVal.push(this.firstData[num])
      newVal.push('各省森林覆盖率对比')
      newVal.push(unit)
      this.graphData.forestCoverRateData = newVal
      this.graphOption.forestCoverRateOption = {
        yAxis: [
          {
            type: 'value',
            splitNumber: 3,
            axisLabel: {
              formatter: function(value) {
                return value.toFixed(0) + '%'
              }
            },
            boundaryGap: false
          }
        ]
      }
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
      font-weight: bold;
    }
    span:nth-child(2n + 4) {
      font-size: 14px;
      color: #808080;
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
      font-weight: bold;
    }
    span:nth-child(2n + 4) {
      font-size: 14px;
      color: #808080;
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
      font-weight: bold;
    }
    span:nth-child(2n + 4) {
      font-size: 14px;
      color: #808080;
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
  margin-top: 50px;
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
</style>
