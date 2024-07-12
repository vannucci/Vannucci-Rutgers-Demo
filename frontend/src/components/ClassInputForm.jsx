import React, { useState, useEffect } from "react"
import { Box, Typography, Button, TextField, Grid } from '@mui/material';
import { upsertClass, deleteClassById } from './api'

const EMPTY_FORM = {
		id: undefined,
		classid: '',
		name: '',
		semester: '',
		maxstudents: 0,
		studentsenrolled: 0,
		subject: '',
	}

const classInputForm = ({selectedForm, updater}) => {
	const [classData, setClassData] = useState(EMPTY_FORM)
	
	const handleChange = (e) => {
		const { name, value } = e.target
		setClassData(prevData => ({
			...prevData,
			[name]: value
		}))
	}
	
	const handleSubmit = async () => {
		try {
			const result = await upsertClass(classData)
		} catch(err) {
			console.error('Failed to insert class')
		} finally {
			setClassData(EMPTY_FORM)
			updater()
		}
	}
	
	const handleDelete = async (id) => {
		try {
			const result = await deleteClassById(id)
		} catch(err) {
			console.error('Failed to delete class')
		} finally {
			updater()
		}
	}
	
		
	useEffect(() => {
		selectedForm ? setClassData(selectedForm) : setClassData(EMPTY_FORM)
	}, [selectedForm])


	return (
	<Grid container direction="column"
		spacing={1}
		noValidate 
		border={1}
		justify="center"
		sx={{ marginTop: '16px', width: '100%', marginLeft: 0, maxWidth: '400px'}}
	>
		<Grid item>
			<Typography variant={"h5"}>Submit and Update Class</Typography>
		</Grid>
			<Grid item>
				<TextField
					label="Primary ID"
					id="id"
					name="id"
					onChange={handleChange}
					value={classData.id ?? ''}
					variant="outlined"
					size="small"
					helperText="Omit for new students"
				/>
			</Grid>
			<Grid item>
				<TextField
					label="Class ID"
					id="classid"
					name="classid"
					onChange={handleChange}
					value={classData.classid ?? ''}
					variant="outlined"
					size="small"
				/>
			</Grid>
			<Grid item>
				<TextField
					label="Class Name"
					id="name"
					name="name"
					onChange={handleChange}
					value={classData.name ?? ''}
					variant="outlined"
					size="small"
				/>
			</Grid>
			<Grid item>
				<TextField
					label="Semester"
					id="semester"
					name="semester"
					onChange={handleChange}
					value={classData.semester ?? ''}
					variant="outlined"
					size="small"
				/>
			</Grid>
			<Grid item>
				<TextField
					label="Max Students"
					id="maxstudents"
					name="maxstudents"
					onChange={handleChange}
					value={classData.maxstudents ?? ''}
					variant="outlined"
					size="small"
				/>
			</Grid>
			<Grid item>
				<TextField
					label="Students Enrolled"
					id="studentsenrolled"
					name="studentsenrolled"
					onChange={handleChange}
					value={classData.studentsenrolled ?? ''}
					variant="outlined"
					size="small"
				/>
			</Grid>
			<Grid item>
				<TextField
					label="Class Subject"
					id="subject"
					name="subject"
					onChange={handleChange}
					value={classData.subject ?? ''}
					variant="outlined"
					size="small"
				/>
			</Grid>
			<Grid item sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', padding: '8px' }}>
				{classData.id && <Box sx={{ paddingRight: '5px'}}>
					<Button color="secondary" variant="contained" onClick={() => handleDelete(classData.id)}>Delete</Button>
				</Box> }
				<Box>
					<Button color="primary" variant="contained" onClick={handleSubmit}>Submit</Button>
				</Box>
			</Grid>
	</Grid>
	)
}

export default classInputForm