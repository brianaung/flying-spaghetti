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

//sample data
import { comments } from '../data/photo-data';

const MainSection = styled(Stack)({
  display: 'flex',
  flexDirection: 'row',
  margin: '40px',
  height: '40rem',
  gap: '40px'
});

const PhotoSection = styled(Grid)({
  background: 'red',
  display: 'flex',
  flexDirection: 'column',
  width: '50%'
});

const CommentSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '50%',
  gap: '20px',
  border: 'solid 2px black'
});

const StyledBox = styled(Box)({
  width: '100%',
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column'
});

export default function OnePhoto() {
  const container = useRef(null);
  const container1 = useRef(null);
  const [imgHeight, setImgHeight] = useState(null);

  useEffect(() => {
    setImgHeight(container.current.height);
  }, []);

  return (
    <>
      <Navbar />
      <MainSection>
        <PhotoSection>
          <Box bgcolor="black" height={`calc((100% - ${imgHeight}px)/2)`} ref={container1}></Box>
          <img
            ref={container}
            width="100%"
            height="auto"
            style={{ maxHeight: '40rem' }}
            src="https://www.investopedia.com/thmb/HJ4Umemtl9I6yVw8yN9LuqCL14Y=/2119x1414/filters:fill(auto,1)/of-pet-shiba-inu-1218152278-1f9c16ad70184b59ab0164d046b3bb6e.jpg"
            alt="shiba"
          />
          <Box bgcolor="black" height={`calc((100% - ${imgHeight}px)/2)`}></Box>
        </PhotoSection>

        <CommentSection sx={{ overflowY: 'scroll', maxHeight: '40rem' }}>
          <StyledBox overflowY="hidden">
            <Typography sx={{ fontWeight: '600', textTransform: 'uppercase' }}>
              Shiba inu
            </Typography>
            <Typography color="gray" sx={{ textTransform: 'capitalise' }}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique voluptates sit rem
              non maxime? Eius magnam nemo, a ipsum omnis odit similique officiis deleniti delectus
              repudiandae repellat, accusamus sed quod?
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
              <TextField fullWidth></TextField>
              <Button>Post</Button>
            </Stack>
          </StyledBox>
        </CommentSection>
      </MainSection>
    </>
  );
}
