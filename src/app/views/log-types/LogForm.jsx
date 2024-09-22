import {
  Box, Icon, Autocomplete, styled, Snackbar,
  Alert
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import uuid from 'react-uuid';
import { useEffect } from 'react';
import axiosInstance from '../../../axiosInterceptor';

export default function LogForm({ getLogTypes }) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({});
  const [value, setValue] = React.useState(null);
  const [deviceList, setDeviceList] = React.useState({
    devices: []
  });

  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertSeverity, setAlertSeverity] = React.useState('success'); // 'success' | 'error'

  function handleClickOpen() {
    setOpen(true);
  }

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  function handleClose() {
    setOpen(false);
  }

  const AutoComplete = styled(Autocomplete)(() => ({
    width: 540,
    // marginBottom: '16px',
  }));

  async function handleFormSubmit(values) {
    try {
      let obj = {
        id: uuid(),
        deviceId: value && value.label ? value.label : "",
        logType: values.logtype,
      };
      const result = await axiosInstance.post(`/createMQTTLoggerType`, obj);
      setAlertMessage('Log Type Created successfully!');
      setAlertSeverity('success');
      getLogTypes();
    } catch (error) {
      console.log('erorr', error);
      setAlertMessage(error.response.data.msg || 'Something Went Wrong');
      setAlertSeverity('error');
    } finally {
      setAlertOpen(true);
    }
    setOpen(false);
  }
  const initialValues = {
    deviceid: '',
    logtype: '',
  };

  const suggestions = [
    { label: 'Active' },
    { label: 'InActive' },
  ]

  const handleChangeDrop = (_, newValue) => {
    if (newValue && newValue.inputValue) {
      setValue({ label: newValue.inputValue });
      return;
    }
    setValue(newValue);
  };

  const getDevices = async () => {
    try {
      const res = await axiosInstance.post(`/getMQTTDevice`);
      console.log('response=>', res.data.status);

      const devices = res.data.status.map(elem => ({ label: elem.deviceId }));
      setDeviceList({ devices });

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getDevices();
  }, []);


  return (
    <Box>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <Icon>add</Icon> Create
      </Button>
      <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth="fullWidth"
            aria-labelledby="max-width-dialog-title"
          >
            <form onSubmit={handleSubmit}>
              <DialogTitle id="form-dialog-title">Create</DialogTitle>
              <DialogContent>
                {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}

                {/* <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Device Id"
                  type="text"
                  name="deviceid"
                  value={values.deviceid}
                  onChange={handleChange}
                  fullWidth
                /> */}
                <AutoComplete
                  value={value}
                  options={deviceList.devices}
                  // defaultValue={{label:value}}
                  onChange={handleChangeDrop}
                  getOptionLabel={(option) => {
                    console.log('option', option)
                    return option.label;
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin="dense"
                      label="Device Id"
                      variant="outlined"
                      // name="status"
                      // value={values.status}
                      fullWidth />
                  )}
                />
                <TextField
                  margin="dense"
                  id="name"
                  label="Log Type"
                  type="text"
                  name="logtype"
                  value={values.logtype}
                  onChange={handleChange}
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button variant="outlined" color="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" onClick={handleFormSubmit} color="primary">
                  Create
                </Button>
              </DialogActions>
            </form>

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
          </Dialog>
        )}
      </Formik>
    </Box>
  );
}
