import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import axios from 'axios';

const EditForm = ({ data, onClose, fetchData }) => {
  const [formData, setFormData] = useState({
    ...data,
    startDate: data.startTime?.split(' ')[0] || '',
    startTime: data.startTime?.split(' ')[1] || '',
    endDate: data.endTime?.split(' ')[0] || '',
    endTime: data.endTime?.split(' ')[1] || ''
  });

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedData = {
        ...formData,
        startTime: `${formData.startDate} ${formData.startTime}`,
        endTime: `${formData.endDate} ${formData.endTime}`
      };

      // Make API call to update data
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/updateMaintainenceRequest`, updatedData);
      
      console.log("Update successful:", response.data);
      fetchData();
      onClose(); // Close the dialog on successful update

    } catch (error) {
      console.error("Error updating data:", error);
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
        onChange={handleChange}
        fullWidth
        margin="normal"
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
    </form>
  );
};

export default EditForm;
