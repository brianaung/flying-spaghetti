import { app } from '../app.js';
// import request from 'supertest';
import supertest from 'supertest';
import { jest, describe, test, beforeEach, afterAll } from '@jest/globals';

// const admin = request.agent(app);
const req = supertest(app);
// jest.setTimeout(30000);

describe('POST /login', () => {
    test('login into admin account', async () => {
      await req
        .post('/login')
        .send({
          email: 'user3@gmail.com',
          password: 'password'
        })
        .expect(200);
    });
});

describe('GET /photo/:id (getPhotoPage)', () => {
    test('view public photo', async () => {
        const photoID = 'xz1SXB8UtYeIscZs2Qrl';
        const res = await req.get(`/photo/${photoID}`);
        expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(photoID);

    })

    test('view private photo', async () => {
        const privateID = '4LxUxRSxjUMhJR2pID3S'
        const res = await req.get(`/photo/${privateID}`);
        expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(privateID);
    })
})
//     // getPhotosInFolder
//     test('should send the correct photos given a folder directory', () => {
//         request(app)
//             .get('/photo/')
//             .expect()
//     })


// })

// describe('comments', () => {
//     // getPhotoComments
//     test('should send all comment objects ', () => {
//         request(app)
//             .get('/folder/')
//             .expect()
//     })


// })

// describe('folders', () => {
//     // getUserFolders
//     test('should send an array of folders owned by user', () => {
//         request(app)
//             .get('/folder/')
//             .expect()
//     })


// })

// getRecentPhotos,
// getLikedPhotos,
// getUserFolders,
// getPhotosInFolder,
// getUserContent,
// getPhotoComments,
// uploadPhoto,
// getPhotoByID,
// likePost,
// createFolder,
// moveToBin,
// moveToDifferentFolder,
// postComment,
// getUserByID,
// getNameByID,
// getOwnContent,
// getSharedContent,
// getPhotoPage,
// getNumLikes