import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  // styled,
  Typography,
  Breadcrumbs,
  Link
} from '@mui/material';

export default function Directory(props) {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/dashboard/folders');
  };

  return (
    <>
      {props.currFolder == 'folders' ||
      props.currFolder == 'shared' ||
      props.currFolder == 'liked' ? (
        <></>
      ) : (
        <Breadcrumbs fontSize="large">
          <Link component="button" underline="hover" color="inherit" onClick={handleNavigation}>
            <Typography variant="body1">Home</Typography>
          </Link>
          <Typography variant="h3">{props.currFolder}</Typography>
        </Breadcrumbs>
      )}
    </>
  );
}

Directory.propTypes = {
  currFolder: PropTypes.string
};
