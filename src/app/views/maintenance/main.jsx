import CreateForm from './CreateForm';
import SimpleForm from './SimpleForm';
import Download from './Download';
import PaginationTable from './PaginationTable';
import { useState, useEffect } from "react";
import axios from 'axios'
import {
    Box,
    styled,
  } from '@mui/material';

import { Breadcrumb, SimpleCard } from 'app/components';

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
      marginBottom: '30px',
      [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
    },
  }));



const Main = () => {

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/getMaintainenceRequest`);
      setData(response.data.status);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

    return (
        <Container>
        <Box className="breadcrumb">
            {/* <SimpleForm /> */}
            <CreateForm fetchData={fetchData}/>

        {/* <Breadcrumb routeSegments={[{ name: "Material", path: "/material" }, { name: "Table" }]} /> */}
        </Box>
        <Box className="breadcrumb">
                <Download/>
            </Box>

        <SimpleCard title="Maintenance">

          <PaginationTable maintenanceData ={data} fetchData={fetchData}/>
        </SimpleCard>
        </Container>
    )
}

export default Main;
