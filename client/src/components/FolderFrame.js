import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// mui components
import { styled, Box, Typography, Stack } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';

const FolderContainer = styled(Stack)({
  display: 'flex',
  flexDirection: 'row',
  gap: '20px',
  flexWrap: 'wrap'
});

const Folder = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  border: '2px solid',
  width: '250px',
  height: '50px',
  padding: '10px',
  gap: '20px',
  overflow: 'hidden',
  whiteSpace: 'nowrap'
});

export default function FolderFrame(props) {
  const navigate = useNavigate();

  const handleOpenFolder = (folder) => {
    navigate(`/dashboard/${folder}`);
  };

  return (
    <>
      <Typography variant="h3">Folders</Typography>
      {props.folders && props.pageID === 'folders' && (
        <FolderContainer>
          {props.folders.map((folder) => {
            return (
              <Folder key={folder} onClick={() => handleOpenFolder(folder)}>
                <FolderIcon />
                <Typography>{folder}</Typography>
              </Folder>
            );
          })}
        </FolderContainer>
      )}
    </>
  );
}

FolderFrame.propTypes = {
  folders: PropTypes.object,
  pageID: PropTypes.string
};
