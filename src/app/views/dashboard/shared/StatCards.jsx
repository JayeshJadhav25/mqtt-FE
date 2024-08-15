import React, { useEffect, useState } from 'react';
import { Box, Card, Grid, Icon, IconButton, styled, Tooltip, Typography,Divider } from '@mui/material';
import axios from 'axios';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));

const StatCards = () => {
  const [logCount, setLogCount] = useState(0);
  const [deviceData, setDeviceData] = useState([]);

  useEffect(() => {
    // Fetch log count
    axios.post(`${process.env.REACT_APP_API_URL}/api/getDeviceLogCount`)
      .then(response => {
        setLogCount(response.data.totalSize);
      })
      .catch(error => {
        console.error('Error fetching log count:', error);
      });

    // Fetch device data
    axios.post(`${process.env.REACT_APP_API_URL}/api/getDeviceData`)
      .then(response => {
        if(response && response.data && response.data.status) {
          setDeviceData(response.data.status);

        }
      })
      .catch(error => {
        console.error('Error fetching device data:', error);
      });
  }, []);

  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
            <Grid item xs={12} md={6}>
        <StyledCard elevation={6}>
          <ContentBox>
            <Icon className="icon">group</Icon>
            <Box ml="12px">
              <Typography variant="body2" color="textSecondary">Log Count</Typography>
              <Heading>{logCount}</Heading>
            </Box>
          </ContentBox>

          {/* <Tooltip title="View Details" placement="top">
            <IconButton>
              <Icon>arrow_right_alt</Icon>
            </IconButton>
          </Tooltip> */}
        </StyledCard>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      
      {deviceData.map((data, index) => (
        <Grid item xs={12} md={6} key={index}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">{data.logType === 'POWER' ? 'power' : 'wifi'}</Icon>
              <Box ml="12px">
                <Typography variant="body2" color="textSecondary">Log Type</Typography>
                <Heading>{data.logType}</Heading>
              </Box>
              <Box ml="12px">
                <Typography variant="body2" color="textSecondary">Count</Typography>
                <Heading>{data.count}</Heading>
              </Box>
              <Box ml="12px">
                <Typography variant="body2" color="textSecondary">Date</Typography>
                <Heading>{data.date}</Heading>
              </Box>
            </ContentBox>

            {/* <Tooltip title="View Details" placement="top">
              <IconButton>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip> */}
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCards;
