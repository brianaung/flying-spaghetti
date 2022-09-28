import React, { useEffect, useState } from 'react';

// mui components
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

// mui icons
//import CircularProgress from '@mui/material/CircularProgress';

// my components

import { Box, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotosInFolder } from '../actions/photos';
import { useParams } from 'react-router-dom';
import PhotoFrame from '../components/PhotoFrame';

//import Photo from '../components/Photo';

const FeedContainer = styled(Stack)(({ theme }) => ({
  gap: '50px',
  justifyContent: 'flex-start',
  padding: '30px',
  width: '80%',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

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
// TODO: add current directory
export default function FoldersPage() {
  const [query, setQuery] = useState('');

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPhotosInFolder(id));
  }, [id]);

  const { data } = useSelector((state) => state.photos);

  if (!data) return null;
  else {
    return (
      <Container container>
        <Navbar query={query} setQuery={setQuery} />
        <StyledStack direction="row">
          <Sidebar usage="90" />
          <FeedContainer>
            <Fab sx={{ border: 'solid 2px' }} color="secondary" size="medium" aria-label="add">
              <AddIcon />
            </Fab>
            <Typography variant="h3">Folders</Typography>
            <PhotoFrame photos={data} query={query}></PhotoFrame>
          </FeedContainer>
        </StyledStack>
      </Container>
    );
  }
}
