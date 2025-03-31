import {
    Button,
    Grid,
    Snackbar,
    Alert,
    TextField as MuiTextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { styled } from '@mui/material/styles';
import axiosInstance from '../../../axiosInterceptor';
import uuid from 'react-uuid';

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
}));

const SimpleForm = ({ handleClose, fetchData }) => {
    const [state, setState] = useState({
        location: '',
        domesticCosts: [0, 0, 0, 0],
        commercialCosts: [0, 0, 0, 0]
    });

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const requestBody = {
            id: uuid(),
            locationName: state.location,
            consumptionSlab: {
                domestic: {
                    '0-100': state.domesticCosts[0],
                    '101-300': state.domesticCosts[1],
                    '301-500': state.domesticCosts[2],
                    'above500': state.domesticCosts[3]
                },
                commercial: {
                    '0-100': state.commercialCosts[0],
                    '101-300': state.commercialCosts[1],
                    '301-500': state.commercialCosts[2],
                    'above500': state.commercialCosts[3]
                }
            }
        };

        axiosInstance.post(`/createMQTTLocation`, requestBody)
            .then(response => {
                setAlertMessage('Location and costs submitted successfully!');
                setAlertSeverity('success');
                fetchData();
                setTimeout(() => {
                    handleClose();
                }, 1000);
            })
            .catch(error => {
                setAlertMessage(error.response?.data?.msg || 'Something went wrong');
                setAlertSeverity('error');
            })
            .finally(() => {
                setAlertOpen(true);
            });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCostChange = (type, index, value) => {
        const updatedCosts = [...state[type]];
        updatedCosts[index] = parseFloat(value) || 0;
        setState(prevState => ({ ...prevState, [type]: updatedCosts }));
    };

    const { location, domesticCosts, commercialCosts } = state;

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
                                <MuiTextField
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
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={12} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            type="text"
                            name="location"
                            label="Location"
                            onChange={handleChange}
                            value={location}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                        />
                    </Grid>
                </Grid>

                {renderTable('Domestic', domesticCosts, 'domesticCosts')}
                {renderTable('Commercial', commercialCosts, 'commercialCosts')}

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
