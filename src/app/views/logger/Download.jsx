
import { Box, Icon, Autocomplete, styled } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function Download({ deviceId, deviceName, logType, startDate, endDate }) {

    async function handleDownload() {
        console.log('downoading...')
        try {
            let data = {};

            if (deviceId) {
                data.device_id = deviceId;
            }

            if (deviceName) {
                data.device_name = deviceName;
            }

            if (logType) {
                data.log_type = logType;
            }

            if (startDate) {
                data.startDate = startDate;
            }

            if (endDate) {
                data.endDate = endDate;
            }
            const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/downloadLogger`, data);
            console.log('result', result);
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