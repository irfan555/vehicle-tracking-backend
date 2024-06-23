# vehicle-tracking-backend

This repository contains the backend APIs, publishers, and subscribers for managing vehicle data and their locations. The backend is designed to be deployed on Google Cloud Functions and uses MongoDB Atlas for the database.

## Prerequisites

- Node.js (v20 or higher)
- npm (v10 or higher)
- Google Cloud SDK (`gcloud`)
- MongoDB Atlas account

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/irfan555/vehicle-tracking-backend.git
cd vehicle-tracking-backend

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

1. Create a MongoDB cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Obtain your MongoDB connection string and add it to your `.env` file.

```bash
cp .env.sample .env
```

Edit the `.env` file and fill in your MongoDB connection string:

```
MONGODB_URI=your_mongodb_connection_string
```

### 4. Initialize Google Cloud Functions

Ensure you are authenticated with Google Cloud SDK:

```bash
gcloud auth login
```

Set your Google Cloud project:

```bash
gcloud config set project your-project-id
```

### 5. Deploy Cloud Functions

Deploy each function individually:

#### Deploy `fetchVehicles`

```bash
gcloud functions deploy fetchVehicles \
--runtime nodejs20 \
--trigger-http \
--allow-unauthenticated \
--env-vars-file .env \
--entry-point fetchVehicles
```

#### Deploy `createVehicle`

```bash
gcloud functions deploy createVehicle \
--runtime nodejs20 \
--trigger-http \
--allow-unauthenticated \
--env-vars-file .env \
--entry-point createVehicle
```

#### Deploy `fetchVehicleLocationsForDay`

```bash
gcloud functions deploy fetchVehicleLocationsForDay \
--runtime nodejs20 \
--trigger-http \
--allow-unauthenticated \
--env-vars-file .env \
--entry-point fetchVehicleLocationsForDay
```

### 6. Deploy Publisher

Navigate to the `publisher` folder and install dependencies:

```bash
cd publisher
npm install
```

Build the publisher using Webpack:

```bash
npm run build
```

Deploy the publisher:

```bash
npm deploy
```

### 7. Deploy Subscriber

Navigate to the `subscriber` folder and install dependencies:

```bash
cd ../subscriber
npm install
```

Deploy the subscriber:

```bash
gcloud functions deploy saveLocation \
--runtime nodejs20 \
--trigger-topic vehicle-tracking \
--entry-point saveLocation
```

### 7. Update `.env` in Frontend

Ensure your frontend application has the correct base URL for the API endpoints. Update the `.env` file in your frontend project:

```
REACT_APP_BASE_URL=https://your-cloud-function-base-url
```

### 8. Run Tests

To run the backend tests:

1. Ensure all required modules are installed:
   
   ```bash
   npm install
   ```

2. Run the tests:

   ```bash
   npm test
   ```

## Usage

Once deployed, you can use the following API endpoints:

- **Fetch Vehicles**: `[GET]/fetchVehicles`
- **Create Vehicle**: `[POST]/createVehicle`
- **Fetch Vehicle Locations for a Day**: `[GET]/fetchVehicleLocationsForDay?vehicleId=<vehicleId>`

## Notes

- Ensure your MongoDB Atlas cluster is accessible from your deployed Google Cloud Functions.
- Update any frontend application to use the correct base URL for API calls.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
```

### Explanation

- **Prerequisites**: Lists necessary tools and accounts.
- **Setup**: Step-by-step instructions to clone the repository, install dependencies, set up environment variables, and deploy functions.
- **Deploy Cloud Functions**: Specific commands to deploy each function with `gcloud`.
- **Run Tests**: Instructions to run backend tests.
- **Usage**: Lists available API endpoints.
- **Notes**: Additional notes on accessing MongoDB and updating frontend configurations.
- **License**: Specifies the project license.
