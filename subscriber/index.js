const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://mongo-user:irfan589@irf-cluster.ztkdkcc.mongodb.net/?retryWrites=true&w=majority&appName=irf-cluster'; // Replace with your MongoDB connection string
let client;

async function connectToDatabase() {
  if (!client || !client.isConnected()) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
  }
  return client.db('locationsdb').collection('vehicleLocations');
}

exports.saveLocation = async (message, context) => {
  const collection = await connectToDatabase();

  try {
    const data = JSON.parse(Buffer.from(message.data, 'base64').toString());
    await collection.insertOne(data);
    console.log(`Saved location: ${data.latitude}, ${data.longitude}`);
  } catch (error) {
    console.error('Error saving location:', error);
  }
};
