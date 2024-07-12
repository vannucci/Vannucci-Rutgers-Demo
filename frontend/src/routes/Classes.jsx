import React, { useState, useEffect } from "react"
import { Grid } from '@mui/material';
import ClassDataTable from '../components/ClassDataTable'
import ClassInputForm from '../components/ClassInputForm'



import { fetchClasses, deleteClassById } from "../components/api"

export const Classes = () => {
	const [selectedForm, setSelectedForm] = useState()
	const [classes, setClasses] = useState([])
	
	const refreshClasses = async () => {
		const newClasses = await fetchClasses()
		setClasses(newClasses)
	}
		
	const handleDeleteClassById = async (id) => {
		deleteClassById(id)
		refreshClasses()
	}
	useEffect(() => {
	  async function fetchData() {
		await refreshClasses()
	  }
	  fetchData();
	}, []); 

		
	return (
		<section>
			<h2>Classes</h2>
			<ClassDataTable
				rows={classes}
				selectionHandler={(selection) => setSelectedForm(selection)}
				onDeleteRow={(id) => handleDeleteClassById(id)}
			/>
			<Grid container direction="row">
				<ClassInputForm updater={refreshClasses} selectedForm={selectedForm}/>
			</Grid>
		</section>
	)
}