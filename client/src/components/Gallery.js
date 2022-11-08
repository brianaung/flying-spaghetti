import React, { useEffect } from 'react';
// mui components
import {
  // useTheme,
  // styled,
  Typography,
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
      border: 'solid 2px red',
    }}>
      <Typography variant="h3">Check out what other people have been sharing!</Typography>

      {photos.map((aPhoto) => {
        console.log(aPhoto);
        return <img style={{height: '200px', width: '200px' }} key={aPhoto.id} src={aPhoto.link} alt={aPhoto.name} />;
      })}
    </div>
  )
}
