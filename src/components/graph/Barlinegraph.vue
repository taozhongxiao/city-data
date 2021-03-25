<template>
  <div ref="chart"></div>
</template>

<script>
export default {
  name: 'BarLineGraph',
  props: {
    data: Array,
    newOption: Object
  },
  data() {
    return {
      BarLineGraph: null
    }
  },
  watch: {
    data: {
      handler: function(newval) {
        this.drawBarLineGraph()
      },
      deep: true
    }
  },
  mounted() {
    // this.drawBarLineGraph()
  },
  methods: {
    drawBarLineGraph() {
      if (
        this.BarLineGraph !== null &&
        this.BarLineGraph !== '' &&
        this.BarLineGraph !== undefined
      ) {
        this.BarLineGraph.dispose()
        this.BarLineGraph = null
      }
      this.BarLineGraph = this.$echarts.init(this.$refs.chart)
      let option = {
        title: {
          text: '各省' + this.data[2] + '&增长率对比',
          left: -6,
          top: 10,
          subtext: '单位: ' + this.data[3],
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
              } else if (Math.floor(value.max / 200000) === 0) {
                return ((value.max * 2) / 20000).toFixed(0) * 20000
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
              if (value.min < 0 && value.max < 0) {
                return (value.min - Math.abs(value.min) - 0.05).toFixed(1)
              } else if (value.min < 0 && value.max >= 0) {
                return (value.min - value.max - 0.05).toFixed(1)
              } else {
                return (value.min - value.max).toFixed(1)
              }
            }
          }
        ],
        dataset: [
          {
            source: ''
          },
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
      option.dataset[1].source = this.data[1]
      this.BarLineGraph.setOption(option)
      const that = this
      window.addEventListener('resize', function() {
        that.BarLineGraph.resize()
      })
    }
  },
  beforeDestroy() {
    if (
      this.BarLineGraph !== null &&
      this.BarLineGraph !== '' &&
      this.BarLineGraph !== undefined
    ) {
      this.BarLineGraph.dispose()
      this.BarLineGraph = null
    }
  }
}
</script>

<style lang="less" scoped></style>
