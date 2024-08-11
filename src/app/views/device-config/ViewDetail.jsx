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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'none' } },
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
    time:'',
    sendingTopic:''
  };
  
  function handleClose() {
    setOpen(false);
  }
  console.log('view Details..',deviceConfigId,deviceId)
  const handleFormSubmit = async (values) => {
    console.log('handlesubmit',values,deviceId);
    if(values.temparature && values.humidity && values.time) {
      await getDeviceConfigDetails();
        try {
          let obj = {
            id: uuid(),
            deviceId:deviceId,
            temperature: values.temparature,
            humidity: values.humidity,
            timeInput:values.time,
            logCount:(data.list.length + 1).toString(),
            sendingTopic:values.sendingTopic
          };
          const result = await axios.post('http://127.0.0.1:4330/api/createMQTTDeviceConfig', obj);
          getDeviceConfigDetails();
        } catch (error) {
          console.log('erorr', error);
        }
    }
  }

  const getDeviceConfigDetails = () => {
    console.log('callinggetDeviceConfigDetails',deviceConfigId)
    let obj = {
      id: deviceConfigId,
    };
    axios
    .post('http://127.0.0.1:4330/api/getMQTTDeviceConfig',obj)
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
                  id="time"
                  label="Time"
                  type="text"
                  name="time"
                  value={values.time}
                  onChange={handleChange}
                  // fullWidth
                />
                {/* <HandleMargin> */}
                <TextField
                  // autoFocus
                  margin="dense"
                  id="temparature"
                  label="Temparature"
                  type="text"
                  name="temparature"
                  value={values.temparature}
                  onChange={handleChange}
                  // fullWidth
                />
                
                <TextField
                  // autoFocus
                  margin="dense"
                  id="humidity"
                  label="Humidity"
                  type="text"
                  name="humidity"
                  value={values.humidity}
                  onChange={handleChange}
                  // fullWidth
                />

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
                />

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
            <TableHead>
              <TableRow>
              <TableCell align="center">Time</TableCell>
              <TableCell align="center">Temparature</TableCell>
              <TableCell align="center">Humidity</TableCell>
              {/* <TableCell align="center">Action</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.list.
                map((dataList, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{dataList.timeInput}</TableCell>
                    <TableCell align="center">{dataList.temperature}</TableCell>
                    <TableCell align="center">{dataList.humidity}</TableCell>
                    {/* <TableCell align="center">{dataList.timeInput}</TableCell> */}

                  </TableRow>
                ))}

            </TableBody>
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
