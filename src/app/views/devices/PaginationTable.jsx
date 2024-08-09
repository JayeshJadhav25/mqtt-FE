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
    Snackbar,
    Alert,Dialog, DialogActions, DialogContent, DialogTitle,Button, FormControl, InputLabel, MenuItem, Select, Paper
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EditIcon from '@mui/icons-material/Edit';
import EditForm from './EditForm';

import uuid from 'react-uuid';

  const StyledTable = styled(Table)(() => ({
    whiteSpace: "pre",
    "& thead": {
      "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
      "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
  }));
  
//   const users = [
//     { id: 1, name: 'Alice' },
//     { id: 2, name: 'Bob' },
//     { id: 3, name: 'Charlie' },
//   ];

  const PaginationTable = ({ data, fetchData}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [users,setUsers] = useState([])
    // const [data, setData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedDeviceId, setselectedDeviceId] = useState(null);

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success'); 

    const getDevices = async () => {
        axios
          .post(`${process.env.REACT_APP_API_URL}/api/getUser`)
          .then((res) => {
            console.log('response=>', res.data.status);
            setUsers(res.data.status)
          })
          .catch((error) => {
            console.log(error);
          });
    };
    const handleChangePage = (_, newPage) => {
      setPage(newPage);
    };

    const handleOpenDialog = (deviceId) => {
        getDevices()
        setselectedDeviceId(deviceId);
        setOpenDialog(true);
    };
    
    const handleCloseDialog = () => {
      setOpenDialog(false);
      setSelectedUser('');
      setselectedDeviceId(null);
    };

    const handleAssignSubmit = async () => {
      console.log(`Assigning ${selectedUser} to ${selectedDeviceId}`);
      try 
        {
            let obj = {
                id:uuid(),
                deviceId: selectedDeviceId || "",
                userId: selectedUser ||  "",
            };
            const result = await axios.post(`http://127.0.0.1:4330/api/assignMQTTDevice`, obj);  
            setAlertMessage('Device Assigned successfully!');
            setAlertSeverity('success');
        } catch(error) {
            setAlertMessage(error.response.data.msg || 'Something Went Wrong');
            setAlertSeverity('error');
        }finally {
            setAlertOpen(true); // Show the alert after API response
        }
      // Handle assignment logic here, e.g., making an API call
      handleCloseDialog();
    };

    const handleUserChange = (event) => {
      setSelectedUser(event.target.value);
    };
    
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const handleAlertClose = () => {
        setAlertOpen(false); // Close the alert
    };
    
    const handleDelete = async (id) => {
        try {
            const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/deleteMQTTDevice`, { id });
            setAlertMessage('Device Deleted successfully!');
            setAlertSeverity('success');
            fetchData();
          } catch (error) {
            console.log('error', error.response);
            setAlertMessage(error.response.data.msg || 'Something Went Wrong');
            setAlertSeverity('error');
          }finally {
            setAlertOpen(true); // Show the alert after API response
        }
    }
    // useEffect(() => {
    //     fetchData();
    //   }, []);
  
    return (
      <Box width="100%" overflow="auto">
        <StyledTable>
          <TableHead>
            <TableRow>
                <TableCell align="center">Device Name</TableCell>
                <TableCell align="center">MQTT IP</TableCell>
                <TableCell align="center">Username</TableCell>
                {/* <TableCell align="center">Password</TableCell> */}
                <TableCell align="center">Topic</TableCell>
                <TableCell align="center">URL</TableCell>
                <TableCell align="center">MACID</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">PORT</TableCell>
                <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((dataList, index) => (
                <TableRow key={index}>
                    <TableCell align="center">{dataList.deviceName}</TableCell>
                    <TableCell align="center">{dataList.mqttIP}</TableCell>
                    <TableCell align="center">{dataList.mqttUserName}</TableCell>
                    <TableCell align="center">{dataList.mqttTopic}</TableCell>
                    <TableCell align="center">{dataList.mqttUrl}</TableCell>
                    <TableCell align="center">{dataList.mqttMacId}</TableCell>
                    <TableCell align="center">{dataList.status}</TableCell>
                    <TableCell align="center">{dataList.mqttPort}</TableCell>
                    <TableCell align="right">
                        <IconButton onClick={() => handleDelete(dataList.id)} color="error">
                            <DeleteIcon />
                        </IconButton>
                        
                        <IconButton onClick={() => handleOpenDialog(dataList.id)} color="primary">
                            <AssignmentIcon />
                        </IconButton>

                        <IconButton color="primary" >
                             <EditForm fetchData={fetchData} dataList={dataList} />
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
          count={data.length}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{ "aria-label": "Next Page" }}
          backIconButtonProps={{ "aria-label": "Previous Page" }}
        />
            <Snackbar
                open={alertOpen}
                autoHideDuration={6000} // Adjust the duration as needed
                onClose={handleAlertClose}
            >
                <Alert onClose={handleAlertClose} severity={alertSeverity}>
                    {alertMessage}
                </Alert>
            </Snackbar>

        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth={true} maxWidth="xs">
            <DialogTitle>Assign User</DialogTitle>
            <DialogContent>
                <FormControl fullWidth>
                    <InputLabel id="user-select-label">Select User</InputLabel>
                    <Select
                    labelId="user-select-label"
                    value={selectedUser}
                    onChange={handleUserChange}
                    label="Select User"
                    >
                    {users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                        {user.userName}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </DialogContent>

        <DialogActions>

          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>

          <Button onClick={handleAssignSubmit} color="primary" disabled={!selectedUser}>
            Submit
          </Button>
          
        </DialogActions>
      </Dialog>
      </Box>

      
    );
  };
  
  export default PaginationTable;
  