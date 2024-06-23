const { getVehiclesCollection } = require('./database');

exports.createVehicle = async (req, res) => {
  setCorsHeaders(req, res);

  if (req.method === 'OPTIONS') {
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

function setCorsHeaders(req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
}
