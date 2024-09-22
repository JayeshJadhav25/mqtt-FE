import React, { useEffect, useState } from 'react';
import { Box, Card, Grid, styled, Typography, Icon, Fab, Select, MenuItem, InputLabel, FormControl, useTheme } from '@mui/material';
import axios from 'axios';
import DoughnutChartV2 from './DoughnutChart';
import StatisticsChart from './StatisticsChart';
import DoughnutDevicecChart from './DoughnutDevicecChart';
import SimpleCard from 'app/components/SimpleCard';
import LinceChartBattery from './LinceChartBattery';

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
  const [deviceData, setDeviceData] = useState([]);
  const [timePeriod, setTimePeriod] = useState("This Month");
  const theme = useTheme();

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/getMQTTDevice`)
      .then(response => {
        if (response && response.data && response.data.status) {
          setDeviceData(response.data.status);
        }
      })
      .catch(error => {
        console.error('Error fetching device data:', error);
      });
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
        <FormControl variant="outlined" size="small" sx={{ width: '150px' }}> {/* Set desired width */}
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
        </FormControl>
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
                17
              </Typography>
            </ContentBox>
            <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
              <Box textAlign="center" sx={{ paddingLeft: '16px' }}>
                <Typography variant="h6" fontWeight="bold">
                  7
                </Typography>
                <Typography variant="body2">Active</Typography>
              </Box>
              <Box textAlign="center" sx={{ paddingRight: '16px' }}>
                <Typography variant="h6" fontWeight="bold">
                  10
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
                17
              </Typography>
            </ContentBox>
            <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
              <Box textAlign="center" sx={{ paddingLeft: '16px' }}>
                <Typography variant="h6" fontWeight="bold">
                  7
                </Typography>
                <Typography variant="body2">Active</Typography>
              </Box>
              <Box textAlign="center" sx={{ paddingRight: '16px' }}>
                <Typography variant="h6" fontWeight="bold">
                  10
                </Typography>
                <Typography variant="body2">Inactive</Typography>
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
                17
              </Typography>
            </ContentBox>
            <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
              <Box textAlign="center" sx={{ paddingLeft: '16px' }}>
                <Typography variant="h6" fontWeight="bold">
                  7
                </Typography>
                <Typography variant="body2">Active</Typography>
              </Box>
              <Box textAlign="center" sx={{ paddingRight: '16px' }}>
                <Typography variant="h6" fontWeight="bold">
                  10
                </Typography>
                <Typography variant="body2">Inactive</Typography>
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
                17
              </Typography>
            </ContentBox>
            <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
              <Box textAlign="center" sx={{ paddingLeft: '16px' }}>
                <Typography variant="h6" fontWeight="bold">
                  7
                </Typography>
                <Typography variant="body2">Active</Typography>
              </Box>
              <Box textAlign="center" sx={{ paddingRight: '16px' }}>
                <Typography variant="h6" fontWeight="bold">
                  10
                </Typography>
                <Typography variant="body2">Inactive</Typography>
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
        <Grid item xs={12} md={3}>
          <OverviewCard>
            <OverviewNumber>10,495</OverviewNumber>
            <OverviewLabel>New Members</OverviewLabel>
          </OverviewCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <OverviewCard>
            <OverviewNumber>30,942</OverviewNumber>
            <OverviewLabel>Places Added</OverviewLabel>
          </OverviewCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <OverviewCard>
            <OverviewNumber>45,269</OverviewNumber>
            <OverviewLabel>Support Members</OverviewLabel>
          </OverviewCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <OverviewCard>
            <OverviewNumber>20,965</OverviewNumber>
            <OverviewLabel>Tags Used</OverviewLabel>
          </OverviewCard>
        </Grid>
      </Grid>

      <Box mt={4}>
        <SimpleCard title="Comparison of Device Idle Time vs. Running Time">

          <StatisticsChart
            height="350px"
            color={[theme.palette.primary.dark, theme.palette.primary.light]}
          />
        </SimpleCard>
      </Box>

      <Box mt={4}>
        <SimpleCard title="Device Status">
          <DoughnutDevicecChart
            height="350px"
            color={[
              theme.palette.primary.dark,
              theme.palette.primary.main,
              theme.palette.primary.light,
            ]}
          />
        </SimpleCard>
      </Box>

      <Box mt={4}>
        <SimpleCard title="Device Battery %">
          <LinceChartBattery
            height="350px"
            color={[theme.palette.primary.main, theme.palette.primary.light]}
          />
        </SimpleCard>
      </Box>
    </Box>

  );
};

export default StatCards;
