<template>
  <div ref="chart"></div>
</template>

<script>
export default {
  name: 'LineOnlyGraph',
  props: {
    data: Array,
    newOption: Object
  },
  data() {
    return {
      LineGraph: null
    }
  },
  watch: {
    data: {
      handler: function(newval) {
        this.drawLineGraph()
      },
      deep: true
    }
  },
  mounted() {
    // this.drawLineGraph()
  },
  methods: {
    drawLineGraph() {
      if (
        this.LineGraph !== null &&
        this.LineGraph !== '' &&
        this.LineGraph !== undefined
      ) {
        this.LineGraph.dispose()
        this.LineGraph = null
      }
      this.LineGraph = this.$echarts.init(this.$refs.chart)
      const option = {
        title: {
          text: this.data[1],
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
        Object.assign(option, this.newOption)
      }
      console.log('新', this.newOption)
      console.log('2', option)
      option.dataset[0].source = this.data[0]
      this.LineGraph.setOption(option)
      const that = this
      window.addEventListener('resize', function() {
        that.LineGraph.resize()
      })
    }
  },
  beforeDestroy() {
    if (
      this.LineGraph !== null &&
      this.LineGraph !== '' &&
      this.LineGraph !== undefined
    ) {
      this.LineGraph.dispose()
      this.LineGraph = null
    }
  }
}
</script>

<style lang="less" scoped></style>
