import { useTheme } from '@mui/system';
import ReactEcharts from 'echarts-for-react';

const DoughnutDeviceChart = ({ height, color = [], activeCount, inactiveCount, frozenCount }) => {
    const theme = useTheme();

    const option = {
        legend: {
            show: true,
            itemGap: 20,
            icon: 'circle',
            bottom: 0,
            textStyle: { color: theme.palette.text.secondary, fontSize: 13, fontFamily: 'roboto' },
            data: ['Active', 'Inactive', 'Frozen'], // Reflect device types in the legend
        },
        tooltip: {
            show: true,
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)' // Show detailed tooltip with name, count, and percentage
        },
        series: [
            {
                name: 'Device Status', // Title for the tooltips
                type: 'pie',
                radius: ['45%', '72.55%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                hoverOffset: 5,
                stillShowZeroSum: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                        textStyle: {
                            color: theme.palette.text.secondary,
                            fontSize: 13,
                            fontFamily: 'roboto',
                        },
                        formatter: '{a}',
                    },
                    emphasis: {
                        show: true,
                        textStyle: { fontSize: '14', fontWeight: 'normal' },
                        formatter: '{b} \n{c} ({d}%)', // Display device name, count, and percentage on hover
                    },
                },
                labelLine: { normal: { show: false } },
                data: [
                    { value: activeCount, name: 'Active' },   // Active devices count
                    { value: inactiveCount, name: 'Inactive' }, // Inactive devices count
                    { value: frozenCount, name: 'Frozen' },   // Frozen devices count
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                },
            },
        ],
    };

    return (
        <ReactEcharts
            style={{ height: height }}
            option={{ ...option, color: color.length ? color : ['#00FF00', '#FF0000', '#0000FF'] }}
        />
    );
};

export default DoughnutDeviceChart;
