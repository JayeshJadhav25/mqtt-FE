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
  Tooltip,
  Snackbar, 
  Alert,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Dialog, DialogActions, DialogContent, DialogTitle, Button
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditForm from './EditForm';

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: 'none' } },
  },
}));

const PaginationTable = ({data, fetchData, setData}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success'); // 'success' | 'error'

  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [status, setStatus] = useState('');
  const [accessLevel, setAccessLevel] = useState('');

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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

  const handleEditClick = (data) => {
    setSelectedData(data);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedData(null);
  };

  const handleFilter = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/getUser`, {
        email: email,
        userName: userName,
        status: status,
        accesslevel: accessLevel === "Admin" ? 2 : 3
      });
      setData(response.data.status);
      console.log('Filter results:', response.data);
    } catch (error) {
      console.error('Error filtering data:', error);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteId(null);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      try {
        const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/deleteUser`, { id: deleteId });
        setAlertMessage('User Deleted successfully!');
        setAlertSeverity('success');
        fetchData();
      } catch (error) {
        console.log('error', error.response);
        setAlertMessage(error.response.data.msg || 'Something Went Wrong');
        setAlertSeverity('error');
      } finally {
        setAlertOpen(true);
      }
      handleCloseDeleteDialog();
    }
  };

  const handleClear = () => {
    setUserName('');
    setEmail('');
    setStatus('');
    setAccessLevel('');
    fetchData();
  };

  return (
    <Box width="100%" overflow="auto">
      <Box display="flex" justifyContent="space-between" mb={2} mt={1} alignItems="center">
        <TextField
          label="UserName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          variant="outlined"
          size="small" // Smaller input size
          sx={{ marginRight: 2 }} // Add space between inputs
        />

        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          size="small" // Smaller input size
          sx={{ marginRight: 2 }} // Add space between inputs
        />

        <FormControl variant="outlined" size="small" sx={{ marginRight: 2, flex: 1 }}>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" size="small" sx={{ marginRight: 2, flex: 1 }}>
          <InputLabel>AccessLevel</InputLabel>
          <Select
            name="accessLevel"
            value={accessLevel}
            onChange={(e) => setAccessLevel(e.target.value)}
            label="Access Level"
          >
            <MenuItem value="2">Admin</MenuItem>
            <MenuItem value="3">Supervisor</MenuItem>
          </Select>
        </FormControl>

        <Box display="flex" gap={1}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClear}
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

      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Username</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Access Level</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((request) => (
              <TableRow key={request.id}>
                <TableCell align="center">{request.name}</TableCell>
                <TableCell align="center">{request.userName}</TableCell>
                <TableCell align="center">{request.status}</TableCell>
                <TableCell align="center">
                  {request.accesslevel === 1
                    ? 'SuperAdmin'
                    : request.accesslevel === 2
                    ? 'Admin'
                    : request.accesslevel === 3
                    ? 'Supervisor'
                    : request.accesslevel}
                </TableCell>
                <TableCell align="center">{request.email}</TableCell>
                <TableCell align="center">
                  <Tooltip title='Delete User'>
                    <IconButton onClick={() => handleDelete(request.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title='Edit'>
                    <IconButton onClick={() => handleEditClick(request)}>
                      <Icon fontSize="small">edit</Icon>
                    </IconButton>
                  </Tooltip>
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
        count={data.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {selectedData && <EditForm data={selectedData} fetchData={fetchData} onClose={handleCloseDialog} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="confirm-delete-dialog-title"
        aria-describedby="confirm-delete-dialog-description"
        fullWidth
      >
        <DialogTitle id="confirm-delete-dialog-title">
          {"Confirm Delete"}
        </DialogTitle>
        <DialogContent>
          <Box id="confirm-delete-dialog-description">
            Are you sure you want to delete this user?
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert onClose={handleAlertClose} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PaginationTable;
