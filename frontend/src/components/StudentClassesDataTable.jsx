import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const width = 120

const columns = [
  { field: 'id', headerName: 'ID', width },
  { field: 'classid', headerName: 'Class ID', width },
  { field: 'name', headerName: 'Name', width },
  { field: 'semester', headerName: 'Semester', width },
];



export default function StudentClassesDataTable({rows, selectionHandler}) {
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
