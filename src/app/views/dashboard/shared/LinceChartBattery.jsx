import React, { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import ReactEcharts from 'echarts-for-react';
import axiosInstance from '../../../../axiosInterceptor';

const EChartsDottedLine = () => {
    const theme = useTheme();
    const [chartData, setChartData] = useState([]); // State to hold fetched data
    const [loading, setLoading] = useState(true);   // Loading state

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.post('/getDashboardGraphDetails', {});

                if (response && response.data && response.data.data) {
                    const apiData = response.data.data.map(item => ({
                        day: item.day,
                        totalCount: item.totalCount || 0,
                        logTypes: item.log_types,  // Include log_types for the tooltip
                    }));

                    setChartData(apiData); // Set the fetched data
                    setLoading(false);     // Set loading to false
                }

            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);     // Set loading to false even in case of error
            }
        };

        fetchData();
    }, []);

    // ECharts option configuration
    const getOption = () => {
        return {
            xAxis: {
                type: 'category',
                data: chartData.map((d) => d.day), // Dynamically set x-axis data from API
                axisLine: {
                    lineStyle: {
                        color: theme.palette.text.primary, // Adjust to MUI theme
                    },
                },
            },
            yAxis: {
                type: 'value',
                min: 0,
                max: 800,
                interval: 200,
                axisLine: {
                    lineStyle: {
                        color: theme.palette.text.primary, // Adjust to MUI theme
                    },
                },
            },
            series: [
                {
                    data: chartData.map((d) => d.totalCount), // Dynamically set series data from API
                    type: 'line',
                    symbol: 'circle',
                    symbolSize: 8,
                    lineStyle: {
                        type: 'dotted',
                        color: theme.palette.primary.main, // Use MUI primary color
                    },
                    itemStyle: {
                        color: theme.palette.primary.main,
                    },
                },
            ],
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    const dataIndex = params[0].dataIndex; // Get the index of the hovered point
                    const dayData = chartData[dataIndex];  // Access the data for that day

                    // Create the log_types string for the tooltip
                    const logTypes = dayData.logTypes
                        .map(log => `${log.log_type}: ${log.count}`)
                        .join(', ');

                    return `${dayData.day}<br/>Total Count: ${dayData.totalCount}<br/>${logTypes}`;
                },
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
        };
    };

    return (
        <Box sx={{ height: 300 }}>
            {loading ? (
                <div>Loading chart data...</div> // Display loading message while data is being fetched
            ) : (
                <ReactEcharts option={getOption()} style={{ height: '100%', width: '100%' }} />
            )}
        </Box>
    );
};

export default EChartsDottedLine;
