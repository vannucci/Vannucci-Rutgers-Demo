import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react'
import { Container, MenuItem, Menu, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Navigation from './Navigation'

const defaultTheme = createTheme();

export default function TopNav({children}) {
	return (
		<ThemeProvider theme={defaultTheme}>
			<Container component="main" maxWidth="false">
				<CssBaseline />
				<Box sx={{ flexGrow: 1 }}>
				  <AppBar position="static">
					<Toolbar>
						<Navigation />
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							Mike Vannucci Demo App
						</Typography>
					</Toolbar>
				  </AppBar>
				</Box>
				<Box>
					{children}
				</Box>
			</Container>
		</ThemeProvider>
	);
}
