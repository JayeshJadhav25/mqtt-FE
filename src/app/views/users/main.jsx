import CreateForm from './CreateForm';
import { useState, useEffect } from "react";
import {
  Box,
  styled,
} from '@mui/material';

import { SimpleCard } from 'app/components';
import PaginationTable from './PaginationTable';
import axiosInstance from '../../../axiosInterceptor';

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
      const response = await axiosInstance.post(`/getUser`);
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
        <CreateForm fetchData={fetchData} />
      </Box>
      <SimpleCard title="Users">
        <PaginationTable data={data} fetchData={fetchData} setData={setData} />

      </SimpleCard>
    </Container>
  )
}

export default Main;
