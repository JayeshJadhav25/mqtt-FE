import { Grid, styled } from '@mui/material';
import { Fragment, useEffect } from 'react';
import StatCards from './shared/StatCards';

const ContentBox = styled('div')(({ theme }) => ({
	margin: '30px',
	[theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Analytics = () => {
	useEffect(() => {
		const refreshDashboard = window.localStorage.getItem('refreshDashboard');

		// Check if the refreshDashboard flag is true
		if (refreshDashboard === 'true') {
			// Reload the page
			window.localStorage.setItem('refreshDashboard', 'false');
			window.localStorage.setItem('pageReloaded', 'true');
			window.location.reload();

			// Reset the refreshDashboard flag to prevent continuous reloads
		}
	}, []);

	return (
		<Fragment>
			<ContentBox className="analytics">
				<Grid container spacing={3}>
					<Grid item lg={12} md={12} sm={12} xs={12}>
						<StatCards />
					</Grid>
				</Grid>
			</ContentBox>
		</Fragment>
	);
};

export default Analytics;
