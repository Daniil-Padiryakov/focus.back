const jwt = require("jsonwebtoken");
const {generateNumber} = require("../common");
const request = require("supertest");
const server = require("../../app");

describe('Pomodoro API', () => {
    const token = jwt.sign({id: 226}, process.env.SECRET_KEY, {expiresIn: "24h"})

    it('POST /pomodoro --> created pomodoro', async () => {
        const randomNumber = generateNumber(3)
        const {body, statusCode} = await request(server)
            .post('/api/pomodoro').send({
                "duration": `${randomNumber}`,
                "user_id": 226,
                "category_id": 30
            })

        expect(statusCode).toBe(200)
        expect(body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                duration: expect.any(Number),
                user_id: expect.any(Number),
                category_id: expect.any(Number),
            })
        )
    });

    it('GET /pomodoro --> array categories', async () => {
        const {body, statusCode} = await request(server)
            .get('/api/pomodoro')
            .set('Authorization', `Bearer ${token}`)

        expect(statusCode).toBe(200)
        expect(body).toEqual(
            expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        duration: expect.any(Number),
                        user_id: expect.any(Number),
                        category_id: expect.any(Number),
                    })
                ]
            ))
    });

})
