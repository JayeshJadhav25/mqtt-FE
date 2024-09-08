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

    useEffect(() => {
        // Custom validation for no numbers
        ValidatorForm.addValidationRule("isNameValid", (value) => {
          const noNumbers = /^[A-Za-z\s]+$/;
          return noNumbers.test(value);
        });
    
        // Custom validation to prevent only special characters
        ValidatorForm.addValidationRule("noSpecialCharsOnly", (value) => {
          const noSpecialCharsOnly = /[A-Za-z0-9]/;
          return noSpecialCharsOnly.test(value);
        });
    
        // Custom validation for no leading/trailing spaces
        ValidatorForm.addValidationRule("noLeadingOrTrailingSpaces", (value) => {
          return value.trim() === value;
        });
    
        // Custom validation to prevent emojis
        ValidatorForm.addValidationRule("noEmojis", (value) => {
          const emojiPattern =
            /[\u{1F600}-\u{1F6FF}|\u{2600}-\u{26FF}|\u{2700}-\u{27BF}|\u{1F900}-\u{1F9FF}]/u;
          return !emojiPattern.test(value);
        });

        ValidatorForm.addValidationRule("noSpaces", (value) => {
            return !/\s/.test(value); // Check if the value contains any spaces
          });

        ValidatorForm.addValidationRule("noHTMLTags", (value) => {
          const htmlTagPattern = /<\/?[a-z][\s\S]*>/i; // Regex pattern to check for HTML tags
          return !htmlTagPattern.test(value);
        });

        // ValidatorForm.addValidationRule("noRestrictedKeywords", (value) => {
        //     return !restrictedKeywords.some((keyword) => value.toLowerCase().includes(keyword));
        // });

        ValidatorForm.addValidationRule("maxEmailLength", (value) => {
            return value.length <= 100; // Max length set to 100 characters
          });
        
          // Custom validation for email domain length
        ValidatorForm.addValidationRule("maxDomainLength", (value) => {
          const domain = value.split("@")[1]; // Get domain part after "@"
          return domain && domain.length <= 50; // Max domain length set to 50 characters
        });

         // Custom validation for valid domain
        ValidatorForm.addValidationRule("validDomain", (value) => {
          const domainPattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Regex to check valid domain format
          const domain = value.split("@")[1];
          return domain && domainPattern.test(domain); 
        });

     // Custom validation for no spaces as prefix or suffix in email
        ValidatorForm.addValidationRule("noPrefixSuffixSpaces", (value) => {
          return value.trim() === value; // Check if trimmed value is the same
        });

          // Custom validation for required character formats (e.g., one uppercase, one lowercase, one digit, one special character)
        ValidatorForm.addValidationRule("requiredCharFormat", (value) => {
          const charFormatPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/;
          return charFormatPattern.test(value);
        });

      }, []);

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
                            validators={[
                                "required", "minStringLength:3", "maxStringLength:50",
                                "isNameValid",
                                "noSpecialCharsOnly",
                                "noLeadingOrTrailingSpaces",
                                "noEmojis",
                            ]}
                            errorMessages={[
                                "This field is required",
                                "Minimum 3 characters", 
                                "Maximum 50 characters",
                                "Name should not contain numbers",
                                "Name should not contain only special characters",
                                "No leading or trailing spaces allowed",
                                "Name should not contain emojis",
                            ]}
                        />

                        <TextField
                            sx={{ mb: 2 }}
                            type="text"
                            name="userName"
                            label="UserName *"
                            onChange={handleChange}
                            value={userName}
                            validators={[
                                "required",
                                "minStringLength:3", 
                                "maxStringLength:50",
                                "noSpaces",
                                "noHTMLTags",
                                "noEmojis",
                                // "noRestrictedKeywords"
                            ]}
                            errorMessages={[
                                "This field is required",
                                "Minimum 3 characters", 
                                "Maximum 50 characters",
                                "Username should not contain any spaces",
                                "Username should not contain HTML tags",
                                "Username should not contain emojis",
                                // "Username contains restricted keywords",
                            ]}
                        />

                        <TextField
                            sx={{ mb: 2 }}
                            type="email"
                            name="email"
                            label="Email *"
                            onChange={handleChange}
                            value={email}
                            validators={[   
                                "required", 
                                "isEmail",
                                "maxEmailLength", 
                                "maxDomainLength", 
                                "validDomain", 
                                "noPrefixSuffixSpaces"
                            ]}
                            errorMessages={[
                                "This field is required", 
                                "Email is not valid",
                                "Email is too long", 
                                "Email domain is too long", 
                                "Email domain is invalid",
                                "Email cannot have leading or trailing spaces"
                            ]}
                        />

                        <TextField
                            sx={{ mb: 2 }}
                            type="text"
                            name="password"
                            label="Password *"
                            onChange={handleChange}
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
