import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// mui components
import { styled, Box, Typography, Stack } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';

const FolderContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '20px',
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
    width: '100%'
  }
}));

const Folder = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.main,
  borderRadius: theme.shape.borderRadius,
  border: '1px solid',
  display: 'flex',
  flexDirection: 'row',
  width: '250px',
  height: '50px',
  padding: '10px',
  gap: '20px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  // add hover effect
  transition: 'transform 200ms ease 0s, background 200ms ease 0s',
  '&:hover': {
    transform: 'translateY(-2px)'
  }
}));

export default function FolderFrame(props) {
  const navigate = useNavigate();

  const handleOpenFolder = (folder) => {
    navigate(`/dashboard/${folder}`);
  };

  return (
    <Stack gap={2}>
      <Typography variant="h3">Folders</Typography>
      {props.folders && (
        <FolderContainer>
          {props.folders
            .filter((folder) => folder.toLowerCase().includes(props.query))
            .map((folder) => {
              return (
                <Folder key={folder} onClick={() => handleOpenFolder(folder)}>
                  <FolderIcon color="secondary" />
                  <Typography>{folder}</Typography>
                </Folder>
              );
            })}
        </FolderContainer>
      )}
    </Stack>
  );
}

FolderFrame.propTypes = {
  folders: PropTypes.array,
  pageID: PropTypes.string,
  query: PropTypes.string
};
