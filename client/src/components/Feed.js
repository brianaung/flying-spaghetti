import React from 'react';
import PropTypes from 'prop-types';
// mui components
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
// my components
import FolderFrame from '../components/FolderFrame';
import PhotoFrame from '../components/PhotoFrame';
//import { Photofolders } from '../data/photo-data';
import { Photo101 } from '../data/photo-data';
// import { Users } from '../data/photo-data';

const FeedContainer = styled(Stack)({
  gap: '50px',
  justifyContent: 'flex-start',
  width: '80%',
  padding: '30px'
});

// TODO: add current directory
export default function Feed(props) {
  return (
    <FeedContainer>
      <Fab sx={{ border: 'solid 2px' }} color="secondary" size="medium" aria-label="add">
        <AddIcon />
      </Fab>
      <FolderFrame></FolderFrame>
      <PhotoFrame photos={Photo101} query={props.query}></PhotoFrame>
    </FeedContainer>
  );
}

Feed.propTypes = {
  query: PropTypes.string
};
