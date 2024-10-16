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
  Dialog, DialogActions, DialogContent, DialogTitle, Button, DialogContentText
} from "@mui/material";
import { useState } from "react";
import EditForm from './EditForm';
import axiosInstance from '../../../axiosInterceptor';

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

const PaginationTable = ({ maintenanceData, fetchData }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  // New state for the confirm dialog
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [confirmAction, setConfirmAction] = useState(null); // Stores the action for approval or rejection

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

  const handleApproveReject = async (id, isApproved) => {
    try {
      const response = await axiosInstance.post(`/submitMaintainenceRequest`, { id, isApproved });
      console.log("Approval successful:", response.data);
      if (isApproved) {
        setAlertMessage('Request Approved Successfully');
        setAlertSeverity('success');
      } else {
        setAlertMessage('Request Rejected Successfully!');
        setAlertSeverity('success');
      }
      fetchData();
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage(error.response?.data?.msg || 'Something Went Wrong');
      setAlertSeverity('error');
    } finally {
      setAlertOpen(true); // Show the alert after API response
    }
  };

  const handleEditClick = (data) => {
    setSelectedData(data);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedData(null);
  };

  // Function to open confirm dialog
  const openConfirmDialog = (id, isApproved) => {
    const actionText = isApproved ? 'approve' : 'reject';
    setConfirmMessage(`Are you sure you want to ${actionText} this request?`);
    setConfirmAction(() => () => handleApproveReject(id, isApproved)); // Set the action
    setConfirmDialogOpen(true); // Open confirmation dialog
  };

  const handleConfirmClose = () => {
    setConfirmDialogOpen(false);
  };

  const handleConfirm = () => {
    if (confirmAction) confirmAction(); // Execute the stored action (approve/reject)
    setConfirmDialogOpen(false); // Close confirmation dialog
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
            <TableCell align="center">Devices</TableCell>
            {(accessLevel == 1 || accessLevel == 2) && (
              <TableCell align="center">Action</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {maintenanceData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((request, index) => (
              <TableRow key={request.id}>
                <TableCell align="center">{request.engineerName}</TableCell>
                <TableCell align="center">{request.engineerContact}</TableCell>
                <TableCell align="center">{request.startTime}</TableCell>
                <TableCell align="center">{request.endTime}</TableCell>
                <TableCell align="center">{request.status}</TableCell>
                <TableCell align="center">{request.devices}</TableCell>
                {(accessLevel == 1 || accessLevel == 2) && (
                  <TableCell align="center">
                    <>
                      <Tooltip title="Reject">
                        <IconButton
                          onClick={() => openConfirmDialog(request.id, false)}
                          disabled={!request.isEditable}
                          color={request.isEditable ? "error" : "default"}

                        >
                          <Icon fontSize="small">close</Icon>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Approve">
                        <IconButton
                          onClick={() => openConfirmDialog(request.id, true)}
                          disabled={!request.isEditable}
                          color={request.isEditable ? "green" : "default"}
                        >
                          <Icon fontSize="small">check</Icon>
                        </IconButton>
                      </Tooltip>
                    </>
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() => handleEditClick(request)}
                        disabled={!request.isEditable}
                        color={request.isEditable ? "primary" : "default"}
                      >
                        <Icon fontSize="small">edit</Icon>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                )}
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
          <Button onClick={handleCloseDialog} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={handleConfirmClose} fullWidth>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>{confirmMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="primary">Cancel</Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>Confirm</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleAlertClose} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PaginationTable;
