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

export default function EditForm({ dataList, getData }) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({});
  const [value, setValue] = React.useState(dataList.status);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const suggestions = [
    { label: 'Active' },
    { label: 'InActive' },
  ]

  async function handleFormSubmit(values) {
    try {
      if (values.name) {
        let obj = {
          id: dataList.id,
          name:values.name,
          userName: values.userName,
          status: value || values.status,
          accesslevel: 3,
          email: values.email,
          password: values.password,
        };
        const result = await axios.post('http://127.0.0.1:4330/api/updateUser', obj);
        getData();
      }
    } catch (error) {
      console.log('erorr', error);
    }
    setOpen(false);
  }
  const initialValues = {
    name:dataList.name || "",
    userName: dataList.userName || "",
    status: dataList.status || "",
    accesslevel: dataList.accesslevel || "",
    email:dataList.email || "",
    password: dataList.password || "",
  };


  const AutoComplete = styled(Autocomplete)(() => ({
    width: 540,
    // marginBottom: '16px',
  }));

  const handleChangeDrop = (_, newValue) => {
    setValue(newValue.label)
  }

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
                  id="accesslevel"
                  label="Access Level"
                  type="text"
                  name="accesslevel"
                  value={values.accesslevel == 1 ? 'SuperAdmin' : values.accesslevel == 2 ? 'Admin' : values.accesslevel == 3 ? 'Supervisor' : values.accesslevel }
                  disabled
                  onChange={handleChange}
                  fullWidth
                />                           
                <AutoComplete
                // value={value}
                options={suggestions}
                defaultValue={{label:value}}
                onChange={handleChangeDrop}
                // getOptionLabel={(option) => {
                //   console.log('option',option)
                //   // if(option.label != values.status) {
                //     return  option.label;
                //   // }
                // }}
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
                {/* <TextField
                  margin="dense"
                  id="name"
                  label="Password"
                  type="text"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  fullWidth
                /> */}
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
                  // value={value}
                  options={suggestions}
                  defaultValue={{label:value}}
                  onChange={handleChangeDrop}
                  // getOptionLabel={(option) => {
                  //   console.log('option',option)
                  //   // if(option.label != values.status) {
                  //     return  option.label;
                  //   // }
                  // }}
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