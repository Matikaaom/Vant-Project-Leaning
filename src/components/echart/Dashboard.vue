<template>
	<v-chart :option="chartOption" style="width: 100%; height: 450px" autoresize />
</template>

<script lang="ts" setup>

import "echarts"
import { color } from "echarts";
import VChart from "vue-echarts"

const chartOption = {
  tooltip: {
        trigger: 'item'
  },
  legend: {
        top: '3%',
        left: 'center'
    },
  series: [
    {
        name: 'Number of animals',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
        },
        label: {
            show: false,
            position: 'center'
        },
        labelLine: {
            show: false
        },
        data: [
            { value: 250, name: 'Cat', itemStyle: { color: "#FA71C4" } },
            { value: 400, name: 'Dog', itemStyle: { color: "#F994FF" } },
            { value: 200, name: 'Bird', itemStyle: { color: "#FEC7E8" } },
            { value: 300, name: 'Pig', itemStyle: { color: "#FBC7FE" } },
            { value: 150, name: 'Fish', itemStyle: { color: "#FF98D6" } },
            { value: 200, name: 'Rabbit', itemStyle: { color: "#E380E9" } },
        ]
    }
  ]
};

</script>
