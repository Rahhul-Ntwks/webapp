
The server will start, and you should see output indicating that the server is running on a specific port.

## Routes

- **POST** `/v1/user`: Create a new user.
- **GET** `/v1/user/self`: Get user details by ID.
- **PUT** `/api/user/self`: Update user details by ID.

## Authentication

The API endpoints require basic authentication. Ensure that you include the correct credentials (username and password) in the request headers to access the endpoints.

## Dependencies

- [Express](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js.
- [dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from a `.env` file into `process.env`.

