import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom'
import moment from 'moment'

const width = 120

const timeFormatter = (value) => (
	moment(value).format('MM/DD/YYYY')
)

const columns = [
  { field: 'id', headerName: 'ID', width },
  { field: 'studentid', headerName: 'Student ID', width },
  { field: 'fullname', headerName: 'Name', width },
  { field: 'major', headerName: 'Major', width },
  {
    field: 'expectedgraddate',
    headerName: 'Expected Graduation Date',
    width,
	valueFormatter: ((value) => value !== null ? timeFormatter(value) : ''),
  },
  { 
	field: 'classes',
	headerName: 'Classes',
	width,
	renderCell: (params) => (
		<Link to={`/studentClassData/${params.row.id}`}>View</Link>
	),
  },
];



export default function StudentDataTable({rows, selectionHandler}) {
	return (
		<div style={{ height: 400, width: '100%' }}>
		  <DataGrid
			rows={rows}
			onRowSelectionModelChange={(id) => {
				const rowId = id.length ? id[0] : undefined
				const selectedRow = rows.find((row) => row.id === rowId)
				selectionHandler(selectedRow)
			}}
			columns={columns}
			initialState={{
			  pagination: {
				paginationModel: { page: 0, pageSize: 5 },
			  },
			}}
			pageSizeOptions={[5, 10]} 
		  />
		</div>
	);
}
