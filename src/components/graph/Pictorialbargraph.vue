<template>
  <div ref="chart"></div>
</template>

<script>
export default {
  name: 'PictorialBarGraph',
  props: {
    data: Array,
    newOption: Object
  },
  data() {
    return {
      PictorialBarGraph: null
    }
  },
  watch: {
    data: {
      handler: function(newval) {
        this.drawPictorialBarGraph()
      },
      deep: true
    }
  },
  mounted() {
    // this.drawPictorialBarGraph()
  },
  methods: {
    drawPictorialBarGraph() {
      if (
        this.PictorialBarGraph !== null &&
        this.PictorialBarGraph !== '' &&
        this.PictorialBarGraph !== undefined
      ) {
        this.PictorialBarGraph.dispose()
        this.PictorialBarGraph = null
      }
      this.PictorialBarGraph = this.$echarts.init(this.$refs.chart)
      let option = {
        title: {
          text: '各省' + this.data[1] + '对比',
          left: -6,
          top: 10,
          subtext: '单位: ' + this.data[2],
          textStyle: {
            fontWeight: 'bolder'
          }
        },
        grid: {
          top: 95,
          right: 18,
          left: 0,
          containLabel: true,
          bottom: 20,
          show: false
        },
        series: [
          {
            type: 'pictorialBar',
            itemStyle: {
              color: '#a84635'
            },
            symbol: this.data[3],
            symbolRepeat: true,
            symbolMargin: '25%!',
            barMaxWidth: '30px'
            // symbolSize: ['80%', '80%']
          },
          {
            barGap: '10%',
            type: 'pictorialBar',
            itemStyle: {
              color: '#fade6d'
            },
            symbol: this.data[3],
            symbolRepeat: true,
            symbolMargin: '25%!',
            barMaxWidth: '30px'
            // symbolSize: ['80%', '80%']
          },
          {
            barGap: '10%',
            type: 'pictorialBar',
            itemStyle: {
              color: '#669ef1'
            },
            symbol: this.data[3],
            symbolRepeat: true,
            symbolMargin: '25%!',
            barMaxWidth: '30px'
            // symbolSize: ['80%', '80%']
          }
        ],
        yAxis: {
          type: 'category',
          boundaryGap: true
        },
        xAxis: [
          {
            type: 'value',
            boundaryGap: false,
            splitLine: { show: false }
          }
        ],
        dataset: [
          {
            source: ''
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
      if (Object.keys(this.data[0][0]).length === 3) {
        option.series.pop()
        option.series.splice(2, 1)
      }
      if (this.newOption) {
        option = Object.assign({}, this.newOption, option)
      }
      option.dataset[0].source = this.data[0]
      this.PictorialBarGraph.setOption(option)
      const that = this
      function resizeGraph() {
        that.PictorialBarGraph.resize()
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
    }
  },
  beforeDestroy() {
    if (
      this.PictorialBarGraph !== null &&
      this.PictorialBarGraph !== '' &&
      this.PictorialBarGraph !== undefined
    ) {
      this.PictorialBarGraph.dispose()
      this.PictorialBarGraph = null
    }
  }
}
</script>

<style lang="less" scoped></style>
