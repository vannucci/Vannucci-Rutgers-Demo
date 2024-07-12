import React, { useState, useEffect } from "react"
import { Grid } from '@mui/material';
import StudentDataTable from '../components/StudentTable'
import StudentInputForm from '../components/StudentInputForm'
import StudentClassAssign from '../components/StudentClassAssign'


import { fetchStudents } from "../components/api"

export const Students = () => {
	const [selectedForm, setSelectedForm] = useState()
	const [students, setStudents] = useState([])
	
	const handleGetAllStudents = async () => {
		const newStudents = await fetchStudents()
		setStudents(newStudents)
	}
		
	useEffect(() => {
	  async function fetchData() {
		await handleGetAllStudents()
	  }
	  fetchData();
	}, []); 

		
	return (
		<section>
			<h2>Students</h2>
			<StudentDataTable rows={students} selectionHandler={(selection) => setSelectedForm(selection)}/>
			<Grid container direction="row">
				<StudentInputForm updater={handleGetAllStudents} selectedForm={selectedForm}/>
				<StudentClassAssign updater={handleGetAllStudents} selectedForm={selectedForm} />
			</Grid>
		</section>
	)
}