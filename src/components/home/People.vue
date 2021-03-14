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
            <span>新疆维吾尔自治区</span>
            <span></span>
            <span></span>
          </div>
          <div class="province2" v-bind:style="{ display: showProvince2 }"></div>
          <div class="province3" v-bind:style="{ display: showProvince3 }"></div>
        </div>
        <div class="main-map"></div>
        <div class="secondclass">
          <div>fuck</div>
        </div>
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
      showProvince1: 'block',
      showProvince2: 'block',
      showProvince3: 'block'
    }
  },
  methods: {
    drawMapGraph() {
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
        toolbox: {
          show: true,
          orient: 'vertical',
          right: '2%',
          bottom: '2%',
          feature: {
            restore: {}
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
              max: 5
            },
            center: [104.2363, 35.8572],
            itemStyle: {}
          }
        ]
      }
      this.provinceChart.setOption(optionMap, true)
      this.provinceChart.on('click', function(arg) {
        console.log(arg)
      })
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
}
</style>
