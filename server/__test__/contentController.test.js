import { app } from '../app.js';
import supertest from 'supertest';
import { jest, describe, test, beforeEach, afterAll } from '@jest/globals';

// import { mockFirebase, exposeMockFirebaseApp } from 'mock-firebase-ts';

// const firebaseApp = mockFirebase().initializeApp({});
// const mocked = exposeMockFirebaseApp(firebaseApp);

// const admin = request.agent(app);
const req = supertest(app);
// jest.setTimeout(30000);

// describe('POST /login', () => {
//     test('login into normal user account', async () => {
//       await req
//         .post('/login')
//         .send({
//           email: 'user3@gmail.com',
//           password: 'password'
//         })
//         .expect(200);
//     });
// });

describe('GET /photo/:id (getPhotoPage)', () => {
    beforeEach(async () => {
        await req.post('/logout');
    })

    test('view public photo - not logged in', async () => {
        const photoID = 'xz1SXB8UtYeIscZs2Qrl';
        const res = await req.get(`/photo/${photoID}`);
        expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(photoID);
    })

    test('view private photo - owner', async () => {
        await req.post('/login').send({
          email: 'user3@gmail.com',
          password: 'password'
        })
        const privateID = 'vB4IlkKhesCWJbKX2SHQ'
        const res = await req.get(`/photo/${privateID}`);
        expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(privateID);
    })

    test('view private photo - other user', async () => {
        await req.post('/login').send({
            email: 'user3@gmail.com',
            password: 'password'
        })
        const privateID = 'jDcE1FrQcfXss93GZkTR'
        const res = await req.get(`/photo/${privateID}`);
        expect(res.status).toBe(404);
        expect(res.body).toEqual({});
    })

    test('view private photo - not logged in', async () => {
        const privateID = 'vB4IlkKhesCWJbKX2SHQ'
        const res = await req.get(`/photo/${privateID}`);
        expect(res.status).toBe(404);
        expect(res.body).toEqual({});
    })
})

describe('GET /dashboard/folders (getOwnContent)', () => {
    beforeEach(async () => {
        await req.post('/logout');
    })

    test('view personal dashboard - logged in', async () => {
        await req.post('/login').send({
            email: 'user3@gmail.com',
            password: 'password'
        })
        const res = await req.get(`/dashboard/folders`);
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(res.body.folders.length).toBeGreaterThan(0);
        expect(res.body.photos.length).toBeGreaterThan(0);
    })

    test('view personal dashboard - not logged in', async () => {
        const res = await req.get(`/dashboard/folders`);
        expect(res.status).toBe(404);
        expect(res.body).toEqual({});
    })
})

describe('GET /dashboard/folders (getOtherContent)', () => {
    beforeEach(async () => {
        await req.post('/logout');
    })

    test('view personal dashboard - logged in', async () => {
        await req.post('/login').send({
            email: 'user3@gmail.com',
            password: 'password'
        })
        const res = await req.get(`/dashboard/folders`);
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(res.body.folders.length).toBeGreaterThan(0);
        expect(res.body.photos.length).toBeGreaterThan(0);
    })

    test('view personal dashboard - not logged in', async () => {
        const res = await req.get(`/dashboard/folders`);
        expect(res.status).toBe(404);
        expect(res.body).toEqual({});
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