import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/styled-engine';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
	<StyledEngineProvider injectFirst>
		<BrowserRouter>
			<CssBaseline />
			<App />
		</BrowserRouter>
	</StyledEngineProvider>
);

// Optional: register service worker if needed
serviceWorker.unregister();
