import {
    Box, Accordion, AccordionSummary, AccordionDetails, TextField, Button, Divider,
    Snackbar,
    Alert
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

const FilterSection = ({ onFilter, onClear, filters, setFilters }) => {
    // const [filters, setFilters] = useState({
    //     device_id: '',
    //     action: '',
    //     startDate: '',
    //     endDate: '',
    // });

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        setSnackbarMessage('');
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFilter = () => {
        if (new Date(filters.endDate) <= new Date(filters.startDate)) {
            setSnackbarMessage('End Date should be greater than Start Date.');
            setOpenSnackbar(true);
            return;
        }

        let data = {};

        if (filters.device_id) data.device_id = filters.device_id;
        if (filters.log_desc) data.log_desc = filters.log_desc;
        if (filters.startDate) data.startDate = filters.startDate;
        if (filters.endDate) data.endDate = filters.endDate;

        onFilter(data);
    };

    const handleClear = () => {
        setFilters({
            device_id: '',
            log_desc: '',
            startDate: '',
            endDate: '',
        });
        onClear();
    };

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box fontWeight="bold">Filters</Box>
            </AccordionSummary>
            <AccordionDetails>
                <Box display="flex" flexDirection="column" gap={2}>
                    <Box display="flex" gap={2} mb={2}>
                        <TextField
                            label="Start Date"
                            type="date"
                            name="startDate"
                            InputLabelProps={{ shrink: true }}
                            value={filters.startDate}
                            size="small"
                            onChange={handleInputChange}
                            sx={{ width: '25%' }}  // Set uniform width
                        />
                        <TextField
                            label="End Date"
                            type="date"
                            name="endDate"
                            InputLabelProps={{ shrink: true }}
                            value={filters.endDate}
                            size="small"
                            onChange={handleInputChange}
                            sx={{ width: '25%' }}  // Set uniform width
                        />
                        <TextField
                            label="device_id"
                            name="device_id"
                            value={filters.device_id}
                            size="small"
                            onChange={handleInputChange}
                            sx={{ width: '25%' }}  // Set uniform width
                        />
                        <TextField
                            label="Action"
                            name="log_desc"
                            value={filters.log_desc}
                            size="small"
                            onChange={handleInputChange}
                            sx={{ width: '25%' }}  // Set uniform width
                        />

                    </Box>

                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button variant="contained" color="primary" onClick={handleFilter}>
                            Filter
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleClear}>
                            Clear
                        </Button>
                    </Box>
                </Box>
            </AccordionDetails>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="error">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Accordion>
    );
};

export default FilterSection;
