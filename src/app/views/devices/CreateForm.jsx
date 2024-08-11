
import { Box,Icon } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import SimpleForm from './SimpleForm';

export default function FormDialog({fetchData}) {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const handleSubmit = (event) => {
    console.log("submitted");
    console.log(event);
  };

  return (
    <Box>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
      <Icon>add</Icon>Create
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="xs">
        <DialogTitle id="form-dialog-title">Create Device</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
            <SimpleForm handleClose={handleClose} fetchData={fetchData}></SimpleForm>
        </DialogContent>
        {/* <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions> */}
      </Dialog>
    </Box>
  );
}
