import React, { useState }from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
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
  padding: '30px',
}));

const columns = [
  { field: 'id', 
    headerName: 'ID', 
    width: 300,
    editable: true,
  },
  {
    field: 'firstName',
    headerName: 'First Name',
    width: 180,
    editable: false,
  },
  {
    field: 'lastName',
    headerName: 'Last Name',
    width: 180,
    editable: false,
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 120,
    editable: false,
  },
  {
    field: 'capacity',
    headerName: 'Capacity',
    type: 'number',
    width: 100,
    editable: false,
  },
];


export default function UsersList() {
  const { users } = useSelector((state) => state.users);

  // TODO: use the fetched data to construct rows
  let rows = [];
 
  if (users) {
    users.map(user => {
      rows.push(user);
    });
  }

  // ret a list of {id, secretKey} of users to ban
  let ret = [];
  const [selectionModel, setSelectionModel] = useState([]);
  const handleBan = () => {
    selectionModel.map(id => {
      users.map(user => {
        if (id === user.id) {
          ret.push({id: user.id, sk: user.secretKey});
        }
      });
    });
    const API =
      process.env.NODE_ENV === 'production'
        ? `https://photoshare-fs-server.herokuapp.com/adminban`
        : `http://localhost:9000/adminban`;

    axios
      .post(API, {
        data: ret,
      })
      .then((res) => {
        // dispatch({ type: 'UPLOAD_PHOTO', payload: res.data });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Container>
      <DataGrid
        sx={{
          height: '80%',
          width: '80%',
        }}
        rows={rows}
        columns={columns}
        checkboxSelection
        onSelectionModelChange={(newSelection) => {
          setSelectionModel(newSelection)
        }}
        selectionModel={selectionModel}
        pageSize={9}
      />
      <Button color="error" variant="contained" onClick={handleBan}>Ban</Button>
    </Container>
  )
}