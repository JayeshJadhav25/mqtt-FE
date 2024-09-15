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
  TextField,
  Divider,
  Button
} from '@mui/material';

import { useState, useEffect } from 'react';
import { Breadcrumb, SimpleCard } from 'app/components';
//   import CreateForm from './CreateForm';
//   import EditForm from './EditForm';
//   import ViewDetail from './ViewDetail';
import Download from './Download';
import axios from 'axios';
const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'none' } },
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
  const [data, setData] = useState([]);

  const [deviceId, setDeviceId] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [macId, setMacId] = useState('');
  const [logType, setLogType] = useState('');

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getData = async () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/getDeviceLogger`)
      .then((res) => {
        console.log('response= device>', res.data.status);
        setData(res.data.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleFilter = async () => {
    try {

      let data = {};

      if (deviceId) {
        data.device_id = deviceId
      }

      if (deviceName) {
        data.device_name = deviceName
      }

      if (logType) {
        data.log_type = logType
      }

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/getDeviceLogger`, data);
      setData(response.data.status);
      // Handle the API response here
      console.log('Filter results:', response.data);
    } catch (error) {
      // Handle error here
      console.error('Error filtering data:', error);
    }
  }

  const handleClear = () => {
    setDeviceId(''); // Clear the value of the TextField
    setDeviceName('');
    setLogType('');
    setMacId('');
    getData();
  };

  const formatDateTime = (dateString) => {
    const dateObj = new Date(dateString);

    const day = String(dateObj.getDate()).padStart(2, "0"); // Get day and add leading 0 if necessary
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Get month (0-based, so +1) and add leading 0
    const year = String(dateObj.getFullYear()).slice(2); // Get last two digits of the year

    const hours = String(dateObj.getHours()).padStart(2, "0"); // Get hours and add leading 0
    const minutes = String(dateObj.getMinutes()).padStart(2, "0"); // Get minutes and add leading 0
    const seconds = String(dateObj.getSeconds()).padStart(2, "0"); // Get seconds and add leading 0

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Box className="breadcrumb">
        <Download />
        {/* <Breadcrumb routeSegments={[{ name: "Material", path: "/material" }, { name: "Table" }]} /> */}
      </Box>
      <Box className="breadcrumb">
        {/* <CreateForm getData={getData} /> */}
        {/* <Breadcrumb routeSegments={[{ name: "Material", path: "/material" }, { name: "Table" }]} /> */}
      </Box>
      <SimpleCard title="Logger Report">
        <Box width="100%" overflow="auto">

          <Box display="flex" justifyContent="space-between" mb={2} mt={1} alignItems="center">
            <TextField
              label="Device ID"
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
              variant="outlined"
              size="small" // Smaller input size
              sx={{ marginRight: 2 }} // Add space between inputs
            />
            <TextField
              label="Device Name"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              variant="outlined"
              size="small" // Smaller input size
              sx={{ marginRight: 2 }} // Add space between inputs
            />

            {/* <TextField
              label="Mac Id"
              value={macId}
              onChange={(e) => setMacId(e.target.value)}
              variant="outlined"
              size="small" // Smaller input size
              sx={{ marginRight: 2 }} // Add space between inputs
            /> */}

            <TextField
              label="Log Type"
              value={logType}
              onChange={(e) => setLogType(e.target.value)}
              variant="outlined"
              size="small" // Smaller input size
              sx={{ marginRight: 2 }} // Add space between inputs
            />

            <Box display="flex" gap={1}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClear} // Clear the TextField value
              >
                Clear
              </Button>

              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleFilter}
              >
                Filter
              </Button>
            </Box>
          </Box>

          <Divider sx={{ marginBottom: 2 }} />
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="center">Date / Time</TableCell>
                <TableCell align="center">DeviceId</TableCell>
                <TableCell align="center">DeviceName</TableCell>
                <TableCell align="center">LogType</TableCell>
                <TableCell align="center">LogDesc</TableCell>
                {/* <TableCell align="center">Log Line Count</TableCell> */}
                <TableCell align="center">BatteryLevel</TableCell>
                {/* <TableCell align="center">Mac Id</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((dataList, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{dataList.timestamp}</TableCell>
                    <TableCell align="center">{dataList.device_id}</TableCell>
                    <TableCell align="center">{dataList.device_name}</TableCell>
                    <TableCell align="center">{dataList.log_type}</TableCell>
                    <TableCell align="center">{dataList.log_desc}</TableCell>
                    {/* <TableCell align="center">{dataList.log_line_count}</TableCell> */}
                    <TableCell align="center">{dataList.battery_level}</TableCell>
                    {/* <TableCell align="center">{dataList.mac_id}</TableCell> */}
                  </TableRow>
                ))}
            </TableBody>
          </StyledTable>

          <TablePagination
            sx={{ px: 2 }}
            page={page}
            component="div"
            rowsPerPage={rowsPerPage}
            count={data.length}
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
