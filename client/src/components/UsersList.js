import React, { useState, useEffect }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, banUser } from '../actions/users';

// mui
import { styled, Alert, Box, Button } from '@mui/material';
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
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const { users } = useSelector((state) => state.users);

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

    dispatch(banUser({data: ret}));

    // TODO: should consider a case for fail ban
    // show an ban event alert
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 6000);

    // clear selection
    setSelectionModel([]);
  }

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
      <Button color="error" variant="contained" onClick={handleBan}>Ban</Button>
      {alert &&
        <Alert severity="success">You have successfully banned the user.</Alert>
      }
    </Container>
  );
}
