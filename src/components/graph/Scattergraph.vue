<template>
  <div ref="chart"></div>
</template>

<script>
export default {
  name: 'ScatterGraph',
  props: {
    data: Array,
    newOption: Object
  },
  data() {
    return {
      ScatterGraph: null
    }
  },
  watch: {
    data: {
      handler: function(newval) {
        this.drawScatterGraph()
      },
      deep: true
    }
  },
  mounted() {
    // this.drawScatterGraph()
  },
  methods: {
    drawScatterGraph() {
      if (
        this.ScatterGraph !== null &&
        this.ScatterGraph !== '' &&
        this.ScatterGraph !== undefined
      ) {
        this.ScatterGraph.dispose()
        this.ScatterGraph = null
      }
      this.ScatterGraph = this.$echarts.init(this.$refs.chart)
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
          source: this.data[0]
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
      if (Object.keys(this.data[0][0]).length === 3) {
        option.series.pop()
        option.series.splice(2, 1)
      }
      if (this.newOption) {
        option = Object.assign({}, this.newOption, option)
      }
      this.ScatterGraph.setOption(option)
      const that = this
      function resizeGraph() {
        that.ScatterGraph.resize()
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
      this.ScatterGraph !== null &&
      this.ScatterGraph !== '' &&
      this.ScatterGraph !== undefined
    ) {
      this.ScatterGraph.dispose()
      this.ScatterGraph = null
    }
  }
}
</script>

<style lang="less" scoped></style>
