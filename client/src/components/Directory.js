import React from 'react';
import PropTypes from 'prop-types';
import {
  // styled,
  Typography,
  Breadcrumbs,
  Link
} from '@mui/material';

export default function Directory(props) {
  return (
    <>
      {props.currFolder == 'folders' ? (
        <></>
      ) : (
        <Breadcrumbs fontSize="large">
          <Link underline="hover" color="inherit" href="/dashboard/folders">
            Home
          </Link>
          <Typography variant="h3" color="primary">
            {props.currFolder}
          </Typography>
        </Breadcrumbs>
      )}
    </>
  );
}

Directory.propTypes = {
  currFolder: PropTypes.string
};
