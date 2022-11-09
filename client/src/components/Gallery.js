import React, { useEffect } from 'react';
// mui components
import {
  // useTheme,
  // styled,
  Typography,
  ImageList,
  ImageListItem,
} from '@mui/material';
// api
import { useDispatch, useSelector } from 'react-redux';
import { getPhotosInFolder } from '../actions/photos';

export default function Gallery() {
  // const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPhotosInFolder('root'));
  }, []);

  const { photos } = useSelector((state) => state.photos);

  return (
    <div style={{ 
      alignSelf: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '50px',
      margin: '100px',
    }}>
      <Typography align="center" variant="h2">Check out what other people have been sharing!</Typography>

      <ImageList variant="masonry" cols={2} gap={8}>
        {photos.map((aPhoto) => (
          <ImageListItem sx={{ border: 'solid 1px black', borderRadius: '5px' }} key={aPhoto.id}>
            <img
              src={aPhoto.link}
              alt={aPhoto.name}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  )
}
