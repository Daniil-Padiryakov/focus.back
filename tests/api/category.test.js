const jwt = require("jsonwebtoken");
const {generateString} = require("../common");
const request = require("supertest");
const server = require("../../app");

describe('Category API', () => {
    const token = jwt.sign({id: 226}, process.env.SECRET_KEY, {expiresIn: "24h"})

    it('POST /category --> created category', async () => {
        const randomString = generateString(10)
        const {body, statusCode} = await request(server)
            .post('/api/category').send({
                "title": `${randomString}`,
                "user_id": 226
            })
            .set('Authorization', `Bearer ${token}`)

        expect(statusCode).toBe(200)

        expect(body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                title: expect.any(String),
                user_id: expect.any(Number),
            })
        )
    });

    it('GET /category --> array categories', async () => {
        const {body, statusCode} = await request(server)
            .get('/api/category')
            .set('Authorization', `Bearer ${token}`)

        expect(statusCode).toBe(200)
        expect(body).toEqual(
            expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        title: expect.any(String),
                        user_id: expect.any(Number),
                    })
                ]
            ))
    });

    it('PUT /category --> update category', async () => {
        const randomString = generateString(10)
        const {body, statusCode} = await request(server)
            .put('/api/category').send({
                id: 30,
                title: 'updated category',
                user_id: 226,
            })
            .set('Authorization', `Bearer ${token}`)

        expect(statusCode).toBe(200)
        expect(body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                title: expect.any(String),
                user_id: expect.any(Number),
            })
        )
    });

    it('DELETE /category --> delete category', async () => {
        const {body, statusCode} = await request(server)
            .delete('/api/category/22')
            .set('Authorization', `Bearer ${token}`)

        expect(statusCode).toBe(200)
        expect(body).toEqual({rowCount: 1})
    });
})
