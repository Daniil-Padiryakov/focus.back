const request = require('supertest')
const server = require('./app')
const {response} = require("express");

// describe('Category API', () => {
//     it('GET /category --> array categories', async () => {
//         return await request(app)
//             .get('/api/category')
//             .expect('Content-Type', 'application/json')
//             .expect(200)
//             .then((response) => {
//                 expect(response.body).toEqual(
//                     expect.arrayContaining([
//                         expect.objectContaining({
//                             id: expect.any(Number),
//                             title: expect.any(String),
//                             createdAt: expect.any(String),
//                             updatedAt: expect.any(String),
//                             userId: expect.any(Number)
//                         })
//                     ])
//                 )
//             })
//     });
//     it('POST /category --> create category', () => {
//
//     });
//     it('PUT /category --> update category', () => {
//
//     });
//     it('DELETE /category/id --> delete category', () => {
//
//     });
// })


describe('User API', () => {
    // it('POST /user/registration --> created user', async () => {
    //     await request(server)
    //         .post('/api/user/registration').send({
    //             "email": "zxc@gmail.com",
    //             "password": "12345"
    //         })
    //         .expect(200)
    //         .then((response) => {
    //             expect(JSON.parse(response.body)).toEqual(
    //                 expect.objectContaining({
    //                     id: expect.any(Number),
    //                     email: expect.any(String),
    //                 })
    //             )
    //
    //         })
    // });

    it('POST /user/registration --> created user', async () => {
        const {body, statusCode} = await request(server)
            .post('/api/user/registration').send({
                "email": "zxc@gmail.com",
                "password": "12345"
            })

        expect(statusCode).toBe(200)

        expect(JSON.parse(body)).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                email: expect.any(String),
            })
        )
    });

    it('POST /user/login --> login', async () => {
        const {body, statusCode} = await request(server)
            .post('/api/user/login').send({
                "email": "zxc@gmail.com",
                "password": "12345"
            })

        expect(statusCode).toBe(200)

        expect(JSON.parse(body)).toEqual(
            expect.objectContaining({
                token: expect.any(String),
            })
        )
    });

})


