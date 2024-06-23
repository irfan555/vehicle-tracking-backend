const { fetchVehicles } = require('./fetchVehicles');
const { createVehicle } = require('./createVehicle');
const { fetchVehicleLocationsForDay } = require('./fetchVehicleLocationsForDay');

exports.fetchVehicles = fetchVehicles;
exports.createVehicle = createVehicle;
exports.fetchVehicleLocationsForDay = fetchVehicleLocationsForDay;
