import React, { useState, useEffect } from "react"
import { Box, Typography, Button, TextField, Grid } from '@mui/material';
import { upsertStudent, deleteStudentById } from './api'

const EMPTY_FORM = {
		id: undefined,
		studentid: '',
		fullname: '',
		major: '',
		expectedgraddate: null,
		final_grades: {},
	}

const StudentClassAssign = ({selectedForm, updater}) => {
	const [studentData, setStudentData] = useState(EMPTY_FORM)
	
	const handleChange = (e) => {
		const { name, value } = e.target
		setStudentData(prevData => ({
			...prevData,
			[name]: value
		}))
	}
	
	const handleSubmit = async () => {
		try {
			const result = await upsertStudent(studentData)
		} catch(err) {
			console.error('Failed to insert student')
		} finally {
			setStudentData(EMPTY_FORM)
			updater()
		}
	}
	
	const handleDelete = async (id) => {
		try {
			const result = await deleteStudentById(id)
		} catch(err) {
			console.error('Failed to delete student')
		} finally {
			updater()
		}
	}
	
		
	useEffect(() => {
		selectedForm ? setStudentData(selectedForm) : setStudentData(EMPTY_FORM)
	}, [selectedForm])


	return (
		
		<Grid container direction="column"
			spacing={1}
			onSubmit={handleSubmit} 
			noValidate 
			border={1}
			justify="center"
			sx={{ marginTop: '16px', width: '100%', marginLeft: 0, maxWidth: '400px'}}
		>
			<Grid item>
				<Typography variant={"h5"}>Submit and Update Students</Typography>
			</Grid>
			<Grid item>
				<TextField
					label="Primary ID"
					id="id"
					name="id"
					onChange={handleChange}
					value={studentData.id ?? ''}
					variant="outlined"
					size="small"
					helperText="Omit for new students"
				/>
			</Grid>
			<Grid item>
				<TextField
					label="School ID"
					id="studentid"
					name="studentid"
					onChange={handleChange}
					value={studentData.studentid ?? ''}
					variant="outlined"
					size="small"
				/>
			</Grid>
			<Grid item>
				<TextField
					label="Full Name"
					id="fullname"
					name="fullname"
					onChange={handleChange}
					value={studentData.fullname ?? ''}
					variant="outlined"
					size="small"
				/>
			</Grid>
			<Grid item>
				<TextField
					label="Major"
					id="major"
					name="major"
					onChange={handleChange}
					value={studentData.major ?? ''}
					variant="outlined"
					size="small"
				/>
			</Grid>
			<Grid item sx={{ marginLeft: '100px', display: 'flex', flexDirection: 'column', width: '226px', marginLeft: '82px'}}>
				<label>Expected Grad Date</label>
				<input 
					type="date" 
					id="expectedgraddate" 
					name="expectedgraddate" 
					onChange={handleChange} 
					value={studentData.expectedgraddate ?? ''}
				/>
			</Grid>
			<Grid item sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', padding: '8px' }}>
				{studentData.id && <Box sx={{ paddingRight: '5px'}}>
					<Button color="secondary" variant="contained" onClick={() => handleDelete(studentData.id)}>Delete</Button>
				</Box> }
				<Box>
					<Button onClick={handleSubmit} color="primary" variant="contained">Submit</Button>
				</Box>
			</Grid>
			
		</Grid>
	)
}

export default StudentClassAssign