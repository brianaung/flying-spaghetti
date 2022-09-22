import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

function Photo({ aPhoto }) {
  const [isShown, setIsShown] = useState(false);

  return (
    <div
      style={{
        paddingRight: '50px',
        paddingTop: '50px',
        position: 'relative',
        overflow: 'auto'
      }}>
      <img
        src={aPhoto.photo}
        alt={aPhoto.name}
        width="200px"
        height="200px"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        style={{ opacity: isShown && '0.2' }}
      />
      {isShown && (
        <>
          <Typography
            variant="h5"
            style={{ position: 'absolute', top: '35%', left: '10%', right: '20%' }}>
            {aPhoto.name}
          </Typography>
          <Typography
            variant="h7"
            style={{ position: 'absolute', top: '50%', left: '10%', right: '30%' }}>
            {aPhoto.caption.length >= 100 ? `${aPhoto.caption.slice(0, 50)}...` : aPhoto.caption}
          </Typography>
        </>
      )}
    </div>
  );
}

Photo.propTypes = {
  aPhoto: PropTypes.object
};

export default Photo;
