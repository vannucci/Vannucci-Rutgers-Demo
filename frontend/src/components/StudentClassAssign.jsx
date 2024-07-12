import React, { useState, useEffect } from "react"
import { Box, Typography, Button, TextField, Grid, Select, MenuItem, FormControl } from '@mui/material';
import { upsertStudent, deleteStudentById, fetchClasses } from './api'


const EMPTY_FORM = {
		id: undefined,
		studentid: '',
		fullname: '',
		major: '',
		expectedgraddate: null,
		final_grades: {},
		selectedClassId: undefined,
		selectedClassName: '',
	}

const StudentClassAssign = ({selectedForm, updater}) => {
	const [studentData, setStudentData] = useState(EMPTY_FORM)
	const [availableClasses, setAvailableClasses] = useState([])
	
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
	
	useEffect(() => {
		const classes = fetchClasses()
		setAvailableClasses(classes)
	}, [])


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
				<Typography variant={"h5"}>Assign Selected Student To Class</Typography>
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
					InputProps={{
						readOnly: true
					}}
				/>
			</Grid>
			<Grid item>
				<FormControl>
					<Select
						value={studentData.selectedClassName}
						label="Available Classes"
						name="selectedClassId"
						onChange={handleChange}
					>
						<MenuItem>Thing</MenuItem>
					</Select>
				</FormControl>
			</Grid>
			<Grid item sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', padding: '8px' }}>
				{studentData.id && <Box sx={{ paddingRight: '5px'}}>
					<Button color="secondary" variant="contained" onClick={() => handleDelete(studentData.id)}>Disenroll</Button>
				</Box> }
				<Box>
					<Button onClick={handleSubmit} color="primary" variant="contained">Enroll</Button>
				</Box>
			</Grid>
			
		</Grid>
	)
}

export default StudentClassAssign