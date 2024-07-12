import React, { useState } from 'react'
import { Container, MenuItem, Menu, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import { Link as RouterLink } from 'react-router-dom';

export default function Navigation() {
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<>
			<IconButton
				size="large"
				edge="start"
				color="inherit"
				aria-label="menu"
				aria-controls={open ? 'basic-menu' : undefined}
				onClick={handleClick}
				sx={{ mr: 2 }}
			>
			<MenuIcon />
		  </IconButton>
		  <Menu
			id="basic-menu"
			anchorEl={anchorEl}
			open={open}
			onClose={handleClose}
		  >
			<MenuItem component={RouterLink} to="/" onClick={handleClose}>Home</MenuItem>
			<MenuItem component={RouterLink} to="/classes" onClick={handleClose}>Classes</MenuItem>
			<MenuItem component={RouterLink} to="/students" onClick={handleClose}>Students</MenuItem>
		  </Menu>
		</>
	)
}