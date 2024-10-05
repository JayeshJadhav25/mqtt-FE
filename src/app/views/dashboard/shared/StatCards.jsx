import React, { useEffect, useState } from 'react';
import { Box, Card, Grid, styled, Typography, Icon, Fab, Select, MenuItem, InputLabel, FormControl, useTheme } from '@mui/material';
import axios from 'axios';
import DoughnutChartV2 from './DoughnutChart';
import StatisticsChart from './StatisticsChart';
import DoughnutDevicecChart from './DoughnutDevicecChart';
import SimpleCard from 'app/components/SimpleCard';
import LinceChartBattery from './LinceChartBattery';
import axiosInstance from '../../../../axiosInterceptor';
import WifiOffIcon from '@mui/icons-material/WifiOff';

// Custom styled components for improved UI
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '16px',
  background: theme.palette.background.paper,
  height: '100%',
  textAlign: 'center',
  position: 'relative',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[6],
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '16px',
  fontWeight: '600',
  color: theme.palette.primary.main,
}));

const H1 = styled('h1')(({ theme }) => ({
  margin: 0,
  flexGrow: 1,
  color: theme.palette.text.secondary,
}));

const CornerText = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: theme.palette.text.secondary,
  position: 'absolute',
}));

// New UI Card styles for additional stats
const OverviewCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: '24px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '12px',
  boxShadow: theme.shadows[3],
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[5],
  },
  transition: 'all 0.3s ease',
}));

const OverviewNumber = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  fontWeight: 'bold',
  color: theme.palette.text.primary,
}));

const OverviewLabel = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.text.secondary,
}));

const StatCards = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [timePeriod, setTimePeriod] = useState("This Month");
  const [devices, setDevices] = useState([]);

  const theme = useTheme();


  const fetchData = async () => {
    try {
      const response = await axiosInstance.post('/getDashboardDetails');
      console.log('response', response.data)
      if (response && response.data && response.data.data) {
        setDashboardData(response.data.data || {})
      }

    } catch (error) {
      console.error('Error fetching data', error);
    }
  }

  const fetchDeviceData = async () => {
    try {
      const response = await axiosInstance.post('/getMQTTDevice');

      if (response && response.data && response.data.status) {
        setDevices(response.data.status || [])
      }

    } catch (error) {
      console.error('Error fetching data', error);
    }
  }

  useEffect(() => {
    fetchData();
    fetchDeviceData();
  }, []);

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  return (
    <Box sx={{ p: 3 }}>

      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={3}>
        {/* "Overview" Title */}
        {/* <Typography variant="h5" fontWeight="bold">
          Dashboard
        </Typography> */}

        {/* Month Filter */}
        {/* <FormControl variant="outlined" size="small" sx={{ width: '150px' }}>
          <InputLabel id="time-period-label">Select Month</InputLabel>
          <Select
            labelId="time-period-label"
            value={timePeriod}
            onChange={handleTimePeriodChange}
            label="Time Period"
          >
            <MenuItem value="This Month">This Month</MenuItem>
            <MenuItem value="Last Month">Last Month</MenuItem>
            <MenuItem value="This Year">This Year</MenuItem>
            <MenuItem value="All Time">All Time</MenuItem>
          </Select>
        </FormControl> */}
      </Box>
      <Grid container spacing={3} sx={{ mb: '24px' }}>
        {/* Existing Stat Cards */}
        <Grid item xs={12} md={3}>
          <StyledCard elevation={6} sx={{ textAlign: 'center', position: 'relative', padding: '24px' }}>
            <ContentBox>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Total Devices
              </Typography>
              <Typography variant="h3" fontWeight="bold">
                {(dashboardData.deviceCounts && dashboardData.deviceCounts.totalCount) || 0}
              </Typography>
            </ContentBox>
            <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
              <Box textAlign="center" sx={{ paddingLeft: '16px' }}>
                <Typography variant="h6" fontWeight="bold">
                  {(dashboardData.deviceCounts && dashboardData.deviceCounts.activeCount) || 0}
                </Typography>
                <Typography variant="body2">Active</Typography>
              </Box>
              <Box textAlign="center" sx={{ paddingRight: '16px' }}>
                <Typography variant="h6" fontWeight="bold">
                  {(dashboardData.deviceCounts && dashboardData.deviceCounts.inactiveCount) || 0}
                </Typography>
                <Typography variant="body2">Inactive</Typography>
              </Box>
            </Box>
          </StyledCard>
        </Grid>
        {/* Repeat for the other 3 existing cards */}
        <Grid item xs={12} md={3}>
          <StyledCard elevation={6} sx={{ textAlign: 'center', position: 'relative', padding: '24px' }}>
            <ContentBox>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Door
              </Typography>
              <Typography variant="h3" fontWeight="bold">
                {(dashboardData.loggerDoorCounts && dashboardData.loggerDoorCounts.totalCount) || 0}
              </Typography>
            </ContentBox>
            <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
              <Box textAlign="center" sx={{ paddingLeft: '16px' }}>
                <Typography variant="h6" fontWeight="bold">
                  {(dashboardData.loggerDoorCounts && dashboardData.loggerDoorCounts.openCount) || 0}
                </Typography>
                <Typography variant="body2">Open</Typography>
              </Box>
              <Box textAlign="center" sx={{ paddingRight: '16px' }}>
                <Typography variant="h6" fontWeight="bold">
                  {(dashboardData.loggerDoorCounts && dashboardData.loggerDoorCounts.closedCount) || 0}
                </Typography>
                <Typography variant="body2">Close</Typography>
              </Box>
            </Box>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <StyledCard elevation={6} sx={{ textAlign: 'center', position: 'relative', padding: '24px' }}>
            <ContentBox>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                State
              </Typography>
              <Typography variant="h3" fontWeight="bold">
                {(dashboardData.loggerStateCounts && dashboardData.loggerStateCounts.totalCount) || 0}
              </Typography>
            </ContentBox>
            <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
              <Box textAlign="center" sx={{ paddingLeft: '16px' }}>
                <Typography variant="h6" fontWeight="bold">
                  {(dashboardData.loggerStateCounts && dashboardData.loggerStateCounts.runningCount) || 0}
                </Typography>
                <Typography variant="body2">Running</Typography>
              </Box>
              <Box textAlign="center" sx={{ paddingRight: '16px' }}>
                <Typography variant="h6" fontWeight="bold">
                  {(dashboardData.loggerStateCounts && dashboardData.loggerStateCounts.idleCount) || 0}
                </Typography>
                <Typography variant="body2">Idle</Typography>
              </Box>
            </Box>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <StyledCard elevation={6} sx={{ textAlign: 'center', position: 'relative', padding: '24px' }}>
            <ContentBox>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Maintenance
              </Typography>
              <Typography variant="h3" fontWeight="bold">
                {(dashboardData.maintenanceCounts && dashboardData.maintenanceCounts.totalCount) || 0}
              </Typography>
            </ContentBox>
            <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
              <Box textAlign="center" sx={{ paddingLeft: '16px' }}>
                <Typography variant="h6" fontWeight="bold">
                  {(dashboardData.maintenanceCounts && dashboardData.maintenanceCounts.pendingCount) || 0}
                </Typography>
                <Typography variant="body2">Pending</Typography>
              </Box>
              <Box textAlign="center" sx={{ paddingRight: '16px' }}>
                <Typography variant="h6" fontWeight="bold">
                  {(dashboardData.maintenanceCounts && dashboardData.maintenanceCounts.approvedCount) || 0}
                </Typography>
                <Typography variant="body2">Approved</Typography>
              </Box>
            </Box>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Add the New UI after the grid */}
      <Typography variant="h6" fontWeight="bold">
        Devices
      </Typography>
      <Grid container spacing={3}>
        {devices.length > 0 ? (
          devices.map((device, index) => (
            <Grid item xs={12} md={3} key={index}>
              <OverviewCard
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // border: '1px solid black',
                  padding: '16px',
                  // borderRadius: '4px',
                }}
              >
                {/* Device Label */}
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {device.deviceName}
                </Typography>

                {/* Custom Icon and Status in a Row */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Custom Icon */}
                  <Box position="relative" display="flex" alignItems="center" flexDirection="column" mr={1}>
                    {/* Main Circle */}
                    <Box
                      sx={{
                        width: '16px',
                        height: '16px',
                        bgcolor: (device.mqttStatusDetails && device.mqttStatusDetails.mqttRelayState == true) ? 'red' : 'green', // Dynamic color based on status
                        borderRadius: '50%',
                        position: 'relative',
                        zIndex: 2,
                      }}
                    />
                    {/* Antenna (using line or a Box) */}
                    <Box
                      sx={{
                        width: '4px',
                        height: '30px',
                        bgcolor: 'gray',
                        borderRadius: '2px',
                        marginTop: '-5px',
                      }}
                    />
                    {/* Base of the antenna */}
                    <Box
                      sx={{
                        width: '24px',
                        height: '12px',
                        bgcolor: 'gray',
                        borderRadius: '12px 12px 0 0',
                        marginTop: '-3px',
                      }}
                    />
                  </Box>

                  {/* Dynamic Status */}
                  <Typography variant="body1" fontWeight="bold">
                    {(device.mqttStatusDetails && device.mqttStatusDetails.mqttRelayState == true) ? 'OFFLINE' : 'ONLINE'}
                  </Typography>
                </Box>
              </OverviewCard>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '16px',
              }}
            >
              <Typography variant="h6" color="textSecondary">
                No devices found
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      {/* <Box mt={4}>
        <SimpleCard title="Comparison of Device Idle Time vs. Running Time">

          <StatisticsChart
            height="350px"
            color={[theme.palette.primary.dark, theme.palette.primary.light]}
          />
        </SimpleCard>
      </Box> */}

      <Box mt={4}>
        <SimpleCard title="Device Status">
          <DoughnutDevicecChart
            height="350px"
            color={[
              theme.palette.primary.dark,
              theme.palette.primary.main,
              theme.palette.primary.light,
            ]}
            activeCount={(dashboardData.deviceCounts && dashboardData.deviceCounts.activeCount) || 0}
            inactiveCount={(dashboardData.deviceCounts && dashboardData.deviceCounts.inactiveCount) || 0}
            frozenCount={(dashboardData.deviceCounts && dashboardData.deviceCounts.frozenCount) || 0}
          />
        </SimpleCard>
      </Box>

      {/* <Box mt={4}>
        <SimpleCard title="Device Battery %">
          <LinceChartBattery
            height="350px"
            color={[theme.palette.primary.main, theme.palette.primary.light]}
          />
        </SimpleCard>
      </Box> */}
    </Box>

  );
};

export default StatCards;
