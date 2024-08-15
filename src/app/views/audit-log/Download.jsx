
import { Box, Icon, Autocomplete, styled } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function Download() {

    async function handleDownload() {
        try {
            const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/downloadAuditLog`);
            // getData();
            if(result && result.data && result.data.download) {
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