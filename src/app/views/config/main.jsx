import SimpleForm from "./FlagForm"
import {
    styled
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
            <SimpleForm/>
        </Container>
    )

}


export default Main