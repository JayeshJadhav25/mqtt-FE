import CreateForm from './CreateForm';
import SimpleForm from './SimpleForm';
import PaginationTable from './PaginationTable';
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

import { Breadcrumb, SimpleCard } from 'app/components';

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
        <SimpleCard title="Maintenance">

          <PaginationTable/>
        </SimpleCard>
        </Container>
    )
}

export default Main;
