import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPhotos, getPhotosInFolder } from '../actions/photos';
// mui components
import { styled, Box, Stack } from '@mui/material';
// my components
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Navbar from '../components/Navbar';


const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh'
});

const StyledStack = styled(Stack)(({ theme }) => ({
  flexGrow: '1',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column'
  }
}));

export default function Dashboard(props) {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    if (id === 'folders') {
      dispatch(getPhotos());
    } else {
      dispatch(getPhotosInFolder(id));
    }
  }, [id]);

  return (
    <Container container>
      <Navbar query={query} setQuery={setQuery} user={props.user} />
      <StyledStack direction="row">
        <Sidebar usage={90} user={props.user} />
        <Feed query={query} pageID={id} />
      </StyledStack>
    </Container>
  );
}

Dashboard.propTypes = {
  user: PropTypes.object
};
