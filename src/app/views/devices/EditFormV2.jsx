import React, { useState } from 'react';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import axiosInstance from '../../../axiosInterceptor';

const EditFormV2 = ({ data, onClose, fetchData }) => {
    const [formData, setFormData] = useState({
        ...data,
        // mqttTopic: data.mqttTopic && Array.isArray(data.mqttTopic) ? data.mqttTopic.join(",") : '',
    });

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleAlertClose = () => {
        setAlertOpen(false); // Close the alert
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updatedData = {
                ...formData,
                // mqttTopic: formData.mqttTopic ? formData.mqttTopic.split(",") : []
            };

            await axiosInstance.post(`/updateMQTTDevice`, updatedData);
            fetchData();
            setAlertMessage('Device updated successfully!');
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
                name="deviceId"
                label="Device ID"
                value={formData.deviceId || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                name="deviceName"
                label="Device Name"
                value={formData.deviceName || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                name="mqttIP"
                label="MQTT IP"
                value={formData.mqttIP || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                name="mqttUserName"
                label="MQTT User Name"
                value={formData.mqttUserName || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                name="mqttPassword"
                label="MQTT Password"
                value={formData.mqttPassword || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            {/* <TextField
                name="mqttTopic"
                label="MQTT Topic"
                value={formData.mqttTopic || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                disabled
            /> */}
            <TextField
                name="mqttMacId"
                label="MQTT Mac ID"
                value={formData.mqttMacId || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                name="mqttPort"
                label="MQTT Port"
                value={formData.mqttPort || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                name="mqttAliasName"
                label="MQTT Alias"
                value={formData.mqttAliasName || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
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

export default EditFormV2;
