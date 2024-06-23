const request = require('supertest');
const app = require('./index');
require('dotenv').config();


const baseURL = process.env.REACT_APP_BASE_URL;

describe('Backend API Tests', () => {
  let testVehicleId;

  // Test case for fetching vehicles
  it('should fetch vehicles', async () => {
    const response = await request(app).get('${baseURL}/fetchVehicles');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    // More complex cases later on
  });

  // Test case for creating a new vehicle
  it('should create a new vehicle', async () => {
    const newVehicle = { name: 'Test Vehicle', model: 'Test Model' };
    const response = await request(app)
      .post('${baseURL}/createVehicle')
      .send(newVehicle);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    testVehicleId = response.body.id; // Store the created vehicle id for subsequent tests
  });

  // Test case for fetching vehicle locations for a day
  it('should fetch vehicle locations for a day', async () => {
    if (!testVehicleId) {
      throw new Error('No test vehicle ID available');
    }
    const response = await request(app).get(`${baseURL}/fetchVehicleLocationsForDay?vehicleId=${testVehicleId}&date=2024-06-25`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    // we can write more practical assertions later on like -> expect(response.body.length).toBeGreaterThan(0);
  });

  afterAll(async () => {
    // cleanup logic like deleting test data created during tests)
  });
});


