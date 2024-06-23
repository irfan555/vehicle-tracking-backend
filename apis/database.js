const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
let db;

async function connectToDatabase() {
  if (!db) {
    const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db('locationsdb');
  }
  return db;
}

async function getVehiclesCollection() {
  const database = await connectToDatabase();
  return database.collection('vehicles');
}

async function getVehicleLocationsCollection() {
  const database = await connectToDatabase();
  return database.collection('vehicleLocations');
}

module.exports = { connectToDatabase, getVehiclesCollection, getVehicleLocationsCollection };
