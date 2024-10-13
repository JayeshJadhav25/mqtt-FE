
import { Box, Icon, Autocomplete, styled } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import axiosInstance from '../../../axiosInterceptor';

export default function Download({ device_id, log_desc, startDate, endDate }) {

    async function handleDownload() {
        try {
            let data = {
                log_type: 'Door'
            };

            if (device_id) data.device_id = device_id;
            if (log_desc) data.log_desc = log_desc;
            if (startDate) data.startDate = startDate;
            if (endDate) data.endDate = endDate;

            const result = await axiosInstance.post(`/downloadLogger`, data);
            // getData();
            if (result && result.data && result.data.download) {
                let fileUrl = result.data.download;
                const link = document.createElement('a');
                link.href = fileUrl;
                link.download = 'data.csv';

                // Trigger a click event to download the file
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

            }
        } catch (error) {
            console.log('error', error);
        }
    }
    return (
        <Box>
            <Button variant="outlined" color="primary" onClick={handleDownload}>
                <Icon>download</Icon> Download
            </Button>
        </Box>
    )
}