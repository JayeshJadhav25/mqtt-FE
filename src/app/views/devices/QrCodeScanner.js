import React, { useState, useEffect } from "react";
import {
    Button,
    Grid,
    Snackbar,
    Alert,
    styled,
} from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Span } from "app/components/Typography";
import uuid from "react-uuid";
import axiosInstance from "../../../axiosInterceptor";

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
}));

const QrCodeScanner = ({ handleClose, fetchData, prefilledData }) => {
    const [state, setState] = useState({
        deviceId: "",
        deviceName: "",
        mqttIP: "",
        mqttUserName: "",
        mqttPassword: "",
        mqttMacId: "",
        mqttPort: "",
        mqttAliasName: ""
    });

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");

    // Prefill the form when `prefilledData` changes
    useEffect(() => {
        console.log('prefilledData', prefilledData);
        if (prefilledData) {
            setState({
                ...state,
                deviceId: prefilledData.deviceId || "",
                deviceName: prefilledData.deviceName || "",
                mqttIP: prefilledData.mqttIP || "",
                mqttUserName: prefilledData.mqttUserName || "",
                mqttPassword: prefilledData.mqttPassword || "",
                mqttMacId: prefilledData.mqttMacId || "",
                mqttPort: prefilledData.mqttPort || "",
                mqttAliasName: prefilledData.mqttAliasName || "",
            });
        }
    }, [prefilledData]);

    const handleAlertClose = () => setAlertOpen(false);

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updatedFormData = {
                ...state,
                id: uuid(),
            };
            await axiosInstance.post(`/createMQTTDevice`, updatedFormData);
            setAlertMessage("Device created successfully!");
            setAlertSeverity("success");
            fetchData();
            setTimeout(() => {
                handleClose();
            }, 1000);
        } catch (error) {
            console.error("Error:", error);
            setAlertMessage(error.response?.data?.msg || "Something went wrong");
            setAlertSeverity("error");
        } finally {
            setAlertOpen(true);
        }
    };

    const {
        deviceId,
        deviceName,
        mqttIP,
        mqttUserName,
        mqttPassword,
        mqttMacId,
        mqttPort,
        mqttAliasName
    } = state;

    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={12} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            type="text"
                            name="deviceId"
                            value={deviceId}
                            onChange={handleChange}
                            label="Device ID *"
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            disabled
                        />
                        <TextField
                            type="text"
                            name="deviceName"
                            value={deviceName}
                            onChange={handleChange}
                            label="Device Name *"
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            disabled
                        />
                        <TextField
                            type="text"
                            name="mqttIP"
                            value={mqttIP}
                            onChange={handleChange}
                            label="MQTT IP *"
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            disabled
                        />
                        <TextField
                            type="text"
                            name="mqttUserName"
                            value={mqttUserName}
                            onChange={handleChange}
                            label="MQTT Username"
                            disabled
                        />
                        <TextField
                            type="text"
                            name="mqttPassword"
                            value={mqttPassword}
                            onChange={handleChange}
                            label="MQTT Password"
                            disabled
                        />
                        <TextField
                            type="text"
                            name="mqttMacId"
                            value={mqttMacId}
                            onChange={handleChange}
                            label="MQTT MAC ID *"
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            disabled
                        />
                        <TextField
                            type="text"
                            name="mqttPort"
                            value={mqttPort}
                            onChange={handleChange}
                            label="MQTT Port *"
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            disabled
                        />
                        <TextField
                            type="text"
                            name="mqttAliasName"
                            value={mqttAliasName}
                            onChange={handleChange}
                            label="MQTT Alias "
                            disabled
                        />
                    </Grid>
                </Grid>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button color="secondary" variant="outlined" sx={{ mr: 2 }} onClick={handleClose}>
                        <Span sx={{ textTransform: "none" }}>Cancel</Span>
                    </Button>
                    <Button color="primary" variant="outlined" type="submit">
                        <Span sx={{ textTransform: "none" }}>Submit</Span>
                    </Button>
                </div>
            </ValidatorForm>

            <Snackbar
                open={alertOpen}
                autoHideDuration={6000}
                onClose={handleAlertClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={handleAlertClose} severity={alertSeverity}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default QrCodeScanner;
