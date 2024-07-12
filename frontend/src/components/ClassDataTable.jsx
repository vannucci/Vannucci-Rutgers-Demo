import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'

export default function ClassDataTable({rows, onDeleteRow, selectionHandler}) {
	
	const width = 120

	const columns = [
	  { field: 'id', headerName: 'ID', width },
	  { field: 'classid', headerName: 'Class ID', width },
	  { field: 'name', headerName: 'Name', width },
	  { field: 'subject', headerName: 'Subject', width },
	  { field: 'semester', headerName: 'Semester', width }, 
	  { field: 'actions', headerName:'', width, sortable: false, renderCell: (params) => (
			<IconButton
				onClick={() => onDeleteRow(params.row.id)}
				size="small"
			>
				<DeleteIcon />
			</IconButton>
	  )}
	];
	
	return (
		<div style={{ height: 400, width: '100%' }}>
		  <DataGrid
			rows={rows}
			columns={columns}
			onRowSelectionModelChange={(id) => {
				const rowId = id.length ? id[0] : undefined
				const selectedRow = rows.find((row) => row.id === rowId)
				selectionHandler(selectedRow)
			}}
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
