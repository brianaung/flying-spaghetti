import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// mui
import { styled, Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.main,
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  width: '100%',
  height: '100%',
  padding: '30px'
}));

const columns = [
  { field: 'id', headerName: 'ID', width: 110, editable: true },
  {
    field: 'firstName',
    headerName: 'First Name',
    width: 200,
    editable: false
  },
  {
    field: 'lastName',
    headerName: 'Last Name',
    width: 200,
    editable: false
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 200,
    editable: false
  },
  {
    field: 'capacity',
    headerName: 'Capacity',
    type: 'number',
    width: 170,
    editable: false
  }
];

export default function UsersList() {
  const { data } = useSelector((state) => state.users);

  // TODO: use the fetched data to construct rows
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', capacity: 35, role: null },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
  ];

  const [selectionModel, setSelectionModel] = useState([]);
  const handleClick = () => {
    console.log(selectionModel);
    console.log(data);
  };

  return (
    <Container>
      <DataGrid
        sx={{
          height: '80%',
          width: '80%'
        }}
        rows={rows}
        columns={columns}
        checkboxSelection
        onSelectionModelChange={(newSelection) => {
          setSelectionModel(newSelection);
        }}
        selectionModel={selectionModel}
        pageSize={9}
      />
      <Button color="error" variant="contained" onClick={handleClick}>
        Ban
      </Button>
    </Container>
  );
}
