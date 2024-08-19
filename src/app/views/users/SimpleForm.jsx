import {
    Button,
    Grid,
    Snackbar,
    Alert,
    Select,
    MenuItem,
    InputLabel,
    FormControl
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

const SimpleForm = ({ handleClose, fetchData }) => {
    const [state, setState] = useState({
        name: '',
        userName: '',
        email: '',
        password: '',
        status: '',
        accesslevel: ''
    });

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success'); // 'success' | 'error'

    const handleAlertClose = () => {
        setAlertOpen(false); // Close the alert
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const requestBody = {
            id: uuid(),
            name: state.name,
            userName: state.userName,
            email: state.email,
            password: state.password,
            status: state.status,
            accesslevel: state.accesslevel
        };

        axios.post(`${process.env.REACT_APP_API_URL}/api/createUser`, requestBody)
            .then(response => {
                console.log("Success:", response.data);
                setAlertMessage('User created successfully!');
                setAlertSeverity('success');
                fetchData();
                handleClose();
            })
            .catch(error => {
                setAlertMessage(error.response.data.msg || 'Something Went Wrong');
                setAlertSeverity('error');
                console.error("Error creating maintenance request:", error);
            })
            .finally(() => {
                setAlertOpen(true); // Show the alert after API response
            })
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const {
        name,
        userName,
        email,
        password,
        status,
        accesslevel,
    } = state;

    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={12} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        
                        <TextField
                            sx={{ mb: 2 }}
                            type="text"
                            name="name"
                            label="Name *"
                            onChange={handleChange}
                            value={name}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                        />

                        <TextField
                            sx={{ mb: 2 }}
                            type="text"
                            name="userName"
                            label="UserName *"
                            onChange={handleChange}
                            value={userName}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                        />

                        <TextField
                            sx={{ mb: 2 }}
                            type="email"
                            name="email"
                            label="Email *"
                            onChange={handleChange}
                            value={email}
                            validators={["required", "isEmail"]}
                            errorMessages={["This field is required", "Email is not valid"]}
                        />

                        <TextField
                            sx={{ mb: 2 }}
                            type="text"
                            name="password"
                            label="Password *"
                            onChange={handleChange}
                            value={password}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                        />

                        <FormControl fullWidth variant="filled" sx={{ mb: 2 }}>
                            <InputLabel>Status *</InputLabel>
                            <Select
                                name="status"
                                value={status}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="inactive">Inactive</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth variant="filled" sx={{ mb: 2 }}>
                            <InputLabel>Access Level *</InputLabel>
                            <Select
                                name="accesslevel"
                                value={accesslevel}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value={2}>Admin</MenuItem>
                                <MenuItem value={3}>Supervisor</MenuItem>
                            </Select>
                        </FormControl>

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
                autoHideDuration={6000} // Adjust the duration as needed
                onClose={handleAlertClose}
            >
                <Alert onClose={handleAlertClose} severity={alertSeverity}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default SimpleForm;
