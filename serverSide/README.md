# Crime and Incident Response

This project is for reporting the incidents occur the city to the authorities.

## Folder Structure

- `controllers/`: Contains the logic for handling requests and responses.
- `database/`: Contains the database connection configuration.
- `middlewares/`: Contains middleware functions for handling various tasks.
- `models/`: Contains the database models.
- `routes/`: Contains the route definitions.

## Setup and Run

1. Clone the repository:
   ```bash
   git clone https://github.com/Bile6/Crime-Response-System-.git
   ```

2. Navigate to the project directory:
   ```bash
   cd serverSide
   cd clientSide
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/crimes
   JWT_SECRET=ourpro123
   ```
5. Start the server:
   ```bash
   npm start
   ```