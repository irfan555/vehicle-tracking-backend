const { getVehiclesCollection } = require('./database');

exports.fetchVehicles = async (req, res) => {
  setCorsHeaders(req, res);

  if (req.method === 'OPTIONS') {
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

function setCorsHeaders(req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
}
