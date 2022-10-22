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

beforeEach(async () => {
    await req.post('/logout');
})

describe('GET /photo/:id (getPhotoPage)', () => {
    test('view unavailable photo - logged in', async () => {
        await req.post('/login').send({
            email: 'admin@gmail.com',
            password: 'password'
        })
        const res = await req.get(`/photo/idk`);
        expect(res.status).toBe(404);
        expect(res.body).toEqual({});
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
    test('view personal dashboard - logged in', async () => {
        await req.post('/login').send({
            email: 'user3@gmail.com',
            password: 'password'
        })
        const res = await req.get(`/dashboard/folders`);

        const testFolder = 'user3folder';
        const testPhoto = 'aqXevPREVXLz4Ug8gWaB';

        const userFolders = res.body.folders;
        const userPhotos = res.body.photos;

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(userFolders.length).toBeGreaterThan(0);
        expect(userFolders.includes(testFolder)).toBeTruthy();
        expect(userPhotos.length).toBeGreaterThan(0);
        expect(userPhotos.find(photo => photo.id === testPhoto)).toBeTruthy();
    })

    test('view personal dashboard - not logged in', async () => {
        const res = await req.get(`/dashboard/folders`);
        expect(res.status).toBe(404);
        expect(res.body).toEqual({});
    })
})

// unused route
// describe('GET /dashboard/user (getUserContent)', () => {
//     test('view personal dashboard - admin logged in', async () => {
//         await req.post('/login').send({
//             email: 'admin@gmail.com',
//             password: 'password'
//         })
//         const res = await req.get(`/dashboard/folders`);
//         expect(res.status).toBe(200);
//         expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
//         expect(res.body.folders.length).toBeGreaterThan(0);
//         expect(res.body.photos.length).toBeGreaterThan(0);
//     })

//     test('view personal dashboard - other normal user logged in', async () => {
//         await req.post('/login').send({
//             email: 'user3@gmail.com',
//             password: 'password'
//         })
//         const res = await req.get(`/dashboard/folders`);
//         expect(res.status).toBe(404);
//         expect(res.body).toEqual({});
//     })

//     test('view personal dashboard - not logged in', async () => {
//         const res = await req.get(`/dashboard/folders`);
//         expect(res.status).toBe(404);
//         expect(res.body).toEqual({});
//     })
// })

describe('GET /dashboard/shared (getSharedContent)', () => {
    test('view shared dashboard - logged in', async () => {
        await req.post('/login').send({
            email: 'admin@gmail.com',
            password: 'password'
        })
        const res = await req.get(`/dashboard/shared`);

        const testFolder = 'user3folder';
        const testPhoto = 'aqXevPREVXLz4Ug8gWaB';

        const otherFolders = res.body.folders;
        const otherPhotos = res.body.photos;

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(otherFolders.length).toBeGreaterThan(0);
        expect(otherFolders.includes(testFolder)).toBeTruthy();
        expect(otherPhotos.length).toBeGreaterThan(0);
        expect(otherPhotos.find(photo => photo.id === testPhoto)).toBeTruthy();
    })

    test('view shared dashboard - not logged in', async () => {
        const res = await req.get(`/dashboard/shared`);
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


// getPhotoComments

// getNumLikes??

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