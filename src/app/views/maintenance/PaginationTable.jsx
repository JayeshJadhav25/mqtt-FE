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
  Dialog, DialogActions, DialogContent, DialogTitle, Button
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from 'axios';
import EditForm from './EditForm';
const accessLevel = window.localStorage.getItem('accessLevel');

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: 'none' } },
  },
}));

const PaginationTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success'); // 'success' | 'error'

  const handleAlertClose = () => {
      setAlertOpen(false); // Close the alert
    };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleApproveReject = async (id, isApproved) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/submitMaintainenceRequest`, { id, isApproved });
      console.log("Approval successful:", response.data);
      if(isApproved) {
        setAlertMessage('Request Approved Succesfully');
        setAlertSeverity('success');
      } else {
        setAlertMessage('Request Rejected Succesfully!');
        setAlertSeverity('success');
      }

    } catch (error) {
      console.error('Error:', error);
      setAlertMessage(error.response.data.msg || 'Something Went Wrong');
      setAlertSeverity('error');
  } finally {
      setAlertOpen(true); // Show the alert after API response
  }
  };
  
  const fetchData = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/getMaintainenceRequest`);
      setMaintenanceData(response.data.status);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (data) => {
    setSelectedData(data);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedData(null);
  };

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="center">Engineer Name</TableCell>
            <TableCell align="center">Engineer Contact</TableCell>
            <TableCell align="center">Start Time</TableCell>
            <TableCell align="center">End Time</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {maintenanceData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((request, index) => (
              <TableRow key={request.id}> {/* Use a unique key */}
                <TableCell align="center">{request.engineerName}</TableCell>
                <TableCell align="center">{request.engineerContact}</TableCell>
                <TableCell align="center">{request.startTime}</TableCell>
                <TableCell align="center">{request.endTime}</TableCell>
                <TableCell align="center">{request.status}</TableCell>
                <TableCell align="center">
                {(accessLevel == 1 || accessLevel == 2) && (
                      <>
                        <Tooltip title='Reject'>
                          <IconButton onClick={() => handleApproveReject(request.id, false)}>
                            <Icon fontSize="small" color="error">close</Icon>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Approve'>
                          <IconButton onClick={() => handleApproveReject(request.id, true)}>
                            <Icon fontSize="small">check</Icon>
                          </IconButton>
                        </Tooltip>
                      </>
                  )}
                  <Tooltip title='Edit'>
                    <IconButton 
                        onClick={() => handleEditClick(request)}
                        disabled={!request.isEditable} // Disable button if not editable
                        color={request.isEditable ? "primary" : "default"}
                    >
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
        count={maintenanceData.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />

        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
          <DialogTitle>Edit Maintenance Request</DialogTitle>
                <DialogContent>
                  {selectedData && <EditForm data={selectedData} fetchData={fetchData} onClose={handleCloseDialog} />}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog} color="primary">
                    Close
                  </Button>
                </DialogActions>
        </Dialog>

        <Snackbar
                open={alertOpen}
                autoHideDuration={6000} // Adjust the duration as needed
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
