import React, { useEffect, useState } from 'react';
import { Box, Card, Grid, Icon, styled, Typography, Divider, Fab } from '@mui/material';
import axios from 'axios';

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
  transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth transition for hover effects
  '&:hover': {
    transform: 'translateY(-8px)', // Slightly raise the card on hover
    boxShadow: theme.shadows[6], // Increase shadow depth on hover
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '16px', // Slightly larger font size
  fontWeight: '600', // Bold font weight for better emphasis
  color: theme.palette.primary.main,
}));

const FabIcon = styled(Fab)(() => ({
  width: '44px !important',
  height: '44px !important',
  boxShadow: 'none !important',
}));

const H3 = styled('h3')(({ textcolor }) => ({
  margin: 0,
  color: textcolor,
  fontWeight: '500',
  marginLeft: '12px',
}));

const H1 = styled('h1')(({ theme }) => ({
  margin: 0,
  flexGrow: 1,
  color: theme.palette.text.secondary,
}));

const Span = styled('span')(({ textcolor }) => ({
  fontSize: '13px',
  color: textcolor,
  marginLeft: '4px',
}));

const IconBox = styled('div')(() => ({
  width: 16,
  height: 16,
  color: '#fff',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '300px ',
  justifyContent: 'center',
  '& .icon': { fontSize: '14px' },
}));

const StatCards = () => {
  const [deviceData, setDeviceData] = useState([]);

  useEffect(() => {
    // Fetch log count

    // Fetch device data
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

  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      <Grid item xs={12} md={4}>

      <Card elevation={6} sx={{ p: 2 }}>
          <ContentBox>
            <FabIcon size="medium" sx={{ background: 'rgba(9, 182, 109, 0.15)' }}>
              <Icon sx={{ color: '#08ad6c' }}>trending_up</Icon>
            </FabIcon>
            <H3 textcolor={'#08ad6c'}>Total Devices</H3>
          </ContentBox>

          <ContentBox sx={{ pt: 2 }}>
            <H1>{deviceData.length}</H1>
            {/* <IconBox sx={{ background: 'rgba(9, 182, 109, 0.15)' }}> */}
              {/* <Icon className="icon">expand_less</Icon> */}
            {/* </IconBox> */}
            {/* <Span textcolor={'#08ad6c'}>(+21%)</Span> */}
          </ContentBox>
        </Card>


        {/* <StyledCard elevation={6}>
          <ContentBox>
            <Icon className="icon">devices</Icon>
            <Box mt="12px">
              <Typography variant="body2" color="textSecondary">Total Devices</Typography>
              <Heading>{deviceData.length}</Heading>
            </Box>
          </ContentBox>
        </StyledCard> */}
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>

      {deviceData.map((data, index) => (
        <Grid item xs={12} md={4} key={index}>
          <StyledCard elevation={12}>
            <ContentBox>
              <Icon className="icon">
                {/* Conditional icon based on mqttRelayState */}
                {data.mqttStatusDetails.mqttRelayState ? 'power' : 'power_off'}
              </Icon>
              <Box mt="12px">
                <Heading>{data.deviceName || "N/A"}</Heading>
                <Grid item xs={12}>
        <Divider />
      </Grid>
                {/* Dynamically render all key-value pairs of mqttStatusDetails */}
                {Object.entries(data.mqttStatusDetails).map(([key, value]) => (
                  <Box key={key} mb="8px">
                    {/* Check if the key is 'mqttRelayState' and if the value is a boolean */}
                    {key === 'mqttRelayState' && typeof value === 'boolean' ? (
                      <Heading>{key.toUpperCase()} :: {value ? 'ON' : 'OFF'}</Heading>
                    ) : (
                      <Heading>{key.toUpperCase()} :: {value}</Heading>
                    )}
                  </Box>
                ))}
              </Box>
            </ContentBox>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCards;
