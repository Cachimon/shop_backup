<template>
  <div class="report">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div id="chart-board" style="width: 700px;height:400px;"></div>
    </el-card>
  </div>
</template>
<script>
import echarts from "echarts";
let _ = require("lodash");
export default {
  data() {
    return {
      options: {
        title: {
          text: "用户来源"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#E9EEF3"
            }
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ]
      }
    };
  },
  created(){
  },
  mounted(){
    let dataChart = echarts.init(document.querySelector("#chart-board"))
    this.$http.get('reports/type/1').then(res => {
      if(res.data.meta.status !== 200)
        return this.$message.error("获取报表数据失败")
      let resOption = res.data.data
      let mergeOption = _.merge(resOption, this.options)
      dataChart.setOption(mergeOption)
    })
  }
};
</script>
<style lang="scss" scoped>
</style>
