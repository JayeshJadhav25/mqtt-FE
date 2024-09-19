import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Button,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useEffect } from 'react';
import { SimpleCard } from 'app/components';
import axios from 'axios';
import Download from './Download';

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
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilter = async () => {
    try {
      let data = {};

      if (deviceId) {
        data.device_id = deviceId;
      }

      if (deviceName) {
        data.device_name = deviceName;
      }

      if (logType) {
        data.state = logType;
      }

      if (startDate) {
        data.startDate = startDate;
      }

      if (endDate) {
        data.endDate = endDate;
      }

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/getStateLogger`, data);
      setData(response.data.status);
      console.log('Filter results:', response.data);
    } catch (error) {
      console.error('Error filtering data:', error);
    }
  }

  const handleClear = () => {
    setDeviceId('');
    setDeviceName('');
    setLogType('');
    setMacId('');
    setStartDate('');
    setEndDate('');
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/getStateLogger`);
      setData(response.data.status);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  return (
    <Container>
      <Box className="breadcrumb">
        <Download />
      </Box>

      <SimpleCard title="State Report">
        <Box width="100%" overflow="auto">
          {/* Expansion Panel for Filters */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Filters</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box display="flex" flexDirection="column" mb={2}>
                <Box display="flex" mb={2} alignItems="center">
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
                    label="Device State"
                    value={logType}
                    onChange={(e) => setLogType(e.target.value)}
                    variant="outlined"
                    size="small"
                    sx={{ width: '20%' }}
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
                <TableCell align="center">DeviceState</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((dataList, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{formatDateTime(dataList.timestamp)}</TableCell>
                    <TableCell align="center">{dataList.device_id}</TableCell>
                    <TableCell align="center">{dataList.device_name}</TableCell>
                    <TableCell align="center">{dataList.state}</TableCell>
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
  )
}

export default Main;
