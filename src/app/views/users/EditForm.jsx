import React, { useState } from 'react';
import { TextField, Button, Snackbar, Alert, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axiosInstance from '../../../axiosInterceptor';

const EditForm = ({ data, onClose, fetchData }) => {

    const [formData, setFormData] = useState({
        ...data,
    });

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success'); // 'success' | 'error'

    const handleAlertClose = () => {
        setAlertOpen(false); // Close the alert
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updatedData = {
                ...formData,
            };

            // Make API call to update data
            const response = await axiosInstance.post(`/updateUser`, updatedData);

            console.log("Update successful:", response.data);
            setAlertMessage('User Updated successfully!');
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
        <div>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="name"
                    label="Name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    name="userName"
                    label="UserName"
                    value={formData.userName || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    disabled
                />

                <TextField
                    name="email"
                    label="Email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    disabled
                />

                <TextField
                    name="accesslevel"
                    label="Access Level"
                    value={formData.accesslevel === 3 ? "Supervisor" : "Admin"}
                    onChange={handleChange}
                    fullWidth
                    disabled
                    margin="normal"
                />

                {/* Status Dropdown */}
                <FormControl fullWidth variant="filled" sx={{ mb: 2 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="status"
                        value={formData.status || ''}
                        onChange={handleChange}
                        fullWidth
                    >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                </FormControl>

                <Button type="submit" color="primary" variant="contained" sx={{ mt: 2 }}>
                    Update
                </Button>
                <Button color="secondary" onClick={onClose} sx={{ mt: 2, ml: 2 }}>
                    Cancel
                </Button>
            </form>

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
        </div>
    );
}

export default EditForm;
