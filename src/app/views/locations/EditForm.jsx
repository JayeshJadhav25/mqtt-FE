import React, { useState, useEffect } from 'react';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import axiosInstance from '../../../axiosInterceptor';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";

const EditForm = ({ data, onClose, fetchData }) => {
    const [formData, setFormData] = useState({ ...data });

    const [state, setState] = useState({
        domesticCosts: [],
        commercialCosts: []
    });

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

    useEffect(() => {
        setFormData({ ...data });
        setState({
            domesticCosts: [
                data.consumptionSlab?.domestic?.["0-100"] || 0,
                data.consumptionSlab?.domestic?.["101-300"] || 0,
                data.consumptionSlab?.domestic?.["301-500"] || 0,
                data.consumptionSlab?.domestic?.["above500"] || 0
            ],
            commercialCosts: [
                data.consumptionSlab?.commercial?.["0-100"] || 0,
                data.consumptionSlab?.commercial?.["101-300"] || 0,
                data.consumptionSlab?.commercial?.["301-500"] || 0,
                data.consumptionSlab?.commercial?.["above500"] || 0
            ]
        });
    }, [data]);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const handleCostChange = (type, index, value) => {
        const updatedCosts = [...state[type]];
        updatedCosts[index] = parseFloat(value) || 0;
        setState((prevState) => ({ ...prevState, [type]: updatedCosts }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updatedData = {
                ...formData,
                consumptionSlab: {
                    domestic: {
                        "0-100": state.domesticCosts[0],
                        "101-300": state.domesticCosts[1],
                        "301-500": state.domesticCosts[2],
                        "above500": state.domesticCosts[3],
                    },
                    commercial: {
                        "0-100": state.commercialCosts[0],
                        "101-300": state.commercialCosts[1],
                        "301-500": state.commercialCosts[2],
                        "above500": state.commercialCosts[3],
                    },
                },
            };

            await axiosInstance.post(`/updateMQTTLocation`, updatedData);
            fetchData();
            setAlertMessage('Location Updated successfully!');
            setAlertSeverity('success');
            setTimeout(() => onClose(), 1000);
        } catch (error) {
            setAlertMessage(error.response?.data?.msg || 'Something Went Wrong');
            setAlertSeverity('error');
            console.error("Error updating data:", error);
        } finally {
            setAlertOpen(true);
        }
    };

    const renderTable = (title, costs, type) => (
        <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
            <h4>{title}</h4>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Units</TableCell>
                        <TableCell>Cost</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {['0-100', '101-300', '301-500', 'Above 500'].map((range, index) => (
                        <TableRow key={index}>
                            <TableCell>{range}</TableCell>
                            <TableCell>
                                <TextField
                                    type="number"
                                    value={costs[index]}
                                    onChange={(e) => handleCostChange(type, index, e.target.value)}
                                    inputProps={{ min: 0 }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                name="locationName"
                label="Location"
                value={formData.locationName || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />

            {renderTable('Domestic', state.domesticCosts, 'domesticCosts')}
            {renderTable('Commercial', state.commercialCosts, 'commercialCosts')}

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

export default EditForm;
