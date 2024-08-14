import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Card, CardContent, CardHeader, Grid, MenuItem, Select, Snackbar, Alert} from '@mui/material';
import axios from 'axios';

function SimpleForm() {
  const [formData, setFormData] = useState({});
  const [formFields, setFormFields] = useState([]);
  const [errors, setErrors] = useState({});

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success'); // 'success' | 'error'

  const handleAlertClose = () => {
    setAlertOpen(false); // Close the alert
  };
  // Fields to be excluded
  const excludedFields = ['_id', 'created_time', 'modified_time'];

  // Fetch data on page load
  useEffect(() => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/getFlag`)
      .then(response => {
        if (response.data.success) {
          const data = response.data.status[0]; // Pick the first object from the status array
          
          // Create form fields based on the keys of the data object, excluding specified fields
          const fields = Object.keys(data)
            .filter(key => !excludedFields.includes(key))
            .map(key => ({
              label: key,
              value: data[key],
              type: typeof data[key] === 'number' && Number.isInteger(data[key]) ? 'integer' : typeof data[key],
            }));

          setFormFields(fields);

          // Initialize formData with the values from the response
          const initialFormData = fields.reduce((acc, field) => {
            acc[field.label] = field.value;
            return acc;
          }, {});

          setFormData(initialFormData);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle integer conversion
    const fieldType = formFields.find(field => field.label === name)?.type;
    const parsedValue = fieldType === 'integer' ? parseInt(value, 10) : value;

    setFormData({ ...formData, [name]: parsedValue });

    // Clear any existing errors for the field being changed
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation before submitting
    let valid = true;
    let newErrors = {};

    formFields.forEach(field => {
      if (field.label.toLowerCase().includes('email')) {
        if (!formData[field.label] || !/\S+@\S+\.\S+/.test(formData[field.label])) {
          valid = false;
          newErrors[field.label] = 'Please enter a valid email address';
        }
      }
    });

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    // Call API to update the values
    axios.post(`${process.env.REACT_APP_API_URL}/api/updateFlag`, formData)
    .then(response => {
      console.log('Data updated successfully:', response.data);
      setAlertMessage('Data Updated successfully!');
      setAlertSeverity('success');
    })
    .catch(error => {
      console.error('There was an error updating the data!', error);
      setAlertMessage(error.response?.data?.msg || 'Something Went Wrong');
      setAlertSeverity('error');
    })
    .finally(() => {
      setAlertOpen(true); // Show the alert after API response
    });
  };

  return (
    <Card sx={{ maxWidth: 700, margin: '0 auto' }}>
      <CardHeader title="MQTT Flag" />
      <CardContent>
        <Box component="form" onSubmit={handleSubmit}>
          {formFields.map((field, index) => (
            <Grid container alignItems="center" spacing={2} mb={2} key={index}>
              <Grid item xs={4}>
                <Typography variant="body1" sx={{ width: '100%' }}>
                  {field.label}:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                {typeof field.value === 'boolean' ? (
                  <Select
                    fullWidth
                    variant="outlined"
                    size="small"
                    name={field.label}
                    value={formData[field.label] || false}
                    onChange={handleChange}
                  >
                    <MenuItem value={true}>true</MenuItem>
                    <MenuItem value={false}>false</MenuItem>
                  </Select>
                ) : (
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    name={field.label}
                    value={formData[field.label] || ''}
                    onChange={handleChange}
                    type={field.label.toLowerCase().includes('email') ? 'email' : field.type === 'integer' ? 'number' : 'text'}
                    error={!!errors[field.label]}
                    helperText={errors[field.label]}
                  />
                )}
              </Grid>
            </Grid>
          ))}

          <Box textAlign="center">
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Box>
        </Box>
      </CardContent>

      <Snackbar
                open={alertOpen}
                autoHideDuration={6000} // Adjust the duration as needed
                onClose={handleAlertClose}
            >
                <Alert onClose={handleAlertClose} severity={alertSeverity}>
                    {alertMessage}
                </Alert>
      </Snackbar>

    </Card>
  );
}

export default SimpleForm;
