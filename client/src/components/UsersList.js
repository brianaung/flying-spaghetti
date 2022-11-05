import React, { useState }from 'react';
import { useSelector } from 'react-redux';
// mui
import { styled, Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Container = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  padding: '30px',
  border: 'solid 1px',
  borderColor: theme.palette.divider,
}));

const columns = [
  { field: 'id', headerName: 'ID', width: 90 ,
    editable: true,
  },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: false,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: false,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: false,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function UsersList() {
  const { data } = useSelector((state) => state.users);

  const [selectionModel, setSelectionModel] = useState([]);
  const handleClick = () => {
    console.log(selectionModel);
    console.log(data);
  }

  return (
    <Container>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        onSelectionModelChange={(newSelection) => {
          setSelectionModel(newSelection)
          console.log(newSelection);
        }}
        selectionModel={selectionModel}
        pageSize={9}
      />
      <Button color="error" variant="contained" onClick={handleClick}>Ban</Button>
    </Container>
  )
}
