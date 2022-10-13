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
  }

  return (
    <>
      {props.currFolder == 'folders' ? (
        <></>
      ) : (
        <Breadcrumbs fontSize="large">
          <Link component="button" underline="hover" color="inherit" onClick={handleNavigation}>
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
