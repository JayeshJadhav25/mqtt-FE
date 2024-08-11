import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Card, CardContent, CardHeader } from '@mui/material';
import axios from 'axios';

function SimpleForm() {
  const [formData, setFormData] = useState({
    label1: '',
    label2: ''
  });

  // Fetch data on page load
  useEffect(() => {
    axios.get('/api/endpoint')
      .then(response => {
        // Assuming response data has label1 and label2
        const { label1, label2 } = response.data;
        setFormData({ label1, label2 });
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call API to update the values
    axios.post('/api/endpoint', formData)
      .then(response => {
        console.log('Data updated successfully:', response.data);
      })
      .catch(error => {
        console.error('There was an error updating the data!', error);
      });
  };

  return (
    <Card sx={{ maxWidth: 500, margin: '0 auto' }}>
      <CardHeader title="Flag" />
      <CardContent>
        <Box component="form" onSubmit={handleSubmit}>
          <Box mb={2} display="flex" alignItems="center">
            <Typography variant="body1" sx={{ marginRight: 2, width: '80px' }}>Label1:</Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name="label1"
              value={formData.label1}
              onChange={handleChange}
            />
          </Box>

          <Box mb={2} display="flex" alignItems="center">
            <Typography variant="body1" sx={{ marginRight: 2, width: '80px' }}>Label2:</Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              name="label2"
              value={formData.label2}
              onChange={handleChange}
            />
          </Box>

          <Box textAlign="center">
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default SimpleForm;
