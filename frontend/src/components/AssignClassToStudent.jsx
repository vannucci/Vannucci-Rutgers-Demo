import React, { useState } from 'react'
import { addClassToStudent, deleteClassFromStudent } from "./api"
import { Button, TextField, Select, FormControl, InputLabel, MenuItem } from '@mui/material'

export const AssignClassToStudent = ({ availableClasses, onSubmit }) => {
	const [classToAdd, setClassToAdd] = useState(0)
				
	return (
		<FormControl
			sx={{
				display: 'flex',
				flexDirection: 'column',
				maxWidth: '300px',
				marginTop: '16px',
			}}
		>
			<InputLabel id="available-classes-label">Available Classes</InputLabel>
			<Select
				id="available-classes"
				value={classToAdd}
				label="Available Classes"
				onChange={(event) => {
					setClassToAdd(event.target.value)
				}}
				sx={{
					'& .MuiSelect-select': {
						textAlign: 'left',
					}
				}}
			>
				<MenuItem value={0}>&nbsp;</MenuItem>
				{availableClasses && availableClasses.map((classEntry) => {
					return (
						<MenuItem key={classEntry.id} value={classEntry.id}>{`${classEntry.classid}: ${classEntry.class_name} - ${classEntry.semester}`}</MenuItem>
					)
				})}
			</Select>
			<Button disabled={classToAdd === 0} onClick={() => {
				onSubmit(classToAdd)
				setClassToAdd(0)
			}}>Add Class</Button>
		</FormControl>
	)

}