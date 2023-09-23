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
import LogForm from './LogForm';
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

const subscribarList = [
  {
    name: 'john doe',
    date: '18 january, 2019',
    amount: 1000,
    status: 'close',
    company: 'ABC Fintech LTD.',
  },
];

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));
const Logs = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [logTypes, setLogTypes] = useState({
    LogTypes: [],
  });

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = async (id) => {
    console.log('handle delete called', id);
    try {
      const result = await axios.post('http://127.0.0.1:4330/api/deleteMQTTLoggerType', { id });
      getLogTypes();
    } catch (error) {
      console.log('error', error);
    }
  };

  const getLogTypes = async () => {
    axios
      .post('http://127.0.0.1:4330/api/getMQTTLoggerType')
      .then((res) => {
        console.log('response=>', res.data.status);
        setLogTypes({ LogTypes: res.data.status });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getLogTypes();
  }, []);

  return (
    <Container>
      <Box className="breadcrumb">
        <LogForm />
        {/* <Breadcrumb routeSegments={[{ name: "Material", path: "/material" }, { name: "Table" }]} /> */}
      </Box>
      <SimpleCard title="Log Types">
        <Box width="100%" overflow="auto">
          <StyledTable>
            <TableHead>
              <TableRow>
                {/* <TableCell align="left">Name</TableCell> */}
                <TableCell align="center">Device Id</TableCell>
                <TableCell align="center">Log Type</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logTypes.LogTypes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
                (logdata, index) => (
                  <TableRow key={index}>
                    {/* <TableCell align="left">{subscriber.name}</TableCell> */}
                    <TableCell align="center">{logdata.deviceId}</TableCell>
                    <TableCell align="center">{logdata.logType}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleDelete(logdata.id)}>
                        <Icon fontSize="small" color="error">
                          close
                        </Icon>
                      </IconButton>
                      <IconButton>
                        {/* <Icon fontSize="small">edit</Icon> */}
                        <EditForm logdata={logdata} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </StyledTable>

          <TablePagination
            sx={{ px: 2 }}
            page={page}
            component="div"
            rowsPerPage={rowsPerPage}
            count={subscribarList.length}
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

export default Logs;
