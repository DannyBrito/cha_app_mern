const request = require('supertest');
const app = require('../../../../bin/app');
const serverHandler = require('../../../test-helpers/server-handler');

const User = require('../../../../models/v1/user.model');

const BASE_URL = '/api/v1/users'
describe('Testing User Routes',()=>{
    
    beforeAll(async ()=> {
        await serverHandler.connect()
        await User.deleteMany({})
     })

    afterAll(serverHandler.disconnect)

    test('It should response to a GET request',async()=>{
        const response = await request(app).get(BASE_URL)
        expect(response.statusCode).toBe(200)
    })

})