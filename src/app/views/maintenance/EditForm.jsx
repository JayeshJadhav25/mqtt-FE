import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Snackbar, Alert } from '@mui/material';
import axiosInstance from '../../../axiosInterceptor';

const EditForm = ({ data, onClose, fetchData }) => {
  const [formData, setFormData] = useState({
    ...data,
    startDate: data.startTime?.split(' ')[0] || '',
    startTime: data.startTime?.split(' ')[1] || '',
    endDate: data.endTime?.split(' ')[0] || '',
    endTime: data.endTime?.split(' ')[1] || ''
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success'); // 'success' | 'error'

  useEffect(() => {
    setFormData({
      ...data,
      startDate: data.startTime?.split(' ')[0] || '',
      startTime: data.startTime?.split(' ')[1] || '',
      endDate: data.endTime?.split(' ')[0] || '',
      endTime: data.endTime?.split(' ')[1] || ''
    });
  }, [data]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleAlertClose = () => {
    setAlertOpen(false); // Close the alert
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      if (!formData.engineerContact || formData.engineerContact.length !== 10) {
        setAlertMessage('Phone Number should be exactly 10 digits');
        setAlertSeverity('error');
        setAlertOpen(true);
        return; // Stop form submission if validation fails
      }
      const updatedData = {
        ...formData,
        startTime: `${formData.startDate} ${formData.startTime}`,
        endTime: `${formData.endDate} ${formData.endTime}`
      };

      // Make API call to update data
      const response = await axiosInstance.post(`/updateMaintainenceRequest`, updatedData);

      console.log("Update successful:", response.data);
      fetchData();
      setAlertMessage('Maintainence Updated successfully!');
      setAlertSeverity('success');
      fetchData();
      setTimeout(() => {
        onClose(); // Close the dialog on successful update
      }, 1000)

    } catch (error) {
      setAlertMessage(error.response?.data?.msg || 'Something Went Wrong');
      setAlertSeverity('error');
      console.error("Error updating data:", error);
    } finally {
      setAlertOpen(true); // Show the alert after API response
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="engineerName"
        label="Engineer Name"
        value={formData.engineerName || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="engineerContact"
        label="Engineer Contact"
        value={formData.engineerContact || ''}
        onChange={(e) => {
          // Ensure only numbers are typed
          const value = e.target.value;
          if (/^\d*$/.test(value)) { // Allow only digits
            handleChange(e);
          }
        }}
        fullWidth
        margin="normal"
        type="tel" // Indicate that the field is for telephone numbers
        inputProps={{ maxLength: 10 }} // Limit input to 10 characters
      />
      <TextField
        name="status"
        label="Status"
        value={formData.status || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            type="date"
            name="startDate"
            label="Start Date"
            value={formData.startDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="time"
            name="startTime"
            label="Start Time"
            value={formData.startTime}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="date"
            name="endDate"
            label="End Date"
            value={formData.endDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="time"
            name="endTime"
            label="End Time"
            value={formData.endTime}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>

      <Button type="submit" color="primary" variant="contained" sx={{ mt: 2 }}>
        Update
      </Button>
      <Button color="secondary" onClick={onClose} sx={{ mt: 2, ml: 2 }}>
        Cancel
      </Button>

      <Snackbar
        open={alertOpen}
        autoHideDuration={6000} // Adjust the duration as needed
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
