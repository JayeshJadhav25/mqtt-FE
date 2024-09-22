import { useTheme } from '@mui/system';
import ReactEcharts from 'echarts-for-react';

const StatisticsChart = ({ height, color = [] }) => {
    const theme = useTheme();

    const option = {
        grid: { top: '10%', bottom: '10%', right: '5%' },
        legend: {
            show: true, // Enable the legend
            right: '5%', // Position it to the right
            top: '5%',   // Position it at the top
            textStyle: {
                color: theme.palette.text.secondary,
            },
            data: [
                { name: 'Active', icon: 'rect' },
                { name: 'Inactive', icon: 'rect' },
            ],
        },
        color: ['#28a745', '#223388'], // Green for 'Active', Blue for 'Inactive'
        barGap: 0,
        barMaxWidth: '64px',
        dataset: {
            source: [
                ['Month', 'Active', 'Inactive'], // Adjusted names
                ['Jan', 2200, 1200],
                ['Feb', 800, 500],
                ['Mar', 700, 1350],
                ['Apr', 1500, 1250],
                ['May', 2450, 450],
                ['June', 1700, 1250],
            ],
        },
        xAxis: {
            type: 'category',
            axisLine: { show: false },
            splitLine: { show: false },
            axisTick: { show: false },
            axisLabel: {
                fontSize: 13,
                fontFamily: 'roboto',
                color: theme.palette.text.secondary,
            },
        },
        yAxis: {
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: {
                lineStyle: { color: theme.palette.text.secondary, opacity: 0.15 },
            },
            axisLabel: {
                fontSize: 13,
                fontFamily: 'roboto',
                color: theme.palette.text.secondary,
            },
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
            {
                name: 'Active', // Specify the series name
                type: 'bar'
            },
            {
                name: 'Inactive', // Specify the series name
                type: 'bar'
            }
        ],
    };

    return <ReactEcharts style={{ height: height }} option={{ ...option }} />;
};

export default StatisticsChart;
