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
    Dialog, DialogActions, DialogContent, DialogTitle, Button, DialogContentText,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Divider
} from "@mui/material";
import { useState } from "react";
import EditForm from './EditForm';
import axiosInstance from '../../../axiosInterceptor';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

const PaginationTable = ({ maintenanceData, fetchData, setData }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        setSnackbarMessage('');
    };

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

    return (
        <Box width="100%" overflow="auto">

            <Divider sx={{ marginBottom: 2 }} />

            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Location</TableCell>
                        <TableCell align="center">Modified Time</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {maintenanceData
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((request, index) => (
                            <TableRow key={request.id}>
                                <TableCell align="center">{request.locationName}</TableCell>
                                <TableCell align="center">{request.modified_time}</TableCell>
                                <TableCell align="center">
                                    <Tooltip title="Edit">
                                        <IconButton
                                            onClick={() => handleEditClick(request)}
                                            color="primary"
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
                    <Button onClick={handleCloseDialog} color="primary">Close</Button>
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
        </Box>
    );
};

export default PaginationTable;
