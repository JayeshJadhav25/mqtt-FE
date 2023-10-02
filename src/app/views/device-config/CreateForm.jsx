import { Box, Icon } from '@mui/material';
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

export default function DeviceConfigForm({ getData }) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({});

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  async function handleFormSubmit(values) {
    console.log('handle submit', values);
    try {
      let obj = {
        id: uuid(),
        deviceId: values.deviceid,
        logType: values.logtype,
      };
      const result = await axios.post('http://127.0.0.1:4330/api/createMQTTLoggerType', obj);
      getData();
    } catch (error) {
      console.log('erorr', error);
    }
    setOpen(false);
  }
  const initialValues = {
    deviceid: '',
    logtype: '',
  };
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

                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Device Id"
                  type="text"
                  name="deviceid"
                  value={values.deviceid}
                  onChange={handleChange}
                  fullWidth
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
          </Dialog>
        )}
      </Formik>
    </Box>
  );
}
