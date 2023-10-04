import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, Chip, Divider, Grid,styled as st, Autocomplete } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const AccordionRoot = styled(Box)(({ theme }) => ({
  width: "100%",
  "& .heading": { fontSize: theme.typography.pxToRem(15) },
  "& .secondaryHeading": {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(15),
  },
  "& .icon": {
    width: 20,
    height: 20,
    verticalAlign: "bottom",
  },
  "& .details": { alignItems: "center" },
  "& .column": { flexBasis: "33.33%" },
  "& .helper": {
    padding: theme.spacing(1, 2),
    borderLeft: `2px solid ${theme.palette.divider}`,
  },
  "& .link": {
    textDecoration: "none",
    color: theme.palette.primary.main,
    "&:hover": { textDecoration: "underline" },
  },
}));

const suggestions = [
    { label: 'Active' },
    { label: 'InActive' },
]

const accessLevelList = [
    { label: 'Admin' },
    { label: 'Supervisor' },
]



const AutoComplete = st(Autocomplete)(() => ({
    width: 200,
    // marginBottom: '16px',
  }));
export default function DetailedExpansionPanel() {

    const [value, setValue] = useState(null);
    const [access, setAccessLevel] = useState(null);

    const handleChangeDrop = (_, newValue) => {
        console.log('handleChange',newValue)
        if (newValue && newValue.inputValue) {
          setValue({ label: newValue.inputValue });
          return;
        }
        setValue(newValue);
    };

    const handleAccess = (_, newValue) => {
        console.log('handleChange',newValue)
        if (newValue && newValue.inputValue) {
            setAccessLevel({ label: newValue.inputValue });
          return;
        }
        setAccessLevel(newValue);
    };

  return (
    <AccordionRoot>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <Box className="column">
          <TextField
                //   autoFocus
                  margin="dense"
                  id="username"
                  label="Username"
                  type="text"
                  name="username"
                //   value={values.name}
                //   onChange={handleChange}
                //   fullWidth
                />
          </Box>

          <Box className="column">
                <AutoComplete
                  value={value}
                  options={suggestions}
                  // defaultValue={{label:value}}
                  onChange={handleChangeDrop}
                  getOptionLabel={(option) => {
                    console.log('option',option)
                    return  option.label;
                  }}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      margin="dense" 
                      label="Status" 
                      variant="outlined" 
                      // name="status"
                      // value={values.status}
                      />
                  )}
                />
            </Box>

          <Box className="column">
          <AutoComplete
                  value={access}
                  options={accessLevelList}
                  // defaultValue={{label:value}}
                  onChange={handleAccess}
                  getOptionLabel={(option) => {
                    console.log('option',option)
                    return  option.label;
                  }}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      margin="dense" 
                      label="Access Level" 
                      variant="outlined" 
                      // name="status"
                      // value={values.status}
                      />
                  )}
                />
            </Box>

          <Box className="column">
          <TextField
                //   autoFocus
                  margin="dense"
                  id="email"
                  label="Email"
                  type="text"
                  name="email"
                //   value={values.name}
                //   onChange={handleChange}
                //   fullWidth
                />                    
            </Box>
        </AccordionSummary>

        {/* <AccordionDetails width="40%">
          <Box className="column" />
          <Box className="column">
            <Chip label="Barbados" onDelete={() => {}} />
            <Typography className="heading">Username</Typography>
            <Typography className="heading">Username</Typography>

          </Box>

          <Box className="column helper">
            <Typography variant="caption">
              Select your destination of choice
              <br />
              <a href="#sub-labels-and-columns" className="link">
                Learn more
              </a>
            </Typography>
          </Box>
        </AccordionDetails> */}
        {/* <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                AccessLevel
            </Grid>
        </Grid> */}


        <Divider />

        <AccordionActions>
          <Button size="small">Clear</Button>
          <Button size="small" color="primary">
            Filter
          </Button>
        </AccordionActions>
      </Accordion>
    </AccordionRoot>
  );
}
