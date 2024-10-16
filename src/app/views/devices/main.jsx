import CreateForm from './CreateForm';

import PaginationTable from './PaginationTable';
import { useState, useEffect } from "react";
import axios from 'axios';
import {
  Box,
  styled,
} from '@mui/material';

import { Breadcrumb, SimpleCard } from 'app/components';
import axiosInstance from '../../../axiosInterceptor';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const accessLevel = window.localStorage.getItem('accessLevel');


const Main = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.post(`/getMQTTDevice`);
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
      {(accessLevel == 1 || accessLevel == 2) && (

        <Box className="breadcrumb">
          <CreateForm fetchData={fetchData} />
        </Box>
      )}
      <SimpleCard title="Devices">
        <PaginationTable data={data} fetchData={fetchData} setData={setData} />
      </SimpleCard>

    </Container>
  )

}

export default Main;
