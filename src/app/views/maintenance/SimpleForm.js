import {
    Button,
    Grid,
    MenuItem,
    InputLabel,
    Box,
    Select
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from 'axios';
import { styled } from '@mui/material/styles';
import uuid from 'react-uuid';

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
}));

const SimpleForm = ({ handleClose }) => {
    const [state, setState] = useState({
        date: new Date(),
        dropdown: [], // Initialize as an array for multi-selection
        dropdownOptions: [], // State to hold dropdown options
        firstName: '',
        creditCard: ''
    });

    useEffect(() => {
        // Fetch dropdown options from API
        axios.post(`${process.env.REACT_APP_API_URL}/api/getMQTTDevice`)
            .then(response => {
                const options = response.data.status.map(item => ({
                    id: item.id, // ID of the device
                    value: item.deviceName, // Device name
                    label: item.deviceName // Device name
                }));
                setState(prevState => ({
                    ...prevState,
                    dropdownOptions: options,
                    dropdown: [options[0]?.id] // Set default value to the id of the first option, if available
                }));
            })
            .catch(error => {
                console.error("Error fetching dropdown options:", error);
            });

        ValidatorForm.addValidationRule("isDropdownSelected", (value) => {
            if (value.length === 0) return false; // Require at least one selection
            return true;
        });

        return () => ValidatorForm.removeValidationRule("isDropdownSelected");
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Prepare the request body
        const requestBody = {
            id: uuid(),
            devices: state.dropdown, // Use selected dropdown IDs
            engineerName: state.firstName,
            engineerContact: state.creditCard,
            "startTime": "2024-07-06 16:25:00",
            "endTime": "2024-07-08 16:25:00"
        };

        axios.post(`${process.env.REACT_APP_API_URL}/api/createMaintainenceRequest`, requestBody)
            .then(response => {
                console.log("Success:", response.data);
                // Handle successful response
                handleClose();
            })
            .catch(error => {
                console.error("Error creating maintenance request:", error);
                // Handle error response
            });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        // Update state based on the input field name
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
        dropdownOptions
    } = state;

    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={12} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <Box mb={2}> {/* Adds margin-bottom */}

                            <InputLabel id="dropdown-label">Device List</InputLabel>

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
                            >
                                {dropdownOptions.map(option => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
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
                            label="Engineer Number"
                            onChange={handleChange}
                            value={creditCard}
                            errorMessages={["This field is required"]}
                            validators={["required", "maxStringLength: 10"]}
                        />
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
        </div>
    );
};

export default SimpleForm;
