import { Box, styled, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import { SimpleCard } from 'app/components';
import axios from 'axios';
import Download from './Download';
import FilterSection from './FilterSection';

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
  const [filters, setFilters] = useState({
    deviceId: '',
    action: '',
    startDate: '',
    endDate: '',
  });

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchData = async (filterParams = {}) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/getDeviceLogger`, {
        log_type: 'Door',
        ...filterParams,
      });
      setData(response.data.status);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFilter = (filters) => {
    setFilters(filters);
    fetchData(filters);
  };

  const handleClear = () => {
    setFilters({
      deviceId: '',
      action: '',
      startDate: '',
      endDate: '',
    });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Box className="breadcrumb" display="flex" justifyContent="flex-end">
        <Download />
      </Box>

      <SimpleCard title="Door Report">
        <FilterSection onFilter={handleFilter} onClear={handleClear} />
        <Divider sx={{ mb: 2 }} />

        <Box width="100%" overflow="auto">
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="center">Date / Time</TableCell>
                <TableCell align="center">DeviceId</TableCell>
                <TableCell align="center">DeviceName</TableCell>
                <TableCell align="center">Action</TableCell>
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
                    <TableCell align="center">{dataList.log_desc}</TableCell>
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
          />
        </Box>
      </SimpleCard>
    </Container>
  );
};

export default Main;
