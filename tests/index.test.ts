import request from "supertest";
import app from "../src/index";

import { expect } from "@jest/globals";
import type { MatcherFunction } from "expect";

// test('GetLessons', async () => {
//     const _request = await request(app)
//         .get('/')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .expect(({ body }) => {
//             expect(body.success).toBe(true)
//             expect(body.lessons).toBeInstanceOf(Array)

//             for (const lesson of body.lessons) {

//                 expect(lesson).toEqual(expect.objectContaining({
//                     id: expect.any(Number),
//                     date: expect.any(String),
//                     title: expect.any(String),
//                     status: expect.any(Number),
//                     teachers: expect.any(Array),
//                     students: expect.any(Array)
//                   }))

//             }

//         });

// })
