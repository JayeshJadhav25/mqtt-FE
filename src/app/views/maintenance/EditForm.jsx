import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

const EditForm = ({ data, onClose, fetchData }) => {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make API call to update data
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/updateMaintainenceRequest`, formData);
      
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
      {/* Other form fields as needed */}
      <Button type="submit" color="primary" variant="contained">
        Save
      </Button>
      <Button color="secondary" onClick={onClose}>
        Cancel
      </Button>
    </form>
  );
};

export default EditForm;
