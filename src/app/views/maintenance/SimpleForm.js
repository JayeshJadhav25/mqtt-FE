import {
    Button,
    Grid,
    MenuItem,
    InputLabel,
    Box,
    Select,
    Snackbar,
    Alert
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { styled } from '@mui/material/styles';
import uuid from 'react-uuid';
import axiosInstance from '../../../axiosInterceptor';

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
}));

const SimpleForm = ({ handleClose, fetchData }) => {
    const [state, setState] = useState({
        date: new Date(),
        dropdown: [],
        dropdownOptions: [],
        firstName: '',
        creditCard: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
    });

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    useEffect(() => {
        axiosInstance.post(`/getMQTTDevice`)
            .then(response => {
                const options = response.data.status.map(item => ({
                    id: item.deviceId,  // Use deviceId here
                    value: item.deviceName,
                    label: item.deviceName
                }));
                setState(prevState => ({
                    ...prevState,
                    dropdownOptions: options,
                    dropdown: [options[0]?.id]
                }));
            })
            .catch(error => {
                console.error("Error fetching dropdown options:", error);
            });

        ValidatorForm.addValidationRule("isDropdownSelected", (value) => {
            if (value.length === 0) return false;
            return true;
        });

        return () => ValidatorForm.removeValidationRule("isDropdownSelected");
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const requestBody = {
            id: uuid(),
            devices: state.dropdown, // This now contains deviceIds
            engineerName: state.firstName,
            engineerContact: state.creditCard,
            startTime: `${state.startDate} ${state.startTime}`,
            endTime: `${state.endDate} ${state.endTime}`
        };

        axiosInstance.post(`/createMaintainenceRequest`, requestBody)
            .then(response => {
                setAlertMessage('Device created successfully!');
                setAlertSeverity('success');
                fetchData();
                setTimeout(() => {
                    handleClose();
                }, 1000)
            })
            .catch(error => {
                setAlertMessage(error.response.data.msg || 'Something Went Wrong');
                setAlertSeverity('error');
                console.error("Error creating maintenance request:", error);
            })
            .finally(() => {
                setAlertOpen(true);
            })
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDropdownChange = (event) => {
        const value = event.target.value;
        setState(prevState => ({
            ...prevState,
            dropdown: typeof value === 'string' ? value.split(',') : value
        }));
    };

    const {
        firstName,
        creditCard,
        dropdown,
        dropdownOptions,
        startDate,
        startTime,
        endDate,
        endTime
    } = state;

    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={12} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <Box mb={2}>
                            <InputLabel id="dropdown-label">
                                Device List <span style={{ color: 'red' }}>*</span>
                            </InputLabel>
                            <Select
                                labelId="dropdown-label"
                                name="dropdown"
                                multiple
                                value={dropdown}
                                onChange={handleDropdownChange}
                                renderValue={(selected) => (
                                    <div>
                                        {dropdownOptions
                                            .filter(option => selected.includes(option.id))
                                            .map((option) => (
                                                <div key={option.id}>{option.label}</div>
                                            ))}
                                    </div>
                                )}
                                fullWidth
                                required
                                error={dropdown.length === 0} // Optionally show error when nothing is selected
                            >
                                {dropdownOptions.map(option => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            {dropdown.length === 0 && (
                                <p style={{ color: 'red' }}>This field is required</p>
                            )}
                        </Box>


                        <TextField
                            type="text"
                            name="firstName"
                            label="Engineer Name"
                            onChange={handleChange}
                            value={firstName}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                        />

                        <TextField
                            sx={{ mb: 4 }}
                            type="number"
                            name="creditCard"
                            label="Engineer Contact Number"
                            onChange={handleChange}
                            value={creditCard}
                            errorMessages={["This field is required", "Phone Number Should be of 10 digit", "Phone Number Should be of 10 digit"]}
                            validators={["required", "minStringLength: 10", "maxStringLength: 10"]}
                        />

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <InputLabel id="start-date-label">Start Date</InputLabel>
                                <input
                                    type="date"
                                    id="start-date"
                                    name="startDate"
                                    value={startDate}
                                    onChange={handleChange}
                                    required
                                    style={{ width: "100%", marginBottom: "16px", padding: "8px", boxSizing: "border-box" }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel id="start-time-label">Start Time</InputLabel>
                                <input
                                    type="time"
                                    id="start-time"
                                    name="startTime"
                                    value={startTime}
                                    onChange={handleChange}
                                    required
                                    style={{ width: "100%", marginBottom: "16px", padding: "8px", boxSizing: "border-box" }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel id="end-date-label">End Date</InputLabel>
                                <input
                                    type="date"
                                    id="end-date"
                                    name="endDate"
                                    value={endDate}
                                    onChange={handleChange}
                                    required
                                    style={{ width: "100%", marginBottom: "16px", padding: "8px", boxSizing: "border-box" }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel id="end-time-label">End Time</InputLabel>
                                <input
                                    type="time"
                                    id="end-time"
                                    name="endTime"
                                    value={endTime}
                                    onChange={handleChange}
                                    required
                                    style={{ width: "100%", marginBottom: "16px", padding: "8px", boxSizing: "border-box" }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button color="secondary" variant="outlined" sx={{ mr: 2 }} onClick={handleClose}>
                        <Span sx={{ textTransform: 'none' }}>Cancel</Span>
                    </Button>
                    <Button color="primary" variant="outlined" type="submit">
                        <Span sx={{ textTransform: 'none' }}>Submit</Span>
                    </Button>
                </div>
            </ValidatorForm>

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
        </div>
    );
};

export default SimpleForm;
