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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Snackbar,
  Alert
} from '@mui/material';

import { useState, useEffect } from 'react';
import { Breadcrumb, SimpleCard } from 'app/components';
import LogForm from './LogForm';
import EditForm from './EditForm';
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

const Logs = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [logTypes, setLogTypes] = useState({ LogTypes: [] });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success'); // 'success' | 'error'

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (logdata) => {
    setSelectedLog(logdata);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (selectedLog) {
      try {
        await axiosInstance.post(`/deleteMQTTLoggerType`, { id: selectedLog.id });
        setAlertMessage('Log Type Deleted successfully!');
        setAlertSeverity('success');
        getLogTypes();
      } catch (error) {
        console.log('error', error);
        setAlertMessage(error.response.data.msg || 'Something Went Wrong');
        setAlertSeverity('error');
      } finally {
        setAlertOpen(true);
      }
      setOpenDeleteDialog(false)
    }

  };

  const getLogTypes = async () => {
    try {
      const res = await axiosInstance.post(`/getMQTTLoggerType`);
      setLogTypes({ LogTypes: res.data.status });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (logdata) => {
    setSelectedLog(logdata);
    setOpenEditDialog(true);
  };

  useEffect(() => {
    getLogTypes();
  }, []);

  return (
    <Container>
      <Box className="breadcrumb">
        <LogForm getLogTypes={getLogTypes} />
      </Box>
      <SimpleCard title="Log Types">
        <Box width="100%" overflow="auto">
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="center">Device Id</TableCell>
                <TableCell align="center">Log Type</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logTypes.LogTypes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((logdata, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{logdata.deviceId}</TableCell>
                  <TableCell align="center">{logdata.logType}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleDelete(logdata)}>
                      <Icon fontSize="small" color="error">close</Icon>
                    </IconButton>
                    <IconButton onClick={() => handleEdit(logdata)}>
                      <Icon fontSize="small" color="primary">edit</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>

          <TablePagination
            sx={{ px: 2 }}
            page={page}
            component="div"
            rowsPerPage={rowsPerPage}
            count={logTypes.LogTypes.length}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
            nextIconButtonProps={{ 'aria-label': 'Next Page' }}
            backIconButtonProps={{ 'aria-label': 'Previous Page' }}
          />
        </Box>
      </SimpleCard>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        fullWidth
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this log entry?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        fullWidth
      >
        <DialogTitle>Edit Log Entry</DialogTitle>
        <DialogContent>
          {selectedLog && (
            <EditForm logdata={selectedLog} getLogTypes={getLogTypes} onClose={() => setOpenEditDialog(false)} />
          )}
        </DialogContent>
      </Dialog>

      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alertSeverity}
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Logs;
