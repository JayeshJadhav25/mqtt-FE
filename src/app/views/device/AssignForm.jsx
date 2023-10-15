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

export default function AssignForm({deviceId}) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({});
  const [value, setValue] = React.useState(null);
  const [deviceList, setDeviceList] = React.useState({
    devices: []
  });

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const AutoComplete = styled(Autocomplete)(() => ({
    width: 540,
    // marginBottom: '16px',
  }));

  async function handleFormSubmit(values) {
    console.log('userId',value.userId)
    try {
      let obj = {
        id:uuid(),
        deviceId: deviceId || "",
        userId: value && value.userId ? value.userId : "",
      };
      console.log('assign obj',obj)
      const result = await axios.post('http://127.0.0.1:4330/api/assignMQTTDevice', obj);
      alert('Device Assigned Succesfully')
    //   getLogTypes();
    } catch (error) {
      console.log('erorr', error);
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
    // console.log('handleChangeDrop',newValue);
    if (newValue && newValue.inputValue) {
      setValue({ label: newValue.inputValue });
      return;
    }
    setValue(newValue);
  };

  const getDevices = async () => {
    axios
      .post('http://127.0.0.1:4330/api/getUser')
      .then((res) => {
        console.log('response=>', res.data.status);
        let devices = [];
        res.data.status.forEach(elem => {
          devices.push({label:elem.userName,userId:elem.id});
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
         Assign
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
              <DialogTitle id="form-dialog-title">Assign To Users</DialogTitle>
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
                    console.log('option',option)
                    return  option.label;
                  }}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      margin="dense" 
                      label="Users" 
                      variant="outlined" 
                      // name="status"
                      // value={values.status}
                      fullWidth />
                  )}
                />
                {/* <TextField
                  margin="dense"
                  id="name"
                  label="Log Type"
                  type="text"
                  name="logtype"
                  value={values.logtype}
                  onChange={handleChange}
                  fullWidth
                /> */}
              </DialogContent>
              <DialogActions>
                <Button variant="outlined" color="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" onClick={handleFormSubmit} color="primary">
                  Assign
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        )}
      </Formik>
    </Box>
  );
}
