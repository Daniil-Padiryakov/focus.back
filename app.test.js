const request = require('supertest')
const app = require('./app')
const {response} = require("express");

describe('Category API', () => {
    it('GET /category --> array categories', async () => {
        return await request(app)
            .get('/api/category')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            title: expect.any(String),
                            createdAt: expect.any(String),
                            updatedAt: expect.any(String),
                            userId: expect.any(Number)
                        })
                    ])
                )
            })
    });
    it('POST /category --> create category', () => {

    });
    it('PUT /category --> update category', () => {

    });
    it('DELETE /category/id --> delete category', () => {

    });
})
