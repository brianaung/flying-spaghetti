import { app } from '../app.js';
import { describe, expect, jest, test } from '@jest/globals';
import request from 'supertest';

describe('photos', () => {
  // getPhotoByID
  test('should send the correct photo JSON by ID', () => {
    request(app).get('/photo/').expect();
  });

  // getPhotosInFolder
  test('should send the correct photos given a folder directory', () => {
    request(app).get('/photo/').expect();
  });
});

describe('comments', () => {
  // getPhotoComments
  test('should send all comment objects ', () => {
    request(app).get('/folder/').expect();
  });
});

describe('folders', () => {
  // getUserFolders
  test('should send an array of folders owned by user', () => {
    request(app).get('/folder/').expect();
  });
});

// getRecentPhotos,
// getLikedPhotos,
// getUserContent,
// uploadPhoto,
// deletePhoto,
// likePost,
// createFolder,
// moveToBin,
// moveToDifferentFolder,
// postComment,
// getUserByID,
// getNameByID
