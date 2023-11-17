import React, { useEffect } from 'react';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer]);

const PieChartComponent = ({ data }) => {
    useEffect(() => {
        const chartDom = document.getElementById('pie-chart');
        const myChart = echarts.init(chartDom);
        const option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)',
            },
            legend: {
                top: '5%',
                left: 'center',
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center',
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 40,
                            fontWeight: 'bold',
                        },
                    },
                    labelLine: {
                        show: false,
                    },
                    data,
                },
            ],
        };

        myChart.setOption(option);
    }, [data]);

    return <div id="pie-chart" style={{ height: '600px'}} />;
};

export default PieChartComponent;