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
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useEffect } from 'react';
import { Breadcrumb, SimpleCard } from 'app/components';
import Download from './Download';
import axios from 'axios';
import axiosInstance from '../../../axiosInterceptor';

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
  const [logType, setLogType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setSnackbarMessage('');
  };
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getData = async () => {
    axiosInstance
      .post(`/getDeviceLogger`)
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
      if (new Date(endDate) <= new Date(startDate)) {
        setSnackbarMessage('End Date should be greater than Start Date.');
        setOpenSnackbar(true);
        return;
      }

      let data = {};

      if (deviceId) {
        data.device_id = deviceId;
      }

      if (deviceName) {
        data.device_name = deviceName;
      }

      if (logType) {
        data.log_type = logType;
      }

      if (startDate) {
        data.startDate = startDate;
      }

      if (endDate) {
        data.endDate = endDate;
      }

      const response = await axiosInstance.post(`/getDeviceLogger`, data);
      setData(response.data.status);
      console.log('Filter results:', response.data);
    } catch (error) {
      console.error('Error filtering data:', error);
    }
  };

  const handleClear = () => {
    setDeviceId('');
    setDeviceName('');
    setLogType('');
    setStartDate('');
    setEndDate('');
    getData();
  };

  const formatDateTime = (dateString) => {
    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = String(dateObj.getFullYear()).slice(2);
    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    const seconds = String(dateObj.getSeconds()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Box className="breadcrumb" display="flex" justifyContent="flex-end">
        <Download deviceId={deviceId}
          deviceName={deviceName}
          logType={logType}
          startDate={startDate}
          endDate={endDate} />
      </Box>
      <SimpleCard title="Logger Report">

        {/* Accordion for filter section */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box fontWeight="bold">Filters</Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box display="flex" justifyContent="space-between" mb={2} mt={1} alignItems="center">
              <TextField
                label="Start Date"
                variant="outlined"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                size="small"
                InputLabelProps={{ shrink: true }}
                sx={{ width: '20%', marginRight: 2 }}
              />
              <TextField
                label="End Date"
                variant="outlined"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                size="small"
                InputLabelProps={{ shrink: true }}
                sx={{ width: '20%', marginRight: 2 }}
              />
              <TextField
                label="Device ID"
                value={deviceId}
                onChange={(e) => setDeviceId(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ width: '20%', marginRight: 2 }}
              />
              <TextField
                label="Device Name"
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ width: '20%', marginRight: 2 }}
              />
              <TextField
                label="Log Type"
                value={logType}
                onChange={(e) => setLogType(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ width: '20%', marginRight: 2 }}
              />
            </Box>
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleFilter}
                sx={{ mr: 2 }}
              >
                Filter
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClear}
              >
                Clear
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Divider sx={{ marginBottom: 2 }} />
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="center">Date / Time</TableCell>
              <TableCell align="center">DeviceId</TableCell>
              <TableCell align="center">DeviceName</TableCell>
              <TableCell align="center">LogType</TableCell>
              <TableCell align="center">LogDesc</TableCell>
              <TableCell align="center">BatteryLevel</TableCell>
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
                  <TableCell align="center">{dataList.battery_level}</TableCell>
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
      </SimpleCard>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>

    </Container>
  );
};

export default Main;
