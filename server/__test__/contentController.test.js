import { app } from '../app.js';
// import request from 'supertest';
import supertest from 'supertest';
import { describe, test, beforeAll, afterAll } from '@jest/globals';

const req = supertest(app);

describe('photos', () => {
    // test('GET /photo/:id', (done) => {
    //     request(app)
    //         .get('/photo/xz1SXB8UtYeIscZs2Qrl')
    //         .expect("Content-Type", /json/)
    //         .expect(200)
    //         .expect((res) => {
    //             res.body.data = 'bruh';  // why tf this pass?
    //         })
    //         .end((err, res) => {
    //             if (err) return done(err);
    //             return done();
    //         });
    // })

    test('GET /photo/:id (getPhotoPage)', async () => {
        await req.post('/login').send({
            email: 'admin@gmail.com',
            password: 'password'
        })
        const res = await req.get('/photo/4LxUxRSxjUMhJR2pID3S');
        expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(res.status).toBe(200);
        expect(res.body.id).toBe('4LxUxRSxjUMhJR2pID3S');
    })

    // test('GET /photo/:id (getPhotoPage)', async () => {
    //     const res = await req.get('/photo/xz1SXB8UtYeIscZs2Qrl');
    //     expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
    //     expect(res.status).toBe(200);
    //     expect(res.body).toBe('bruh');
    // })
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
