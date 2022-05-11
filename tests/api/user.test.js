const {generateString} = require("../common");
const request = require("supertest");
const server = require("../../app");


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
        const randomString = generateString(16)
        const {body, statusCode} = await request(server)
            .post('/api/user/registration').send({
                "email": `${randomString}@gmail.com`,
                "password": `${randomString}`
            })

        expect(statusCode).toBe(200)

        expect(body).toEqual(
            expect.objectContaining({
                token: expect.any(String),
            })
        )
    });

    it('POST /user/registration --> not created same user', async () => {
        const {body, statusCode} = await request(server)
            .post('/api/user/registration').send({
                "email": "zxc@gmail.com",
                "password": "12345"
            })

        expect(statusCode).toBe(400)
        expect(body).toEqual(
            expect.objectContaining({
                message: expect.any(String),
            })
        )
    });

    it('POST /user/login --> login', async () => {
        const {body, statusCode} = await request(server)
            .post('/api/user/login').send({
                "email": "test@gmail.com",
                "password": "12345"
            })

        expect(statusCode).toBe(200)
        expect(body).toEqual(
            expect.objectContaining({
                token: expect.any(String),
            })
        )
    });

    it('POST /user/login --> not logged not exist user', async () => {
        const {body, statusCode} = await request(server)
            .post('/api/user/login').send({
                "email": "notexistusernotexistuser@gmail.com",
                "password": "12345"
            })

        expect(statusCode).toBe(400)
        expect(body).toEqual(
            expect.objectContaining({
                message: expect.any(String),
            })
        )
    });

    it('POST /user/login --> not logged with incorrect password', async () => {
        const {body, statusCode} = await request(server)
            .post('/api/user/login').send({
                "email": "test@gmail.com",
                "password": "11111"
            })

        expect(statusCode).toBe(400)
        expect(body).toEqual(
            expect.objectContaining({
                message: expect.any(String),
            })
        )
    });

})
