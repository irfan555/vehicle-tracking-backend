#!/bin/bash

gcloud functions deploy fetchVehicles \
  --runtime=nodejs20 \
  --trigger-http \
  --allow-unauthenticated

gcloud functions deploy createVehicle \
  --runtime=nodejs20 \
  --trigger-http \
  --allow-unauthenticated

gcloud functions deploy fetchVehicleLocationsForDay \
  --runtime=nodejs20 \
  --trigger-http \
  --allow-unauthenticated
