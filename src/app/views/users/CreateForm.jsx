import { Box, Icon, Autocomplete, styled, Snackbar, Alert } from '@mui/material';
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
import { useState } from 'react';

export default function CreateForm({ getData }) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({});
  const [value, setValue] = React.useState(null);
  const [access, setAccessLevel] = React.useState(null);

  const [opens, setOpens] = React.useState(false);
  const [errorMessage,setErrorMessage] = useState(null);


  function handleClose(_, reason) {
    console.log('handleclose')
    if (reason === "clickaway") {
      return;
    }
    setOpens(false);
  }

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
        name:values.name,
        userName: values.userName,
        status: value && value.label || 'InActive',
        accesslevel: access && access.label == 'Admin' ? 2 : 3 ,
        email: values.email,
        password: values.password,
      };
      const result = await axios.post('http://127.0.0.1:4330/api/createUser', obj);
      getData();
    } catch (error) {
      setErrorMessage(error.msg || 'Something Went Wrong');
      setOpens(true);
      setOpens(false);
      console.log('erorr', error);
    }
    setOpen(false);
  }
  const initialValues = {
    name: '',
    userName: '',
    status: '',
    accesslevel: '',
    email:'',
    password:''
  };

  const suggestions = [
    { label: 'Active' },
    { label: 'InActive' },
  ]

  const accessLevel = [
    { label: 'Admin' },
    { label: 'Supervisor' },
  ]

  const handleChangeDrop = (_, newValue) => {
    console.log('handleChange',newValue)
    if (newValue && newValue.inputValue) {
      setValue({ label: newValue.inputValue });
      return;
    }
    setValue(newValue);
  };

  const handleAccessLevel = (_, newValue) => {
    console.log('handleChange',newValue)
    if (newValue && newValue.inputValue) {
      setAccessLevel({ label: newValue.inputValue });
      return;
    }
    setAccessLevel(newValue);
  };


  const AutoComplete = styled(Autocomplete)(() => ({
    width: 540,
    // marginBottom: '16px',
  }));

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
              <DialogTitle id="form-dialog-title">Create User</DialogTitle>
              <DialogContent>
                {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}

                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name"
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="name"
                  label="User Name"
                  type="text"
                  name="userName"
                  value={values.userName}
                  onChange={handleChange}
                  fullWidth
                />
                                <TextField
                  margin="dense"
                  id="name"
                  label="Email"
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="name"
                  label="Password"
                  type="text"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  fullWidth
                />
                {/* <TextField
                  margin="dense"
                  id="name"
                  label="Status"
                  type="text"
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  fullWidth
                /> */}
                
                <AutoComplete
                  value={value}
                  options={suggestions}
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
                      label="Status" 
                      variant="outlined" 
                      // name="status"
                      // value={values.status}
                      fullWidth />
                  )}
                />

                <AutoComplete
                  value={access}
                  options={accessLevel}
                  // defaultValue={{label:value}}
                  onChange={handleAccessLevel}
                  getOptionLabel={(option) => {
                    console.log('option',option)
                    return  option.label;
                  }}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      margin="dense" 
                      label="Access Level" 
                      variant="outlined" 
                      // name="status"
                      // value={values.status}
                      fullWidth />
                  )}
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

      {/* <Snackbar open={opens} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} sx={{ m: 1 }} severity="error" variant="filled">
          {errorMessage}
      </Alert>
      </Snackbar> */}
    </Box>
  );
}
