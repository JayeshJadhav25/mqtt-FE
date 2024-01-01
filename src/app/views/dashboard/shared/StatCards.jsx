import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import { Small } from 'app/components/Typography';
import { useEffect, useState } from 'react'; 
const axios = require('axios');

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
  const cardList = [
    { name: 'New Leads', amount: 3050, icon: 'group' },
    { name: 'This week Sales', amount: '$80,500', icon: 'attach_money' },
    // { name: 'Inventory Status', amount: '8.5% Stock Surplus', icon: 'store' },
    // { name: 'Orders to deliver', amount: '305 Orders', icon: 'shopping_cart' },
  ];
  const [logCount, setLogCount] = useState(0);

  useEffect(() => {
      let data = JSON.stringify({});

      let config = {
        method: 'post',
        url: 'http://127.0.0.1:4330/api/getDeviceLogCount',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios.request(config)
      .then((response) => {
        setLogCount(response.data.totalSize)
        // console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  },[])

  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      {/* {cardList.map((item, index) => ( */}
        <Grid item xs={12} md={6} >
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">group</Icon>
              <Box ml="12px">
                <Small>Log Count</Small>
                <Heading>{logCount}</Heading>
              </Box>
            </ContentBox>

            <Tooltip title="View Details" placement="top">
              {/* <IconButton>
                <Icon>arrow_right_alt</Icon>
              </IconButton> */}
            </Tooltip>
          </StyledCard>
        </Grid>
      {/* ))} */}
    </Grid>
  );
};

export default StatCards;
