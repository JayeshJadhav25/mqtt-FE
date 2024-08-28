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
  Switch
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EditForm from './EditForm';
import Tooltip from '@mui/material/Tooltip';
import uuid from 'react-uuid';

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

const PaginationTable = ({ data, fetchData }) => {
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

  useEffect(() => {
      // Initialize toggle states based on backend data
      const initialToggleStates = {};
      data.forEach(item => {
          initialToggleStates[item.id] = item.mqttStatusDetails && item.mqttStatusDetails.mqttRelayState ? item.mqttStatusDetails.mqttRelayState : false ; // Assuming `item.toggle` is the boolean value from backend
      });
      setToggleStates(initialToggleStates);
  }, [data]);

  const handleToggleChange = (id) => async (event) => {
      setToggleStates(prev => ({
          ...prev,
          [id]: event.target.checked,
      }));

      try {
        const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/relayTriggerOnOrOffMQTTDevice`, { id, mqttRelayState: event.target.checked });
        setAlertMessage('Device Relay Status Changed successfully!');
        setAlertSeverity('success');
    } catch (error) {
        setAlertMessage(error.response.data.msg || 'Something Went Wrong');
        setAlertSeverity('error');
    } finally {
        setAlertOpen(true); // Show the alert after API response
    }


  };

  const getDevices = async () => {
      // Fetch only supervisor user
      axios
          .post(`${process.env.REACT_APP_API_URL}/api/getUserAsRole`, {
              "accesslevel": 3
          })
          .then((res) => {
              console.log('response=>', res.data.status);
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
      console.log(`Assigning ${selectedUser} to ${selectedDeviceId}`);
      try {
          let obj = {
              id: uuid(),
              deviceId: selectedDeviceId || "",
              userId: selectedUser || "",
          };
          const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/assignMQTTDevice`, obj);
          setAlertMessage('Device Assigned successfully!');
          setAlertSeverity('success');
      } catch (error) {
          setAlertMessage(error.response.data.msg || 'Something Went Wrong');
          setAlertSeverity('error');
      } finally {
          setAlertOpen(true); // Show the alert after API response
      }
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
      } finally {
          setAlertOpen(true); // Show the alert after API response
      }
  };

  const handleRelayOff = async (id) => {
      try {
          const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/relayTriggerOffMQTTDevice`, { id });
          setAlertMessage('Device Relay Off successfully!');
          setAlertSeverity('success');
      } catch (error) {
          setAlertMessage(error.response.data.msg || 'Something Went Wrong');
          setAlertSeverity('error');
      } finally {
          setAlertOpen(true); // Show the alert after API response
      }
  };

  const handleRelayOn = async (id) => {
      try {
          const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/relayTriggerOnMQTTDevice`, { id });
          setAlertMessage('Device Relay On successfully!');
          setAlertSeverity('success');
      } catch (error) {
          setAlertMessage(error.response.data.msg || 'Something Went Wrong');
          setAlertSeverity('error');
      } finally {
          setAlertOpen(true); // Show the alert after API response
      }
  };

  return (
      <Box width="100%" overflow="auto">
          <StyledTable>
              <TableHead>
                  <TableRow>
                      <TableCell align="center">Device Name</TableCell>
                      <TableCell align="center">MQTT IP</TableCell>
                      <TableCell align="center">Username</TableCell>
                      <TableCell align="center">Topic</TableCell>
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
                              <TableCell align="center">{dataList.deviceName}</TableCell>
                              <TableCell align="center">{dataList.mqttIP}</TableCell>
                              <TableCell align="center">{dataList.mqttUserName}</TableCell>
                              <TableCell align="center">{dataList.mqttTopic}</TableCell>
                              <TableCell align="center">{dataList.mqttMacId}</TableCell>
                              <TableCell align="center">{dataList.status}</TableCell>
                              <TableCell align="center">{dataList.mqttPort}</TableCell>
                              {(accessLevel == 1 || accessLevel == 2) &&
                                  <TableCell align="left">
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

                                      <IconButton color="primary" >
                                          <EditForm fetchData={fetchData} dataList={dataList} />
                                      </IconButton>
                                  </TableCell>
                              }
                              {accessLevel == 1 &&
                                  <TableCell align="right">
                                      <Switch
                                          checked={toggleStates[dataList.id] || false}
                                          onChange={handleToggleChange(dataList.id)}
                                          inputProps={{ 'aria-label': 'controlled' }}
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

          <Dialog open={openDialog} onClose={handleCloseDialog}>
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
                              <MenuItem key={index} value={user.id}>{user.username}</MenuItem>
                          ))}
                      </Select>
                  </FormControl>
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleCloseDialog}>Cancel</Button>
                  <Button onClick={handleAssignSubmit}>Submit</Button>
              </DialogActions>
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
      </Box>
  );
};

export default PaginationTable;
