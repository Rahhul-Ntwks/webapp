# WebApp

## Overview
WebApp is a simple web application for managing user accounts. It allows users to create, get, and update user information.

## Features
- User registration
- User authentication using basic authentication
- Profile management (update user information)
- Integration tests using Jest
- GitHub Actions workflow for automated testing

## Technologies Used
- Sequelize
- PostgreSQL
- Express.js
- Jest
- GitHub Actions

## Dependencies

- [Express](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js

## Authentication

The API endpoints require basic authentication. Ensure that you include the correct credentials (username and password) in the request headers to access the endpoints.

## Installation
To install and set up this web application locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Rahhul1309/webapp.git

## Routes

- **POST** `/v1/user`: Create a new user.
- **GET** `/v1/user/self`: Get user details by ID.
- **PUT** `/api/user/self`: Update user details by ID.

2. Install the dependencies :
   npm install

3. Run the automation tests :
   npx jest

