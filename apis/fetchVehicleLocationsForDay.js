const { getVehicleLocationsCollection } = require('./database');

exports.fetchVehicleLocationsForDay = async (req, res) => {
  setCorsHeaders(req, res);

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  const { vehicleId } = req.query;
  if (!vehicleId) {
    return res.status(400).send('Vehicle ID is required');
  }

  try {
    const collection = await getVehicleLocationsCollection();
    const vehicleLocations = await collection.find({ vehicleId }).toArray();
    res.status(200).json(vehicleLocations);
  } catch (error) {
    console.error('Error fetching vehicle locations:', error);
    res.status(500).send('Error fetching vehicle locations');
  }
};

function setCorsHeaders(req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
}
