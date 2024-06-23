const { PubSub } = require('@google-cloud/pubsub');

const pubsub = new PubSub();
const topicName = 'vehicle-tracking';

exports.publishLocation = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Add logging to inspect request body

    const { vehicleId, latitude, longitude } = req.body;

    if (!vehicleId || !latitude || !longitude) {
      res.status(400).send('Vehicle ID, latitude, and longitude are required!');
      return;
    }

    const messageBuffer = Buffer.from(JSON.stringify({ vehicleId, latitude, longitude, timestamp: new Date() }));

    await pubsub.topic(topicName).publish(messageBuffer);
    res.status(200).send('Location published successfully.');
  } catch (error) {
    console.error('Error publishing message:', error);
    res.status(500).send('Internal Server Error');
  }
};
