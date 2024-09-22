import React, { useState, useEffect } from 'react';
import {
  DialogActions,
  DialogContent,
  Button,
  TextField,
  Snackbar, Alert
} from '@mui/material';
import axiosInstance from '../../../axiosInterceptor';

const EditForm = ({ logdata, getLogTypes, onClose }) => {
  const [formData, setFormData] = useState({ deviceId: '', logType: '' });

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const handleAlertClose = () => {
    setAlertOpen(false); // Close the alert
  };

  useEffect(() => {
    if (logdata) {
      setFormData({
        deviceId: logdata.deviceId,
        logType: logdata.logType,
      });
    }
  }, [logdata]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`/updateMQTTLoggerType`, { ...formData, id: logdata.id });
      getLogTypes();
      setAlertMessage('Log Type updated successfully!');
      setAlertSeverity('success');
      setTimeout(() => {
        onClose(); // Close the dialog on successful update
      }, 1000);
    } catch (error) {
      setAlertMessage(error.response?.data?.msg || 'Something Went Wrong');
      setAlertSeverity('error');
      console.error("Error updating device:", error);
    } finally {
      setAlertOpen(true); // Show the alert after API response
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        autoFocus
        margin="dense"
        name="deviceId"
        label="Device Id"
        type="text"
        fullWidth
        variant="outlined"
        value={formData.deviceId}
        onChange={handleChange}
        disabled
      />
      <TextField
        margin="dense"
        name="logType"
        label="Log Type"
        type="text"
        fullWidth
        variant="outlined"
        value={formData.logType}
        onChange={handleChange}
      />
      <Button type="submit" color="primary" variant="contained" sx={{ mt: 2 }}>
        Update
      </Button>
      <Button color="secondary" onClick={onClose} sx={{ mt: 2, ml: 2 }}>
        Cancel
      </Button>

      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleAlertClose} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default EditForm;
