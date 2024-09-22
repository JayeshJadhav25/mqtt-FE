
import { Box, Icon, Autocomplete, styled } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import axiosInstance from '../../../axiosInterceptor';

export default function Download({ username, moduleName, startDate, endDate, operation, status }) {

    async function handleDownload() {
        try {
            let data = {};

            if (username) data.userName = username;
            if (moduleName) data.moduleName = moduleName;
            if (startDate) data.startDate = startDate;
            if (endDate) data.endDate = endDate;
            if (operation) data.operation = operation;
            if (status) data.status = status;

            const result = await axiosInstance.post(`/downloadAuditLog`, data);
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