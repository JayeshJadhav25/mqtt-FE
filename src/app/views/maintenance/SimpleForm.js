import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Icon,
    Radio,
    RadioGroup,
    styled,
    Typography,
    MenuItem,
    InputLabel,
    Box,
    Select
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm, SelectValidator } from "react-material-ui-form-validator";
import axios from 'axios';

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
}));

const SimpleForm = ({ handleClose }) => {
    const [state, setState] = useState({
        date: new Date(),
        dropdown: [], // Initialize as an array for multi-selection
        dropdownOptions: [] // State to hold dropdown options
    });

    useEffect(() => {
        ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
            if (value !== state.password) return false;

            return true;
        });
        return () => ValidatorForm.removeValidationRule("isPasswordMatch");
    }, [state.password]);

    const handleSubmit = (event) => {
        // console.log("submitted");
        // console.log(event);
    };

    const handleChange = (event) => {
        // event.persist();
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const handleDateChange = (date) => setState({ ...state, date });

    useEffect(() => {
        // Custom validation rule for the dropdown

        const options = [
            { id: '1', value: 'option1', label: 'Option 1' },
            { id: '2', value: 'option2', label: 'Option 2' },
            { id: '3', value: 'option3', label: 'Option 3' }
        ];

        // Set the options and default value (first option)
        setState(prevState => ({
            ...prevState,
            dropdownOptions: options,
            dropdown: [options[0].value] // Set default value to the first option
        })); ValidatorForm.addValidationRule("isDropdownSelected", (value) => {
            if (value.length === 0) return false; // Require at least one selection
            return true;
        });
        return () => ValidatorForm.removeValidationRule("isDropdownSelected");
    }, []);

    const {
        username,
        firstName,
        creditCard,
        mobile,
        password,
        confirmPassword,
        gender,
        date,
        email,
        dropdown,
        dropdownOptions
    } = state;

    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={12} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        {/* <TextField
                            type="text"
                            name="username"
                            id="standard-basic"
                            value={username || ""}
                            onChange={handleChange}
                            errorMessages={["this field is required"]}
                            label="Username (Min length 4, Max length 9)"
                            validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
                        /> */}
                        <Box mb={2}> {/* Adds margin-bottom */}

                            <InputLabel id="dropdown-label">Device List</InputLabel>

                            <Select
                                labelId="dropdown-label"
                                name="dropdown"
                                multiple
                                value={dropdown}
                                onChange={handleChange}
                                // validators={['required']}
                                // errorMessages={['This field is required']}
                                renderValue={(selected) => (
                                    <div>
                                        {selected.map((value) => (
                                            <div key={value}>{value}</div>
                                        ))}
                                    </div>
                                )}
                                fullWidth
                            >
                                {dropdownOptions.map(option => (
                                    <MenuItem key={option.id} value={option.value}>
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
                            value={firstName || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />

                        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={date}
                                onChange={handleDateChange}
                                renderInput={(props) => (
                                    <TextField
                                        {...props}
                                        label="Date picker"
                                        id="mui-pickers-date"
                                        sx={{ mb: 2, width: "100%" }}
                                    />
                                )}
                            />
                        </LocalizationProvider> */}

                        <TextField
                            sx={{ mb: 4 }}
                            type="number"
                            name="creditCard"
                            label="Engineer Number"
                            onChange={handleChange}
                            value={creditCard || ""}
                            errorMessages={["this field is required"]}
                            validators={["required", "maxStringLength: 10"]}
                        />
                        <Typography variant="subtitle1" gutterBottom>
                            Maintenance Type
                        </Typography>
                        <RadioGroup
                            row
                            name="gender"
                            sx={{ mb: 2 }}
                            value={gender || ""}
                            onChange={handleChange}
                        >
                            <FormControlLabel
                                value="Door Panel"
                                label="Door Panel"
                                labelPlacement="end"
                                control={<Radio color="secondary" />}
                            />

                            <FormControlLabel
                                value="Door Unit"
                                label="Door Unit"
                                labelPlacement="end"
                                control={<Radio color="secondary" />}
                            />
                        </RadioGroup>
                    </Grid>

                    {/* <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            type="text"
                            name="mobile"
                            value={mobile || ""}
                            label="Mobile Nubmer"
                            onChange={handleChange}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />
                        <TextField
                            name="password"
                            type="password"
                            label="Password"
                            value={password || ""}
                            onChange={handleChange}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />
                        <TextField
                            type="password"
                            name="confirmPassword"
                            onChange={handleChange}
                            label="Confirm Password"
                            value={confirmPassword || ""}
                            validators={["required", "isPasswordMatch"]}
                            errorMessages={["this field is required", "password didn't match"]}
                        />
                        <RadioGroup
                            row
                            name="gender"
                            sx={{ mb: 2 }}
                            value={gender || ""}
                            onChange={handleChange}
                        >
                            <FormControlLabel
                                value="Male"
                                label="Male"
                                labelPlacement="end"
                                control={<Radio color="secondary" />}
                            />

                            <FormControlLabel
                                value="Female"
                                label="Female"
                                labelPlacement="end"
                                control={<Radio color="secondary" />}
                            />

                            <FormControlLabel
                                value="Others"
                                label="Others"
                                labelPlacement="end"
                                control={<Radio color="secondary" />}
                            />
                        </RadioGroup>

                        <FormControlLabel
                            control={<Checkbox />}
                            label="I have read and agree to the terms of service."
                        />
                    </Grid> */}
                </Grid>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button color="secondary" variant="outlined" sx={{ mr: 2 }} onClick={handleClose}>
                        {/* <Icon>send</Icon> */}
                        <Span sx={{ textTransform: 'none' }}>Cancel</Span>
                    </Button>
                    <Button color="primary" variant="outlined" type="submit">
                        {/* <Icon>send</Icon> */}
                        <Span sx={{ textTransform: 'none' }}>Submit</Span>
                    </Button>
                </div>
            </ValidatorForm>
        </div>
    );
};

export default SimpleForm;
