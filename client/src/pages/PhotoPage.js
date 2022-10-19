import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
// import styled from '@emotion/styled';
// mui components
import {
  styled,
  Link as Muilink,
  Checkbox,
  Divider,
  Grid,
  Typography,
  Button,
  TextField,
  Modal,
  Tooltip,
  Stack,
  Box
} from '@mui/material';
// icons
import { Link, Heart, ArrowLeft } from '@styled-icons/evil';
import { Favorite } from '@styled-icons/material-rounded';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
// my components
import Navbar from '../components/Navbar';
// import Sidebar from '../components/Sidebar';

//sample data
import { comments } from '../data/photo-data';
import { useDispatch, useSelector } from 'react-redux';
import { getPhoto } from '../actions/photos';
import { useParams } from 'react-router-dom';

const MainSection = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  margin: '0px 40px',
  paddingBottom: '40px',
  maxHeight: '40rem',
  gap: '40px',
  [theme.breakpoints.down('sm')]: {
    margin: '40px',
    flexDirection: 'column'
  }
}));

const PhotoSection = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '50%',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
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

const LinkBox = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  padding: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
  flexDirection: 'column'
});

const ImageLink = styled(Box)({
  border: '1px ridge',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '20px'
});

export default function PhotoPage(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [copied, setCopied] = useState(false);
  const container = useRef(null);
  const container1 = useRef(null);
  const [imgHeight, setImgHeight] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [COMMENTS, setCOMMENT] = useState(comments)
  const [NEWCOMMENT, setNEWCOMMENT] = useState('');


  const postCOMMENT=(e) => {
    e.preventDefault()
    setCOMMENT([...COMMENTS, {username: 'Admin', user_comment : NEWCOMMENT}])
  }

  useEffect(() => {
    dispatch(getPhoto(id));
  }, [id]);

  const photo = useSelector((state) => state.photo);

  useEffect(() => {
    setImgHeight(container.current.height);
  }, []);

  if (!photo) {
    return null;
  } else {
    return (
      <>
        <Navbar user={props.user} />

        <Stack>
          <Muilink
            variant="body1"
            sx={{ margin: '20px' }}
            underline="hover"
            color="inherit"
            href="/dashboard/folders">
            <ArrowLeft size="30" />
            Back
          </Muilink>
        </Stack>

        <MainSection>
          <PhotoSection>
            <Box bgcolor="black" height={`calc((100% - ${imgHeight}px)/2)`} ref={container1}></Box>
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
                {photo.name}
              </Typography>
              <Typography color="gray" sx={{ textTransform: 'capitalise' }}>
                {photo.caption}
              </Typography>
            </StyledBox>

            <Divider style={{ width: '80%' }}></Divider>

            {/* comments  */}
            <StyledBox gap="10px" sx={{ overflowY: 'scroll', height: '30rem' }}>
              {COMMENTS.map((comment, id) => {
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
                <Checkbox
                  color="error"
                  size="medium"
                  icon={<Heart size="30" />}
                  checkedIcon={<Favorite size="30" />}
                />
                <Button sx={{ marginRight: 'auto' }} color="primary" onClick={handleOpen}>
                  <Link size="30" />
                </Button>
              </Box>
              <Stack direction="row" spacing={2}>
                <form id="comment">
                
                <TextField
                  fullWidth
                  name="comment"
                  label="Add a comment"
                  onChange={(e)=>setNEWCOMMENT(e.target.value)}
                  ></TextField>
                <Button
                  type="submit"
                  onClick={postCOMMENT
                  }>
                  Post
                  </Button>
                
                </form>
                
              </Stack>
            </StyledBox>
          </CommentSection>
        </MainSection>

        {/* image link */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <LinkBox>
            <Typography align="center">Image Link</Typography>
            <ImageLink>
              {photo.link}
              <Box display="flex" justifyContent="flex-end" marginTop="1rem">
                <Tooltip title={copied ? 'Link copied!' : 'Click to copy'} placement="left">
                  <Checkbox
                    onClick={() => {
                      navigator.clipboard.writeText(photo.link);
                      setCopied(!copied);
                    }}
                    icon={<LibraryAddCheckOutlinedIcon fontSize="medium" />}
                    checkedIcon={<LibraryAddCheckIcon sx={{ color: 'green' }} />}
                  />
                </Tooltip>
              </Box>
            </ImageLink>
          </LinkBox>
        </Modal>
      </>
    );
  }
}

PhotoPage.propTypes = {
  user: PropTypes.object
};
