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
            textStyle: {
                color: theme.palette.text.secondary,
                fontSize: 13,
                fontFamily: 'roboto'
            },
            data: ['Active', 'Inactive', 'Frozen']
        },
        tooltip: {
            show: true,
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
            {
                name: 'Device Status',
                type: 'pie',
                radius: ['45%', '72.55%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                hoverOffset: 5,
                stillShowZeroSum: false,
                label: {
                    show: false,
                    position: 'center',
                    color: theme.palette.text.secondary,
                    fontSize: 13,
                    fontFamily: 'roboto',
                    formatter: '{a}'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 14,
                        fontWeight: 'normal',
                        formatter: '{b} \n{c} ({d}%)'
                    },
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: activeCount, name: 'Active' },
                    { value: inactiveCount, name: 'Inactive' },
                    { value: frozenCount, name: 'Frozen' }
                ]
            }
        ]
    };

    return (
        <ReactEcharts
            style={{ height: height }}
            option={{
                ...option,
                color: color.length ? color : ['#00FF00', '#FF0000', '#0000FF']
            }}
        />
    );
};

export default DoughnutDeviceChart;
