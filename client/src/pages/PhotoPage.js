import React, { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';
import { Checkbox, Divider, Grid, Typography, Button, TextField } from '@mui/material';
import { Stack, Box } from '@mui/system';

//icons
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';

//components
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
//import CircularProgress from '@mui/material/CircularProgress';

//sample data
import { comments } from '../data/photo-data';
import { useDispatch, useSelector } from 'react-redux';
import { getPhoto } from '../actions/photos';
import { useParams } from 'react-router-dom';

const FullPage = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column'
  }
}));

const MainSection = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  margin: '40px',
  height: '40rem',
  gap: '40px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column'
  }
}));

const PhotoSection = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '50%',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  }
}));

const CommentSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '50%',
  gap: '20px',
  border: 'solid 2px black',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

const StyledBox = styled(Box)({
  width: '100%',
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column'
});

export default function PhotoPage() {
  const container = useRef(null);
  const container1 = useRef(null);
  const [imgHeight, setImgHeight] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPhoto(id));
  }, [id]);

  const photo = useSelector((state) => state.photos);

  useEffect(() => {
    setImgHeight(container.current.height);
  }, []);

  if (!photo) {
    return null;
  } else {
    return (
      <>
        <Navbar />

        <FullPage>
          <Sidebar />
          <MainSection>
            <PhotoSection>
              <Box
                bgcolor="black"
                height={`calc((100% - ${imgHeight}px)/2)`}
                ref={container1}></Box>
              <img
                ref={container}
                width="100%"
                style={{ maxHeight: '40rem' }}
                src={photo.link}
                alt={photo.caption}
              />
              <Box bgcolor="black" height={`calc((100% - ${imgHeight}px)/2)`}></Box>
            </PhotoSection>

            <CommentSection>
              <StyledBox sx={{ overflowY: 'scroll', height: { sx: '20rem', md: '30rem' } }}>
                <Typography sx={{ fontWeight: '600', textTransform: 'uppercase' }}>
                  {photo.caption}
                </Typography>
                <Typography color="gray" sx={{ textTransform: 'capitalise' }}>
                  {photo.caption}
                </Typography>
              </StyledBox>

              <Divider style={{ width: '80%' }}></Divider>

              {/* comments  */}
              <StyledBox gap="10px" sx={{ overflowY: 'scroll', height: '30rem' }}>
                {comments.map((comment, id) => {
                  return (
                    <Stack key={id} direction="row" spacing={2}>
                      <Typography sx={{ fontWeight: '600' }}>{comment.username}</Typography>
                      <Typography>{comment.user_comment}</Typography>
                    </Stack>
                  );
                })}
              </StyledBox>

              {/* box to write comment */}
              <StyledBox display="flex" flexDirection="column" marginTop="auto" fullWidth>
                {/* icons */}
                <Box display="flex" justifyContent="space-between">
                  <Checkbox size="medium" icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                  <Button sx={{ marginRight: 'auto' }} color="primary" onClick={() => {}}>
                    <ShareIcon fontSize="medium" />
                  </Button>
                </Box>
                <Stack direction="row" spacing={2}>
                  <TextField fullWidth name="comment" label="Add a comment"></TextField>
                  <Button type="submit">Post</Button>
                </Stack>
              </StyledBox>
            </CommentSection>
          </MainSection>
        </FullPage>
      </>
    );
  }
}
