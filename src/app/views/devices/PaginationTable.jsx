import {
    Box,
    IconButton,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Snackbar,
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    Tooltip,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Divider
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EditForm from './EditForm';
import EditFormV2 from "./EditFormV2";
import uuid from 'react-uuid';
import EditIcon from '@mui/icons-material/Edit';
import { green, red } from '@mui/material/colors';
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

const PaginationTable = ({ data, fetchData, setData }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [users, setUsers] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedDeviceId, setselectedDeviceId] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [toggleStates, setToggleStates] = useState({});
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [currentRelayId, setCurrentRelayId] = useState(null);
    const [currentRelayState, setCurrentRelayState] = useState(false);
    const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);
    const [deleteDeviceId, setDeleteDeviceId] = useState(null);
    const [deviceName, setDeviceName] = useState('');
    const [status, setStatus] = useState('');
    const [deviceId, setDeviceId] = useState('');
    const [deviceMacId, setDeviceMacId] = useState('');


    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editingDevice, setEditingDevice] = useState(null);

    useEffect(() => {
        // Initialize toggle states based on backend data
        const initialToggleStates = {};
        data.forEach(item => {
            initialToggleStates[item.id] = item.mqttStatusDetails && item.mqttStatusDetails.mqttRelayState ? item.mqttStatusDetails.mqttRelayState : false;
        });
        setToggleStates(initialToggleStates);
    }, [data]);

    const handleToggleChange = (id) => async (event) => {
        setCurrentRelayId(id);
        setCurrentRelayState(event.target.checked);
        setConfirmDialogOpen(true);
    };

    const handleEditClick = (device) => {
        setEditingDevice(device); // Set the device to be edited
        setEditDialogOpen(true);  // Open the edit dialog
    };

    const handleEditClose = () => {
        setEditDialogOpen(false); // Close the edit dialog
        setEditingDevice(null);   // Reset the editing device
    };

    const handleConfirmToggle = async () => {
        setConfirmDialogOpen(false);
        setToggleStates(prev => ({
            ...prev,
            [currentRelayId]: currentRelayState,
        }));
        try {
            const result = await axiosInstance.post(`/relayTriggerOnOrOffMQTTDevice`, { deviceId: currentRelayId, mqttRelayState: currentRelayState });
            setAlertMessage('Device Relay Status Changed successfully!');
            setAlertSeverity('success');
            fetchData();
        } catch (error) {
            setAlertMessage(error.response.data.msg || 'Something Went Wrong');
            setAlertSeverity('error');
        } finally {
            setAlertOpen(true);
        }
    };

    const handleCancelToggle = () => {
        setConfirmDialogOpen(false);
    };

    const getDevices = async () => {
        axios
            .post(`${process.env.REACT_APP_API_URL}/api/getUserAsRole`, {
                "accesslevel": 3
            })
            .then((res) => {
                setUsers(res.data.status);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleOpenDialog = (deviceId) => {
        getDevices();
        setselectedDeviceId(deviceId);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedUser('');
        setselectedDeviceId(null);
    };

    const handleAssignSubmit = async () => {
        try {
            let obj = {
                id: uuid(),
                deviceId: selectedDeviceId || "",
                userId: selectedUser || "",
            };
            const result = await axiosInstance.post(`/assignMQTTDevice`, obj);
            setAlertMessage('Device Assigned successfully!');
            setAlertSeverity('success');
        } catch (error) {
            setAlertMessage(error.response.data.msg || 'Something Went Wrong');
            setAlertSeverity('error');
        } finally {
            setAlertOpen(true);
        }
        handleCloseDialog();
    };

    const handleUserChange = (event) => {
        console.log('event.target.value', event.target.value)
        setSelectedUser(event.target.value);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const handleDelete = (id) => {
        setDeleteDeviceId(id);
        setDeleteConfirmDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        setDeleteConfirmDialogOpen(false);
        try {
            const result = await axiosInstance.post(`/deleteMQTTDevice`, { id: deleteDeviceId });
            setAlertMessage('Device Deleted successfully!');
            setAlertSeverity('success');
            fetchData();
        } catch (error) {
            setAlertMessage(error.response.data.msg || 'Something Went Wrong');
            setAlertSeverity('error');
        } finally {
            setAlertOpen(true);
        }
    };

    const handleCancelDelete = () => {
        setDeleteConfirmDialogOpen(false);
    };


    const handleEditSubmit = async (updatedDeviceData) => {
        try {
            const result = await axiosInstance.post(`/updateMQTTDevice`, updatedDeviceData);
            setAlertMessage('Device updated successfully!');
            setAlertSeverity('success');
            fetchData(); // Fetch updated data after the edit
        } catch (error) {
            setAlertMessage(error.response.data.msg || 'Something went wrong');
            setAlertSeverity('error');
        } finally {
            setAlertOpen(true);
        }
        handleEditClose();
    };

    const handleFilter = async () => {
        try {

            let filterData = {};

            if (deviceName) filterData.deviceName = deviceName;
            if (deviceId) filterData.deviceId = deviceId;
            if (status) filterData.status = status;
            if (deviceMacId) filterData.mqttMacId = deviceMacId;

            const response = await axiosInstance.post(`/getMQTTDevice`, filterData);
            setData(response.data.status);
        } catch (error) {
            console.error('Error filtering data:', error);
        }
    }

    const handleClear = async () => {
        setDeviceMacId('');
        setDeviceName('');
        setStatus('');
        setDeviceId('');
        fetchData()
    }

    return (
        <Box width="100%" overflow="auto">
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box fontWeight="bold">Filters</Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Box display="flex" justifyContent="space-between" mb={2} mt={1} alignItems="center">
                        <TextField
                            label="DeviceName"
                            value={deviceName}
                            onChange={(e) => setDeviceName(e.target.value)}
                            variant="outlined"
                            size="small"
                            sx={{ width: '25%', marginRight: 2 }}
                        />
                        <TextField
                            label="DeviceId"
                            value={deviceId}
                            onChange={(e) => setDeviceId(e.target.value)}
                            variant="outlined"
                            size="small"
                            sx={{ width: '25%', marginRight: 2 }}
                        />
                        <FormControl variant="outlined" size="small" sx={{ width: '25%', marginRight: 2 }}>
                            <InputLabel>Status</InputLabel>
                            <Select
                                name="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                label="Status"
                            >
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="InActive">InActive</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="MacId"
                            value={deviceMacId}
                            onChange={(e) => setDeviceMacId(e.target.value)}
                            variant="outlined"
                            size="small"
                            sx={{ width: '25%', marginRight: 2 }}
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
                            sx={{ height: '100%' }}
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
                        <TableCell align="center">Relay Status</TableCell>
                        <TableCell align="center">Device Id</TableCell>
                        <TableCell align="center">Device Name</TableCell>
                        <TableCell align="center">MQTT IP</TableCell>
                        <TableCell align="center">Username</TableCell>
                        {/* <TableCell align="center">Topic</TableCell> */}
                        <TableCell align="center">MACID</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">PORT</TableCell>
                        {(accessLevel == 1 || accessLevel == 2) &&
                            <TableCell align="center">Action</TableCell>
                        }
                        {accessLevel == 1 &&
                            <TableCell align="center">Relay ON/OFF</TableCell>
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((dataList, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 18,    // Circle size
                                                height: 18,   // Circle size
                                                borderRadius: '50%',   // Circular shape
                                                backgroundColor: (dataList.mqttStatusDetails && dataList.mqttStatusDetails.mqttRelayState) === true ? red[500] : green[500]
                                            }}
                                        />
                                    </Box>
                                </TableCell>
                                <TableCell align="center">{dataList.deviceId}</TableCell>
                                <TableCell align="center">{dataList.deviceName}</TableCell>
                                <TableCell align="center">{dataList.mqttIP}</TableCell>
                                <TableCell align="center">{dataList.mqttUserName}</TableCell>
                                {/* <TableCell align="center">
                                    {dataList.mqttTopic && Array.isArray(dataList.mqttTopic) ? dataList.mqttTopic.join(", ") : ""}
                                </TableCell> */}
                                <TableCell align="center">{dataList.mqttMacId}</TableCell>
                                <TableCell align="center">{dataList.status}</TableCell>
                                <TableCell align="center">{dataList.mqttPort}</TableCell>
                                {(accessLevel == 1 || accessLevel == 2) &&
                                    <TableCell align="center">
                                        {accessLevel == 1 &&
                                            <Tooltip title='Delete User'>
                                                <IconButton onClick={() => handleDelete(dataList.id)} color="error">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        }
                                        <Tooltip title='Assign User'>
                                            <IconButton onClick={() => handleOpenDialog(dataList.id)} color="primary">
                                                <AssignmentIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title='Edit Device'>
                                            <IconButton onClick={() => handleEditClick(dataList)} color="primary">
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        {/* <IconButton color="primary" >
                                            <EditForm fetchData={fetchData} dataList={dataList} />
                                        </IconButton> */}
                                    </TableCell>
                                }
                                {accessLevel == 1 &&
                                    <TableCell align="center">
                                        <Switch
                                            checked={toggleStates[dataList.id] || false}
                                            onChange={handleToggleChange(dataList.deviceId)}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            sx={{
                                                '& .MuiSwitch-switchBase.Mui-checked': {
                                                    color: 'green', // Color when switch is ON
                                                },
                                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                    backgroundColor: 'green', // Track color when switch is ON
                                                },
                                                '& .MuiSwitch-switchBase': {
                                                    color: 'red', // Color when switch is OFF
                                                },
                                                '& .MuiSwitch-track': {
                                                    backgroundColor: 'red', // Track color when switch is OFF
                                                }
                                            }}
                                        />
                                    </TableCell>
                                }
                            </TableRow>
                        ))}
                </TableBody>
            </StyledTable>

            <TablePagination
                component="div"
                page={page}
                rowsPerPageOptions={[5, 10, 25]}
                rowsPerPage={rowsPerPage}
                count={data.length}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
                <DialogTitle>Assign User</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">User</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedUser}
                            label="User"
                            onChange={handleUserChange}
                        >
                            {users.map((user, index) => (
                                <MenuItem key={user._id} value={user._id}>{user.userName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleAssignSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={confirmDialogOpen}
                onClose={() => setConfirmDialogOpen(false)}
                fullWidth
            >
                <DialogTitle>Confirm Toggle</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to {currentRelayState ? 'turn on' : 'turn off'} the relay?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelToggle}>Cancel</Button>
                    <Button onClick={handleConfirmToggle} color="primary">Confirm</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={deleteConfirmDialogOpen}
                onClose={() => setDeleteConfirmDialogOpen(false)}
                fullWidth
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete this device?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="error">Confirm</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={editDialogOpen} onClose={handleEditClose} fullWidth>
                <DialogTitle>Edit Device</DialogTitle>
                <DialogContent>
                    {editingDevice && (
                        <EditFormV2
                            data={editingDevice} // Pass the device data to the EditForm
                            onClose={handleEditClose}
                            fetchData={fetchData}

                        />
                    )}
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                </DialogActions> */}
            </Dialog>

            <Snackbar
                open={alertOpen}
                autoHideDuration={6000}
                onClose={handleAlertClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Box >
    );
};

export default PaginationTable;
