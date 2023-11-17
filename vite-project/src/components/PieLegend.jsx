import React from 'react';
import * as echarts from 'echarts/core';
import { LegendComponent } from 'echarts/components';

echarts.use([LegendComponent]);

const PieLegend = () => {
    const handleShowLegend = () => {
        const chartDom = document.getElementById('pie-chart');
        const myChart = echarts.init(chartDom);

        const updatedOption = {
            legend: {
                show: true,
                top: 'bottom',
                left: 'center',
            },
        };

        myChart.setOption(updatedOption);
    };

    return (
        <div>
            <button onClick={handleShowLegend}>Show Legend</button>
        </div>
    );
};

export default PieLegend;