import React from 'react'
import { useCallback} from "react"
import { Link } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material';


export function SplashPage() {
  return (
	<Box>
		<Box
		  sx={{
			marginTop: 8,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		  }}
		>
		  <Typography component="h1" variant="h5">
			Mike Vannucci Demo App
		  </Typography>
		</Box>
		<Box>
			<Button component={Link} to="/classes">Classes</Button>
			<Button component={Link} to="/students">Students</Button>
		</Box>
	</Box>
  );
}