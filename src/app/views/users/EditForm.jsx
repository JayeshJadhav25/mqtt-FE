import React, { useEffect, useState } from 'react';
import { TextField, Button, Snackbar, Alert, Select, MenuItem, FormControl, InputLabel, InputAdornment, IconButton } from '@mui/material';
import axiosInstance from '../../../axiosInterceptor';

import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Visibility, VisibilityOff } from '@mui/icons-material';

const EditForm = ({ data, onClose, fetchData }) => {

    const [formData, setFormData] = useState({
        ...data,
    });

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success'); // 'success' | 'error'

    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [password, setPassword] = useState('');

    const handleAlertClose = () => {
        setAlertOpen(false); // Close the alert
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword); // Toggle password visibility
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
            if (password) {
                const hasSpaces = /\s/;
                const hasEmojis = /[\u{1F600}-\u{1F64F}]/u;
                const requiredCharFormat = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])/; // Example: At least one uppercase, one lowercase, one number, and one special character

                if (hasSpaces.test(password)) {
                    setAlertMessage('Password should not contain spaces.');
                    setAlertSeverity('error');
                    setAlertOpen(true);
                    // alert('Password should not contain spaces.');
                    return;
                }
                if (hasEmojis.test(password)) {
                    setAlertMessage('Password should not contain emojis.');
                    setAlertSeverity('error');
                    setAlertOpen(true); return;
                }
                if (!requiredCharFormat.test(password)) {
                    setAlertMessage('Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.');
                    setAlertSeverity('error');
                    setAlertOpen(true); return;
                }

                updatedData.password = password;
            } else {
                delete updatedData.password
            }

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


    useEffect(() => {
        ValidatorForm.addValidationRule("noEmojis", (value) => {
            const emojiPattern =
                /[\u{1F600}-\u{1F6FF}|\u{2600}-\u{26FF}|\u{2700}-\u{27BF}|\u{1F900}-\u{1F9FF}]/u;
            return !emojiPattern.test(value);
        });

        ValidatorForm.addValidationRule("noSpaces", (value) => {
            return !/\s/.test(value); // Check if the value contains any spaces
        });

        ValidatorForm.addValidationRule("requiredCharFormat", (value) => {
            const charFormatPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/;
            return charFormatPattern.test(value);
        });
    }, [password])

    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit}>
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
                    // sx={{ mb: 2 }}
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    name="password"
                    label="Password *"
                    autoComplete="new-password"  // Prevent browser autofill
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    validators={[
                        "required",
                        "minStringLength:8",
                        "maxStringLength:15",
                        "noSpaces",
                        "noEmojis",
                        "requiredCharFormat",
                    ]}
                    errorMessages={[
                        "This field is required",
                        "Minimum 8 characters",
                        "Maximum 15 characters",
                        "Password should not contain spaces",
                        "Password should not contain emojis",
                        "Password must contain uppercase, lowercase, digit, and special character",
                    ]}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    margin="normal"

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
            </ValidatorForm>

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
