import {
  Box,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';

import { useState, useEffect } from 'react';
import { Breadcrumb, SimpleCard } from 'app/components';
import CreateForm from './CreateForm';
import EditForm from './EditForm';
import axios from 'axios';
const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
  },
}));

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const Main = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState({
    list: [],
  });

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = async (id) => {
    try {
      const result = await axios.post('http://127.0.0.1:4330/api/deleteMQTTDevice', { id });
      getData();
    } catch (error) {
      console.log('error', error);
    }
  };

  const getData = async () => {
    axios
      .post('http://127.0.0.1:4330/api/getMQTTDevice')
      .then((res) => {
        console.log('response=>', res.data.status);
        setData({ list: res.data.status });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Box className="breadcrumb">
        {/* <CreateForm getData={getData} /> */}
        {/* <Breadcrumb routeSegments={[{ name: "Material", path: "/material" }, { name: "Table" }]} /> */}
      </Box>
      <SimpleCard title="Devices">
        <Box width="100%" overflow="auto">
          <StyledTable>
            <TableHead>
              <TableRow>
                {/* <TableCell align="left">Name</TableCell> */}
                {/* <TableCell align="center">Device Id</TableCell> */}
                <TableCell align="center">Device Name</TableCell>
                <TableCell align="center">MQTT IP</TableCell>
                <TableCell align="center">Username</TableCell>
                {/* <TableCell align="center">Password</TableCell> */}
                <TableCell align="center">Topic</TableCell>
                <TableCell align="center">URL</TableCell>
                <TableCell align="center">MACID</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">PORT</TableCell>
                {/* <TableCell align="center">Action</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.list
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((dataList, index) => (
                  <TableRow key={index}>
                    {/* <TableCell align="left">{subscriber.name}</TableCell> */}
                    {/* <TableCell align="center">{dataList.deviceId}</TableCell> */}
                    <TableCell align="center">{dataList.deviceName}</TableCell>
                    <TableCell align="center">{dataList.mqttIP}</TableCell>
                    <TableCell align="center">{dataList.mqttUserName}</TableCell>
                    {/* <TableCell align="center">{dataList.mqttPassword}</TableCell> */}
                    <TableCell align="center">{dataList.mqttTopic}</TableCell>
                    <TableCell align="center">{dataList.mqttUrl}</TableCell>
                    <TableCell align="center">{dataList.mqttMacId}</TableCell>
                    <TableCell align="center">{dataList.status}</TableCell>
                    <TableCell align="center">{dataList.mqttPort}</TableCell>
                    {/* <TableCell align="center"> */}
                      {/* <IconButton onClick={() => handleDelete(dataList.id)}> */}
                        {/* <Icon fontSize="small" color="error"> */}
                          {/* close */}
                        {/* </Icon> */}
                      {/* </IconButton> */}
                      {/* <IconButton> */}
                        {/* <Icon fontSize="small">edit</Icon> */}
                        {/* <EditForm dataList={dataList} getData={getData} /> */}
                      {/* </IconButton> */}
                    {/* </TableCell> */}
                  </TableRow>
                ))}
            </TableBody>
          </StyledTable>

          <TablePagination
            sx={{ px: 2 }}
            page={page}
            component="div"
            rowsPerPage={rowsPerPage}
            count={data.list.length}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
            nextIconButtonProps={{ 'aria-label': 'Next Page' }}
            backIconButtonProps={{ 'aria-label': 'Previous Page' }}
          />
        </Box>
      </SimpleCard>
    </Container>
  );
};

export default Main;
