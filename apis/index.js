const { MongoClient } = require('mongodb');
const moment = require('moment');

// MongoDB connection URI from environment variables
const MONGODB_URI = 'mongodb+srv://mongo-user:irfan589@irf-cluster.ztkdkcc.mongodb.net/?retryWrites=true&w=majority&appName=irf-cluster';

let db;

// Function to connect to MongoDB
async function connectToDatabase() {
  if (!db) {
    const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db('locationsdb');
  }
  return db;
}

// Function to get vehicles collection
async function getVehiclesCollection() {
  const database = await connectToDatabase();
  return database.collection('vehicles');
}

// Function to get vehicle locations collection
async function getVehicleLocationsCollection() {
  const database = await connectToDatabase();
  return database.collection('vehicleLocations');
}

// Google Cloud Function to fetch vehicle data
exports.fetchVehicles = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // stop preflight requests here
    res.status(204).send('');
    return;
  }

  try {
    const collection = await getVehiclesCollection();
    const vehicles = await collection.find({}).toArray();
    res.status(200).json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).send('Error fetching vehicles');
  }
};

// Google Cloud Function to create a new vehicle entry
exports.createVehicle = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // stop preflight requests here
    res.status(204).send('');
    return;
  }

  const { name, model } = req.body;
  if (!name || !model) {
    return res.status(400).send('Name and model are required');
  }

  try {
    const collection = await getVehiclesCollection();
    const result = await collection.insertOne({ name, model });

    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    console.error('Error creating vehicle:', error);
    res.status(500).send('Error creating vehicle');
  }
};

// Google Cloud Function to fetch vehicle locations for a day
exports.fetchVehicleLocationsForDay = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // stop preflight requests here
    res.status(204).send('');
    return;
  }

  const { vehicleId } = req.query;

  // if (!vehicleId || !date) {
  //   return res.status(400).send('Vehicle ID and date are required');
  // }
  if (!vehicleId) {
    return res.status(400).send('Vehicle ID is required');
  }

  try {
    const collection = await getVehicleLocationsCollection();

    // const startOfDay = moment(date).startOf('day').toDate();
    // const endOfDay = moment(date).endOf('day').toDate();

    const vehicleLocations = await collection.find({
      vehicleId: vehicleId,
      // timestamp: { $gte: startOfDay, $lte: endOfDay }
    }).toArray();

    res.status(200).json(vehicleLocations);
  } catch (error) {
    console.error('Error fetching vehicle locations:', error);
    res.status(500).send('Error fetching vehicle locations');
  }
};
