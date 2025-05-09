import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import { useTheme } from '@mui/system';
import React from 'react';
import uuid from 'react-uuid';

import {
	styled, Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow
} from '@mui/material';
import { SimpleCard } from "app/components";
import TextField from '@mui/material/TextField';
import { Formik } from 'formik';
import axios from 'axios';
import { useEffect } from 'react';

const StyledTable = styled(Table)(() => ({
	whiteSpace: 'pre',
	'& thead': {
		'& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
	},
	'& tbody': {
		'& tr': { '& td': { paddingLeft: 0, textTransform: 'none' } },
	},
}));

export default function DeviceTemp({ deviceConfigId = '', deviceId = '', receipeId = '' }) {
	const [data, setData] = React.useState({
		list: [],
	});

	const initialValues = {
		temparature: '',
		humidity: '',
		time: '',
		sendingTopic: ''
	};

	const handleFormSubmit = async (values) => {
		if (values.temparature && values.humidity && values.time) {
			await getDeviceConfigDetails();
			try {
				let obj = {
					id: uuid(),
					deviceId: deviceId,
					temperature: values.temparature,
					humidity: values.humidity,
					timeInput: values.time,
					logCount: (data.list.length + 1).toString(),
					receipeId: receipeId,
					sendingTopic: values.sendingTopic
				};
				const result = await axios.post(`${process.env.REACT_APP_API_URL}/api/createMQTTDeviceConfig`, obj);
				getDeviceConfigDetails();
			} catch (error) {
				console.log('erorr', error);
			}
		}
	}

	const getDeviceConfigDetails = () => {
		console.log('callinggetDeviceConfigDetails', deviceConfigId)
		let obj = {
			deviceId: deviceId,
			receipeId: receipeId,
		};
		axios
			.post(`${process.env.REACT_APP_API_URL}/api/getReceipeCommand`, obj)
			.then((res) => {
				setData({ list: res.data.status });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	useEffect(() => {
		console.log('here.. device temp**', receipeId, deviceId)
		if (deviceConfigId) {
			getDeviceConfigDetails();
		}
	}, [deviceConfigId]);
	return (
		<Box>
			<SimpleCard title="Device Configuration Table">
				{/* <SimpleForm />
           */}
				<Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
					{({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
						<form onSubmit={handleSubmit}>

							<TextField
								autoFocus
								margin="dense"
								id="time"
								label="Time"
								type="text"
								name="time"
								value={values.time}
								onChange={handleChange}
							// fullWidth
							/>
							{/* <HandleMargin> */}
							<TextField
								// autoFocus
								margin="dense"
								id="temparature"
								label="Temparature"
								type="text"
								name="temparature"
								value={values.temparature}
								onChange={handleChange}
							// fullWidth
							/>

							<TextField
								// autoFocus
								margin="dense"
								id="humidity"
								label="Humidity"
								type="text"
								name="humidity"
								value={values.humidity}
								onChange={handleChange}
							// fullWidth
							/>

							<TextField
								// autoFocus
								margin="dense"
								id="sendingTopic"
								label="Sending Topic"
								type="text"
								name="sendingTopic"
								value={values.sendingTopic}
								onChange={handleChange}
							// fullWidth
							/>

							<Button type="submit" onClick={handleFormSubmit} color="primary">
								Create
							</Button>
							{/* </HandleMargin> */}

						</form>
					)}
				</Formik>

				<Box width="50%" overflow="auto">
					<StyledTable>
						<TableHead>
							<TableRow>
								<TableCell align="center">Time</TableCell>
								<TableCell align="center">Temparature</TableCell>
								<TableCell align="center">Humidity</TableCell>
								{/* <TableCell align="center">Action</TableCell> */}
							</TableRow>
						</TableHead>
						<TableBody>
							{data.list.
								map((dataList, index) => (
									<TableRow key={index}>
										<TableCell align="center">{dataList.timeInput}</TableCell>
										<TableCell align="center">{dataList.temperature}</TableCell>
										<TableCell align="center">{dataList.humidity}</TableCell>
										{/* <TableCell align="center">{dataList.timeInput}</TableCell> */}

									</TableRow>
								))}

						</TableBody>
					</StyledTable>
				</Box>
			</SimpleCard>
		</Box>
	);
}
