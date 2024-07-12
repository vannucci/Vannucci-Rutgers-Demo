import React, { useState, useEffect, useCallback } from "react"
import { Grid, Box, Typography } from '@mui/material'
import { useParams, Link } from 'react-router-dom'
import { AssignClassToStudent } from '../components/AssignClassToStudent'
import ClassDataTable from '../components/ClassDataTable'

import { fetchStudentClassDataById, addClassToStudent, deleteClassFromStudent, fetchClassesAvailableToStudent } from "../components/api"

export const StudentClassData = () => {
	const { id } = useParams()
	const idAsInt = parseInt(id, 10);
	
	if (isNaN(idAsInt)) {
		console.error('Invalid ID')
		return <div>Error: Invalid ID</div>
	}
	const [studentClassData, setStudentClassData] = useState()
	const [classesAvailable, setClassesAvailable] = useState()
					
	const handleAddClass = useCallback(async (classToAdd) => {
		const results = await addClassToStudent(idAsInt, classToAdd)
		refreshState()
		return
	}, [idAsInt])
	
	const deleteClass = useCallback(async (classToAdd) => {
		const results = await deleteClassFromStudent(idAsInt, classToAdd)
		refreshState()
		return
	}, [idAsInt])
		
	const handleGetStudentClassData = async () => {
		const response = await fetchStudentClassDataById(idAsInt)
		setStudentClassData(response.classes)
	}
	
	const handleGetClassesAvailableToStudent = async () => {
		const response = await fetchClassesAvailableToStudent(idAsInt)
		if (response.available_classes) {
			setClassesAvailable(response.available_classes)			
		}
	}
	
	const refreshState = async () => {
		await handleGetStudentClassData()
		await handleGetClassesAvailableToStudent()
	}
				
	useEffect(() => {
		async function fetchData() {
			refreshState()
		}
		fetchData();
	}, []); 
		
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column'}}>
			<Box item sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px'}}>
				<Link to="/students">Back to Students</Link>			
				<Typography variant="h5">Student ID {idAsInt} Class Data</Typography>
			</Box>
			<ClassDataTable rows={studentClassData} onDeleteRow={(classId) => deleteClass(classId)}/>
			<AssignClassToStudent availableClasses={classesAvailable} onSubmit={(classId) => handleAddClass(classId)}/>
		</Box>
	)
}