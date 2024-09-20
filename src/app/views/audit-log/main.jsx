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
} from '@mui/material';

import { useState, useEffect } from 'react';
import { SimpleCard } from 'app/components';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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

  // Filter states
  const [username, setUsername] = useState('');
  const [moduleName, setModuleName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [operation, setOperation] = useState('');
  const [status, setStatus] = useState('');

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchData = async (filters = {}) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/getAuditLog`, filters);
      setData(response.data.status);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter button click handler
  const handleFilter = () => {
    let data = {};

    if (username) data.userName = username;
    if (moduleName) data.moduleName = moduleName;
    if (startDate) data.startDate = startDate;
    if (endDate) data.endDate = endDate;
    if (operation) data.operation = operation;
    if (status) data.status = status;

    fetchData(data);
  };

  // Clear button click handler
  const handleClear = () => {
    setUsername('');
    setModuleName('');
    setStartDate('');
    setEndDate('');
    setOperation('');
    setStatus('');
    fetchData(); // Re-fetch without filters
  };

  return (
    <Container>

      <Box className="breadcrumb" display="flex" justifyContent="flex-end">
        <Download />
      </Box>

      <SimpleCard title="Audit Log">
        {/* Accordion for Filter Section */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="filter-panel-content"
            id="filter-panel-header"
          >
            <Box fontWeight="bold">Filters</Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <TextField
                label="Start Date"
                variant="outlined"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                size="small"
                InputLabelProps={{ shrink: true }}
                sx={{ width: '15%' }}
              />
              <TextField
                label="End Date"
                variant="outlined"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                size="small"
                InputLabelProps={{ shrink: true }}
                sx={{ width: '15%' }}
              />
              <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                size="small"
                sx={{ width: '15%' }}
              />
              <TextField
                label="Module Name"
                variant="outlined"
                value={moduleName}
                onChange={(e) => setModuleName(e.target.value)}
                size="small"
                sx={{ width: '15%' }}
              />
              <TextField
                label="Operation"
                variant="outlined"
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
                size="small"
                sx={{ width: '15%' }}
              />
              <TextField
                label="Status"
                variant="outlined"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                size="small"
                sx={{ width: '15%' }}
              />
            </Box>

            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleFilter}
                sx={{ mr: 2 }}
              >
                Filter
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleClear}>
                Clear
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Divider sx={{ mb: 2 }} />

        {/* Table */}
        <Box width="100%" overflow="auto">
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="center">Date / Time</TableCell>
                <TableCell align="center">Username</TableCell>
                <TableCell align="center">Role</TableCell>
                <TableCell align="center">ModuleName</TableCell>
                <TableCell align="center">Operation</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Message</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((dataList, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{dataList.modified_time}</TableCell>
                    <TableCell align="center">{dataList.modified_user_name}</TableCell>
                    <TableCell align="center">{dataList.role}</TableCell>
                    <TableCell align="center">{dataList.moduleName}</TableCell>
                    <TableCell align="center">{dataList.operation}</TableCell>
                    <TableCell align="center">{dataList.status}</TableCell>
                    <TableCell align="center">{dataList.message}</TableCell>
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
