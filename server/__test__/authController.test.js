import { app } from '../app.js';
// import request from 'supertest';
// import { setDoc, doc, getDocs, Timestamp, collection, query, where } from 'firebase/firestore';
// import getCurrUserID from '../controllers/contentController';
// import { db, auth } from '../config/firebase.js';
import supertest from 'supertest';
import { expect, describe, test /* beforeAll, afterAll */ } from '@jest/globals';

const req = supertest(app);

describe('authentication', () => {
  // test('POST /register (registerUser)', async () => {
  //     const registerRes = await req.post('/register').send({
  //         firstName: 'test1',
  //         lastName: 'jest_test',
  //         email: 'jestTest1@gmail.com',
  //         password: 'password'
  //     })
  //     // check if new user is created with pending as role
  //     expect(registerRes.headers['content-type']).toEqual(expect.stringContaining('json'));
  //     expect(registerRes.status).toBe(200);
  //     expect(registerRes.body.firstName).toBe('test1');
  //     expect(registerRes.body.lastName).toBe('jest_test');
  //     expect(registerRes.body.role).toBe('pending');

  //     //check database
  //     const userRef = collection(db, "users");
  //     const q = query(userRef, where("firstName", "==", "test1"), where("lastName", "==", "jest_test"));
  //     var count = 0;
  //     const userSnap = await getDocs(q);
  //     userSnap.forEach((doc) => {
  //         count++;
  //       });
  //     expect(count).toBe(1);

  // })

  test('POST /login - user role (signInUser)', async () => {
    const loginRes = await req.post('/login').send({
      email: 'admin@gmail.com',
      password: 'password'
    });
    // check if login was succesful

    expect(loginRes.status).toBe(200);
    expect(loginRes.body).not.toEqual({});

    await req.post('/logout');
  });

  // DONT CHANGE THE BANNED STATUS OF USER 2!!!
  test('POST /login - ban role (signInUser)', async () => {
    const loginRes = await req.post('/login').send({
      email: 'user2@gmail.com',
      password: 'password'
    });
    // check if login was succesful
    expect(loginRes.status).toBe(200);
    expect(loginRes.body).toEqual({});

    await req.post('/logout');
  });
});

// registerUser,
// signInUser,
// signOutUser
