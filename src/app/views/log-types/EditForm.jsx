import { Box, Icon, Autocomplete, styled } from '@mui/material';
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

export default function EditForm({ logdata, getLogTypes }) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({});
  const [value, setValue] = React.useState(logdata.deviceId);
  const [deviceList, setDeviceList] = React.useState({
    devices: []
  });

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  async function handleFormSubmit(values) {
    try {
      if (values.deviceid && values.logtype) {
        let obj = {
          id: logdata.id,
          deviceId: values.deviceid,
          logType: values.logtype,
        };
        const result = await axios.post('http://127.0.0.1:4330/api/updateMQTTLoggerType', obj);
        getLogTypes();
      }
    } catch (error) {
      console.log('erorr', error);
    }
    setOpen(false);
  }
  const initialValues = {
    deviceid: logdata.deviceId || '',
    logtype: logdata.logType || '',
  };


  const AutoComplete = styled(Autocomplete)(() => ({
    width: 540,
    // marginBottom: '16px',
  }));

  const handleChangeDrop = (_, newValue) => {
    setValue(newValue.label)

    // if (newValue && newValue.inputValue) {
    //   setValue({ label: newValue.inputValue });
    //   return;
    // }
    // setValue(newValue);
  };

  const getDevices = async () => {
    axios
      .post('http://127.0.0.1:4330/api/getMQTTDevice')
      .then((res) => {
        console.log('response=>', res.data.status);
        let devices = [];
        res.data.status.forEach(elem => {
          devices.push({label:elem.deviceId});
        })
        setDeviceList({devices:devices});

        // setDeviceList(res.data.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  useEffect(() => {
    getDevices();
  }, []);

  return (
    <Box>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <Icon>edit</Icon> Edit
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
              <DialogTitle id="form-dialog-title">Update</DialogTitle>
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
                  disabled
                />
                {/* <AutoComplete
                  // value={value}
                  options={deviceList.devices}
                  defaultValue={{label:value}}
                  onChange={handleChangeDrop}
                  // getOptionLabel={(option) => {
                  //   console.log('option',option)
                  //   return  option.label;
                  // }}
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
                /> */}

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
