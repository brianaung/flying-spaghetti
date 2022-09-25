import styled from '@emotion/styled';
import { Grid } from '@mui/material';

import { Stack, Box } from '@mui/system';

//icons
import React, { useEffect, useRef, useState } from 'react';

const PhotoSection = styled(Grid)({
  background: 'red',
  display: 'flex',
  flexDirection: 'column',
  margin: '40px',
  width: '40%',
  height: '30rem'
});

const CommentSection = styled(Stack)({
  background: 'red',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '30px',
  width: '60%',
  gap: '20px'
});

const StyledBox = styled(Box)({
  border: '1px solid',
  width: '100%',
  overflow: 'hidden'
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
      <PhotoSection>
        <Box bgcolor="black" height={`calc((100% - ${imgHeight}px)/2)`} ref={container1}>
          fef
        </Box>
        <img
          ref={container}
          width="100%"
          height="auto"
          src="https://www.lifehacker.com.au/wp-content/uploads/sites/4/2021/05/13/GettyImages-822523842.jpg?quality=80&resize=1280,720"
          alt="shiba"
        />
        <Box bgcolor="black" height={`calc((100% - ${imgHeight}px)/2)`}></Box>
      </PhotoSection>
      <CommentSection>
        <StyledBox height="40%"></StyledBox>
        <StyledBox height="60%"></StyledBox>
      </CommentSection>
    </>
  );
}
