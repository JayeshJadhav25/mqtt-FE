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

export default function EditForm({ dataList, getData }) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({});

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  async function handleFormSubmit(values) {
    try {
      if (values.deviceid) {
        let obj = {
          id: dataList.id,
          deviceId: values.deviceid,
          deviceName: values.deviceName,
          mqttIP: values.mqttIP,
          mqttUserName: values.mqttUserName,
          mqttPassword: values.mqttPassword,
          mqttTopic: values.mqttTopic,
          mqttUrl: values.mqttUrl,
          mqttMacId: values.mqttMacId,
          status: values.status,
          mqttPort: values.mqttPort,
        };
        const result = await axios.post('http://127.0.0.1:4330/api/updateMQTTDevice', obj);
        getData();
      }
    } catch (error) {
      console.log('erorr', error);
    }
    setOpen(false);
  }
  const initialValues = {
    deviceid: dataList.deviceId || '',
    deviceName: dataList.deviceName || '',
    mqttIP: dataList.mqttIP || '',
    mqttUserName: dataList.mqttUserName || '',
    mqttPassword: dataList.mqttPassword || '',
    mqttTopic: dataList.mqttTopic || '',
    mqttUrl: dataList.mqttUrl || '',
    mqttMacId: dataList.mqttMacId || '',
    status: dataList.status || '',
    mqttPort: dataList.mqttPort || '',
  };

  return (
    <Box>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <Icon>edit</Icon>
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
              <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
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
                  id="deviceName"
                  label="Device Name"
                  type="text"
                  name="deviceName"
                  value={values.deviceName}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="mqttIP"
                  label="MQTT IP"
                  type="text"
                  name="mqttIP"
                  value={values.mqttIP}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="mqttUserName"
                  label="MQTT UserName"
                  type="text"
                  name="mqttUserName"
                  value={values.mqttUserName}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="mqttPassword"
                  label="MQTT Password"
                  type="text"
                  name="mqttPassword"
                  value={values.mqttPassword}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="mqttTopic"
                  label="MQTT Topic"
                  type="text"
                  name="mqttTopic"
                  value={values.mqttTopic}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="mqttUrl"
                  label="MQTT Url"
                  type="text"
                  name="mqttUrl"
                  value={values.mqttUrl}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="mqttMacId"
                  label="MQTT MacId"
                  type="text"
                  name="mqttMacId"
                  value={values.mqttMacId}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="status"
                  label="Status"
                  type="text"
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="mqttPort"
                  label="MQTT Port"
                  type="text"
                  name="mqttPort"
                  value={values.mqttPort}
                  onChange={handleChange}
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button variant="outlined" color="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" onClick={handleFormSubmit} color="primary">
                  Update
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        )}
      </Formik>
    </Box>
  );
}
