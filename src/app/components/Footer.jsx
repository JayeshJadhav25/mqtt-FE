import { AppBar, ThemeProvider } from '@mui/material';
import { useTheme } from '@mui/system';
import useSettings from 'app/hooks/useSettings';

const Footer = () => {
	const theme = useTheme();
	const { settings } = useSettings();

	const footerTheme = settings.themes[settings.footer.theme] || theme;

	return (
		<ThemeProvider theme={footerTheme}>
			<AppBar color="primary" position="static" sx={{ zIndex: 96 }}>

			</AppBar>
		</ThemeProvider>
	);
};

export default Footer;
