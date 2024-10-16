
import { Box, Icon } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import SimpleForm from './SimpleForm';

export default function FormDialog({ fetchData }) {
	const [open, setOpen] = React.useState(false);

	function handleClickOpen() {
		setOpen(true);
	}

	function handleClose() {
		setOpen(false);
	}

	return (
		<Box>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				<Icon>add</Icon>Create
			</Button>

			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="sm"
				sx={{
					'& .MuiDialog-paper': {
						maxHeight: '110vh', // Set the max height to 80% of the viewport height
						overflowY: 'auto',  // Enable scrolling if content exceeds maxHeight
					},
				}}>
				<DialogTitle id="form-dialog-title">Create User</DialogTitle>
				<DialogContent>
					<SimpleForm handleClose={handleClose} fetchData={fetchData}></SimpleForm>
				</DialogContent>
			</Dialog>
		</Box>
	);
}
