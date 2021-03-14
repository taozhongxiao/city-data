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
    width: 92%;
    padding: 0 4%;
  }
  .main-map {
    // float: right;
    width: 92%;
    padding: 0 4%;
    height: 580px;
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

.provinceselection {
  width: 100%;
  height: 450px;
  display: flex;
  justify-content: flex-start;
  .province1 {
    width: 18%;
    height: 100%;
    border-radius: 5%;
    background-color: #eeeeee;
    margin-left: 2%;
  }
  .province2 {
    width: 18%;
    height: 100%;
    border-radius: 5%;
    background-color: #eeeeee;
    margin-left: 2%;
  }
  .province3 {
    width: 18%;
    height: 100%;
    border-radius: 5%;
    background-color: #eeeeee;
    margin-left: 2%;
  }
}

#provinceChart {
  width: 40%;
  height: 450px;
  float: left;
  padding: 0;
  box-sizing: border-box;
  border-radius: 5%;
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
