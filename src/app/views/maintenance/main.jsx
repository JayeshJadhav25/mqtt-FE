import CreateForm from './CreateForm';
import SimpleForm from './SimpleForm';
import {
    Box,
    Icon,
    IconButton,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
  } from '@mui/material';

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
      marginBottom: '30px',
      [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
    },
  }));



const Main = () => {
    return (
        <Container>
        <Box className="breadcrumb">
            {/* <SimpleForm /> */}
            <CreateForm />

        {/* <Breadcrumb routeSegments={[{ name: "Material", path: "/material" }, { name: "Table" }]} /> */}
        </Box>
        <Box className="breadcrumb">
          {/* <CreateForm getData={getData} /> */}
          {/* <Breadcrumb routeSegments={[{ name: "Material", path: "/material" }, { name: "Table" }]} /> */}
        </Box>
        </Container>
    )
}

export default Main;
