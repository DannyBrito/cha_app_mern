const request = require('supertest');
const app = require('../../../../bin/app');
const serverHandler = require('../../../test-helpers/server-handler');

const BASE_URL = '/api/v1/users'
describe('Testing User Routes',()=>{
    
    beforeAll(async ()=> {
        await serverHandler.connect()
     })

    afterAll(serverHandler.disconnect)

    test('It should response to a GET request',async()=>{
        const response = await request(app).get(BASE_URL)
        expect(response.statusCode).toBe(200)
    })

    test('It should response to a DELETE request',async()=>{
        const response = await request(app).delete(`${BASE_URL}/595h4k5hkjw`)
        expect(response.statusCode).toBe(400)
    })


})