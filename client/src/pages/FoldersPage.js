import React from 'react';

import PropTypes from 'prop-types';

// mui components
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';

// mui icons
//import CircularProgress from '@mui/material/CircularProgress';

// my components

import { Box, Typography } from '@mui/material';

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
export default function FoldersPage(props) {

  

  if (!props.data) return null;
  else {
    return (
      <Container container>
        
        <StyledStack direction="row">
          
          <FeedContainer>
            
            <Typography variant="h3">Folders</Typography>
            <PhotoFrame photos={props.data} query={props.query}></PhotoFrame>
          </FeedContainer>
        </StyledStack>
      </Container>
    );
  }
}


FoldersPage.propTypes = {
  query: PropTypes.string,
  data: PropTypes.object
};
