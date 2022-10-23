import { app } from '../app.js';
// import request from 'supertest';
import supertest from 'supertest';
import { describe, test, beforeAll, afterAll } from '@jest/globals';
import { async } from '@firebase/util';

const req = supertest(app);

describe('accept a user', () => {
    //new user = {
        // id: xxxx
        // last: xxxx
        // key: xxxx
    //}

    test('user do not exist and key is not correct', async () => {
        const res = await req.get('/accept/ddfdfsdfsdf/sdfsdfdsfdsfs');
        expect(res.status).toBe(404);
    })

    test('user role is not pending', async () => {
        const res = await req.get('/accept/0W0zGi4pu6ReJcFRKnyBW33gPPV2/905d3a0a-641f-44d0-8a62-7108e64678db');
        expect(res.status).toBe(404);
    })

    test('user key is not correct', async () => {
        const res = await req.get('/accept/b13fBvo1Jlf8fVOpgnaP7IaBchV2/898sdfs8998sdfsdfsdfdsfsdf909sdfsddf');
        expect(res.status).toBe(404);
    })

    // test('user is accepted', async () => {
    //     const res = await req.get('/accept/b13fBvo1Jlf8fVOpgnaP7IaBchV2/4183c21f-9acd-45a0-affd-36b9af10a1c6');
        
    //     //expect(res.body.secretKey).not.toBe('49853b68-be85-459c-bfa9-b6ff47c79c15')
    //     expect(res.status).toBe(200); //200
    // })
})

describe('ban a user', () => {

    test('user do not exist and key is not correct', async () => {
        const res = await req.get('/ban/ddfdfsdfsdf/sdfsdfdsfdsfs');
        expect(res.status).toBe(401);
    })

    test('user role is not pending', async () => {
        const res = await req.get('/ban/0W0zGi4pu6ReJcFRKnyBW33gPPV2/905d3a0a-641f-44d0-8a62-7108e64678db');
        expect(res.status).toBe(401);
    })

    test('user key is not correct', async () => {
        const res = await req.get('/ban/b13fBvo1Jlf8fVOpgnaP7IaBchV2/898sdfs8998sdfsdfsdfdsfsdf909sdfsddf');
        expect(res.status).toBe(401);
    })

    // test('user is bannd', async () => {
    //     const res = await req.get('/ban/b13fBvo1Jlf8fVOpgnaP7IaBchV2/898sdfs8998sdfsdfsdfdsfsdf909sdfsddf');
    //     expect(res.status).toBe(404); //200
    //     expect(res.body.secretKey).not.toBe('898sdfs8998sdfsdfsdfdsfsdf909sdfsddf')
    // })
})

describe('get all users', () => {
    test("get users, without login", async()=>{
        const res = await req.get('/users');
        expect(res.status).toBe(401);
    })
    
    test('get users, login as other user', async()=>{
        await req.post('/login').send({
            email: 'user3@gmail.com',
            password: 'password'
        })
        const res = await req.get('/users');
        expect(res.status).toBe(401);
    })

    test('get users, login as admin', async()=>{
        await req.post('/login').send({
            email: 'admin@gmail.com',
            password: 'password'
        })
        const res = await req.get('/users');
        expect(res.status).toBe(200);
    })
})