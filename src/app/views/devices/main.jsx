import CreateForm from './CreateForm';
import PaginationTable from './PaginationTable';
import { useState, useEffect } from "react";
import { Box, styled, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { SimpleCard } from 'app/components';
import axiosInstance from '../../../axiosInterceptor';
import jsQR from 'jsqr';
import QrCodeScanner from './QrCodeScanner'; // Assuming SimpleForm is in the same directory
import QrCodeIcon from '@mui/icons-material/QrCode';

const Container = styled('div')(({ theme }) => ({
	margin: '30px',
	[theme.breakpoints.down('sm')]: { margin: '16px' },
	'& .breadcrumb': {
		marginBottom: '30px',
		[theme.breakpoints.down('sm')]: { marginBottom: '16px' },
	},
}));

const accessLevel = window.localStorage.getItem('accessLevel');

const Main = () => {
	const [data, setData] = useState([]);
	const [isQrDialogOpen, setIsQrDialogOpen] = useState(false);
	const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
	const [prefilledData, setPrefilledData] = useState(null); // State to store prefilled data for the form
	const [qrError, setQrError] = useState('');

	const fetchData = async () => {
		try {
			const response = await axiosInstance.post(`/getMQTTDevice`);
			setData(response.data.status);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleQrUpload = async (event) => {
		const file = event.target.files[0];
		if (!file) return;

		const reader = new FileReader();

		reader.onload = (e) => {
			const img = new Image();
			img.src = e.target.result;

			img.onload = () => {
				const canvas = document.createElement('canvas');
				const context = canvas.getContext('2d');

				canvas.width = img.width;
				canvas.height = img.height;
				context.drawImage(img, 0, 0, canvas.width, canvas.height);

				const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
				const code = jsQR(imageData.data, imageData.width, imageData.height);

				if (code) {
					try {
						const qrData = JSON.parse(code.data); // Assuming the QR data is JSON formatted
						console.log('qrData', qrData);
						setPrefilledData(qrData); // Store the scanned QR data
						setQrError('');
						setIsQrDialogOpen(false);
						setIsFormDialogOpen(true); // Open the form dialog with prefilled data
					} catch (err) {
						setQrError('Invalid QR data format. Please try again.');
					}
				} else {
					setQrError('QR Code not recognized. Please try again.');
				}
			};
		};

		reader.readAsDataURL(file);
	};

	return (
		<Container>
			{(accessLevel == 1 || accessLevel == 2) && (
				<Box
					className="breadcrumb"
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 2, // Space between items
						flexWrap: 'nowrap', // Prevent wrapping to the next line
					}}
				>
					{accessLevel == 1 && <CreateForm fetchData={fetchData} />}
					<Button
						variant="contained"
						color="primary"
						onClick={() => setIsQrDialogOpen(true)}
						startIcon={<QrCodeIcon />}
					>
						Create Using QR
					</Button>
				</Box>
			)}



			<SimpleCard title="Devices">
				<PaginationTable data={data} fetchData={fetchData} setData={setData} />
			</SimpleCard>

			{/* QR Dialog */}
			<Dialog open={isQrDialogOpen} onClose={() => setIsQrDialogOpen(false)} fullWidth maxWidth="sm">
				<DialogTitle>Upload QR Code</DialogTitle>
				<DialogContent>
					<TextField
						type="file"
						inputProps={{ accept: 'image/*' }}
						onChange={handleQrUpload}
						fullWidth
					/>
					{qrError && <p style={{ color: 'red' }}>{qrError}</p>}
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setIsQrDialogOpen(false)}>Cancel</Button>
				</DialogActions>
			</Dialog>

			{/* Form Dialog */}
			<Dialog open={isFormDialogOpen} onClose={() => setIsFormDialogOpen(false)} fullWidth maxWidth="sm">
				<DialogTitle>Prefilled QR Device Form</DialogTitle>
				<DialogContent>
					<QrCodeScanner
						handleClose={() => setIsFormDialogOpen(false)}
						fetchData={fetchData}
						prefilledData={prefilledData} // Pass prefilled data to the form
					/>
				</DialogContent>
			</Dialog>
		</Container>
	);
};

export default Main;
