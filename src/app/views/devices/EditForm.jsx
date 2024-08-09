import {
    Button,
    Grid,
    styled,
    MenuItem,
    Snackbar, 
    Alert,
    Box,
    Icon
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm, SelectValidator } from "react-material-ui-form-validator";
import axios from 'axios';
import uuid from 'react-uuid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
}));

const EditForm = ({ fetchData, dataList }) => {

    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
      setOpen(true);
    }
  
    function handleClose() {
      setOpen(false);
    }

    const [state, setState] = useState(dataList);

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success'); // 'success' | 'error'

    const handleAlertClose = () => {
        setAlertOpen(false); // Close the alert
      };
    const handleSubmit = async (event) => {
        console.log("submitted");
        event.preventDefault();
        try {
            const updatedFormData = {
                ...state,
                // id: uuid(),
                mqttTopic: state.mqttTopic ? [state.mqttTopic] : [],
              };
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/updateMQTTDevice`, updatedFormData);
            setAlertMessage('Device updated successfully!');
            setAlertSeverity('success');
            fetchData()
            setTimeout(() => {
                handleClose()
            },1000)
            // console.log('Success:', response.data);
        } catch (error) {
            console.error('Error:', error);
            setAlertMessage(error.response.data.msg || 'Something Went Wrong');
            setAlertSeverity('error');
        } finally {
            setAlertOpen(true); // Show the alert after API response
        }
    };

    const handleChange = (event) => {
        // event.persist();
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const {
        deviceId,
        deviceName,
        mqttIP,
        mqttUserName,
        mqttPassword,
        mqttTopic,
        mqttUrl,
        mqttMacId,
        mqttPort,
        status,
    } = state;

    return (
        // <div>
        <Box>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            <Icon>edit</Icon>
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="xs">
        <DialogTitle id="form-dialog-title">Create Device</DialogTitle>
        <DialogContent>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={12} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            type="text"
                            name="deviceId"
                            id="standard-basic"
                            value={deviceId || ""}
                            onChange={handleChange}
                            errorMessages={["this field is required"]}
                            label="Device Id *"
                            validators={["required"]}
                        />

                        <TextField
                            type="text"
                            name="deviceName"
                            label="Device Name *"
                            onChange={handleChange}
                            value={deviceName || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />

                        <TextField
                            type="text"
                            name="mqttIP"
                            label="MQTT IP *"
                            onChange={handleChange}
                            value={mqttIP || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />
                                                
                                                
                        <TextField
                            type="text"
                            name="mqttUserName"
                            label="MQTT User Name *"
                            onChange={handleChange}
                            value={mqttUserName || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />
                                                                        
                        <TextField
                            type="text"
                            name="mqttPassword"
                            label="MQTT Username Password *"
                            onChange={handleChange}
                            value={mqttPassword || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />

                        
                        <TextField
                            type="text"
                            name="mqttTopic"
                            label="MQTT Topic *"
                            onChange={handleChange}
                            value={mqttTopic || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />

                        
                        <TextField
                            type="text"
                            name="mqttUrl"
                            label="MQTT Url *"
                            onChange={handleChange}
                            value={mqttUrl || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />

                        <TextField
                            type="text"
                            name="mqttMacId"
                            label="MQTT Mac Id *"
                            onChange={handleChange}
                            value={mqttMacId || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />

                        <SelectValidator
                            name="status"
                            label="Status"
                            value={status}
                            onChange={handleChange}
                            validators={['required']}
                            errorMessages={['This field is required']}
                            sx={{ mb: 2, width: '100%' }}
                        >
                        {/* <MenuItem value=""> */}
                            {/* <em>None</em> */}
                        {/* </MenuItem> */}
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="InActive">InActive</MenuItem>
                        </SelectValidator>

                        <TextField
                            type="text"
                            name="mqttPort"
                            label="MQTT Port *"
                            onChange={handleChange}
                            value={mqttPort || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />
                    </Grid>
                </Grid>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button color="secondary" variant="outlined" sx={{ mr: 2 }} onClick={handleClose}>
                        {/* <Icon>send</Icon> */}
                        <Span sx={{ textTransform: "capitalize" }}>Cancel</Span>
                    </Button>
                    <Button color="primary" variant="outlined" type="submit">
                        {/* <Icon>send</Icon> */}
                        <Span sx={{ textTransform: "capitalize" }}>Update</Span>
                    </Button>
                </div>
            </ValidatorForm>
        </DialogContent>
        </Dialog>
            <Snackbar
                open={alertOpen}
                autoHideDuration={6000} // Adjust the duration as needed
                onClose={handleAlertClose}
            >
                <Alert onClose={handleAlertClose} severity={alertSeverity}>
                    {alertMessage}
                </Alert>
            </Snackbar>

        </Box>
    );
};

export default EditForm;
