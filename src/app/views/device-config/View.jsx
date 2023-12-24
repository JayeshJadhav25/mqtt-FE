import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/system';
import { H6 } from 'app/components/Typography';
import React from 'react';
import uuid from 'react-uuid';

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { styled } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

import { Icon,styled,Fab,Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow } from '@mui/material';
import { Breadcrumb, SimpleCard } from "app/components";
import TextField from '@mui/material/TextField';
import { Formik } from 'formik';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DeviceTemp from './DeviceTemp';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AccordionRoot = styled("div")(({ theme }) => ({
    width: "100%",
    "& .heading": {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));
  
const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
  },
}));

export default function ViewDetail({deviceConfigId='',deviceId=''}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({
    list: [],
  });

  function handleClickOpen() {
    setOpen(true);
  }

  const initialValues = {
    temparature: '',
    humidity: '',
    receipeName:'',
    receipeStatus:''
  };
  
  function handleClose() {
    setOpen(false);
  }

  const handleFormSubmit = async (values) => {
    console.log('handlesubmit',values,deviceId);
    if(values.receipeName && values.receipeStatus) {
      await getDeviceConfigDetails();
        try {
          let obj = {
            "id": uuid(),
            "deviceId":deviceId,
            "receipeName": values.receipeName,
            "receipeStatus":values.receipeStatus
        };
          const result = await axios.post('http://127.0.0.1:4330/api/createReceipeData', obj);
          getDeviceConfigDetails();
        } catch (error) {
          console.log('erorr', error);
        }
    }
  }

  const getDeviceConfigDetails = () => {
    console.log('callinggetDeviceConfigDetails',deviceConfigId)
    let obj = {
        deviceId: deviceId,
    };
    axios
    .post('http://127.0.0.1:4330/api/getReceipeData',obj)
    .then((res) => {
      setData({ list: res.data.status });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  // const TextField = styled(TextField)(() => ({
  //   // width: 200,
  //   // marginRight: '0px',
  // }));
  useEffect(() => {
    if(deviceConfigId) {
      getDeviceConfigDetails();
    }
  }, [deviceConfigId]);
  return (
    <Box>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {/* <Icon fontSize="small">visibility</Icon> */}
        View
      </Button>

      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            {/* <H6 sx={{ flex: 1, marginLeft: theme.spacing(2) }}>Sound</H6> */}
            {/* <Button color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>

        <SimpleCard title="Device Configuration Table">
          {/* <SimpleForm />
           */}
        <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>

                <TextField
                  autoFocus
                  margin="dense"
                  id="receipeName"
                  label="Receipe Name"
                  type="text"
                  name="receipeName"
                  value={values.receipeName}
                  onChange={handleChange}
                  // fullWidth
                />
                {/* <HandleMargin> */}
                <TextField
                  // autoFocus
                  margin="dense"
                  id="receipeStatus"
                  label="Receipe Status"
                  type="text"
                  name="receipeStatus"
                  value={values.receipeStatus}
                  onChange={handleChange}
                  // fullWidth
                />
                
                {/* <TextField
                  // autoFocus
                  margin="dense"
                  id="humidity"
                  label="Humidity"
                  type="text"
                  name="humidity"
                  value={values.humidity}
                  onChange={handleChange}
                  // fullWidth
                /> */}
{/* 
                <TextField
                  // autoFocus
                  margin="dense"
                  id="sendingTopic"
                  label="Sending Topic"
                  type="text"
                  name="sendingTopic"
                  value={values.sendingTopic}
                  onChange={handleChange}
                  // fullWidth
                /> */}

              {/* <Fab color="secondary" onClick={handleFormSubmit} aria-label="Add" className="button">
                <Icon>add</Icon>
              </Fab> */}
              <Button type="submit" onClick={handleFormSubmit} color="primary">
                  Create
                </Button>
           {/* </HandleMargin> */}

           </form>
          )}
           </Formik>

        <Box width="50%" overflow="auto">
          <StyledTable>
            {/* <TableHead> */}
              {/* <TableRow> */}
              {/* <TableCell align="center">Receipe Name</TableCell> */}
              {/* <TableCell align="center">Temparature</TableCell> */}
              {/* <TableCell align="center">Humidity</TableCell> */}
              {/* <TableCell align="center">Action</TableCell> */}
              {/* </TableRow>
            </TableHead> */}
            {/* <TableBody>
              {data.list.
                map((dataList, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{dataList.receipeName}</TableCell> */}
                    {/* <TableCell align="center">{dataList.temperature}</TableCell> */}
                    {/* <TableCell align="center">{dataList.humidity}</TableCell> */}
                    {/* <TableCell align="center">{dataList.timeInput}</TableCell> */}

                  {/* </TableRow> */}
                {/* ))} */}

            {/* </TableBody> */}
        <AccordionRoot>
        
            {data.list.
                map((dataList, index) => (
                    <Accordion>
                        <AccordionSummary
                        id="panel1a-header"
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        >
                        <Typography className="heading">{dataList.receipeName}</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                        <Typography>
                            < DeviceTemp />
                            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, */}
                            {/* sit amet blandit leo lobortis eget. */}
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </AccordionRoot>
          </StyledTable>
        </Box>
        {/* <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>

          <Divider />

          <ListItem button>
            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
          </ListItem>
        </List> */}
        </SimpleCard>

      </Dialog>
    </Box>
  );
}
