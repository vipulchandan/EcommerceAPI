# E-commerce Project

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
3. [Usage](#usage)
   - [API Documentation](#api-documentation)
   - [Authentication](#authentication)
4. [API Endpoints](#api-endpoints)
   - [User Management](#user-management)
   - [Product Management](#product-management)
   - [Order Management](#order-management)
5. [Contributing](#contributing)
6. [License](#license)

## Introduction

Welcome to the E-commerce Project! This web application provides a comprehensive set of APIs for managing an online store. It includes functionalities for user management, product management, and order processing.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your local machine.
- MongoDB set up and running.

### Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/vipulchandan/EcommerceAPI.git
   ```

2. Navigate to the project directory:

   ```shell
   cd EcommerceAPI
   ```

3. Install the project dependencies:

   ```shell
   npm install
   ```

4. Create a `.env` file in the root directory and configure your environment variables, including the MongoDB connection string and JWT secret key:

   ```env
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   ```

5. Start the server:

   ```shell
   npm start
   ```

The server should now be running at `http://localhost:5000`.

## Usage

### API Documentation

You can access the API documentation using Swagger UI. Open your web browser and go to `http://localhost:5000/docs` to explore and test the API endpoints interactively.

### Authentication

Some API endpoints require authentication using a Bearer token. To obtain a token:

1. Register as a new user using the `/api/users/register` endpoint.
2. Log in using the `/api/users/login` endpoint to obtain an authentication token.
3. Include the token in the `Authorization` header of your requests.

## API Endpoints

### User Management

#### Register a New User

- **Endpoint:** `/api/users/register`
- **Method:** POST
- **Description:** Register a new user account.
- **Authentication:** Not required.
- **Request Body:**
  - `name` (string, required): User's name.
  - `email` (string, required): User's email.
  - `password` (string, required): User's password.
- **Responses:**
  - 201: User registered successfully.
  - 400: Bad request, missing or invalid data.
  - 500: Internal server error.

#### Log In

- **Endpoint:** `/api/users/login`
- **Method:** POST
- **Description:** Log in and obtain an authentication token.
- **Authentication:** Not required.
- **Request Body:**
  - `email` (string, required): User's email.
  - `password` (string, required): User's password.
- **Responses:**
  - 200: Login successful. Token provided.
  - 400: Bad request, missing or invalid data.
  - 401: Unauthorized, invalid credentials.
  - 500: Internal server error.

#### Get User Profile

- **Endpoint:** `/api/users/profile`
- **Method:** GET
- **Description:** Get user profile information.
- **Authentication:** Bearer token required.
- **Responses:**
  - 200: User profile retrieved successfully.
  - 401: Unauthorized, token not provided or invalid token.
  - 500: Internal server error.

#### Update User Profile

- **Endpoint:** `/api/users/profile`
- **Method:** PUT
- **Description:** Update user profile information.
- **Authentication:** Bearer token required.
- **Request Body:**
  - `name` (string, optional): New user name.
  - `email` (string, optional): New user email.
  - `password` (string, optional): New user password.
- **Responses:**
  - 200: User profile updated successfully.
  - 400: Bad request, missing or invalid data.
  - 401: Unauthorized, invalid token.
  - 500: Internal server error.

### Product Management

#### Create a New Product

- **Endpoint:** `/api/products`
- **Method:** POST
- **Description:** Create a new product.
- **Authentication:** Bearer token required.
- **Request Body:**
  - `title` (string, required): Product title.
  - `price` (number, required): Product price.
  - `description` (string, required): Product description.
  - `availability` (boolean, optional): Product availability.
  - `categoryId` (string, required): Product category ID.
- **Responses:**
  - 201: Product created successfully.


  - 400: Bad request, missing or invalid data.
  - 401: Unauthorized, invalid token.
  - 500: Internal server error.

#### Get a List of Products

- **Endpoint:** `/api/products`
- **Method:** GET
- **Description:** Get a list of products.
- **Authentication:** Not required.
- **Responses:**
  - 200: Products retrieved successfully.
  - 500: Internal server error.

#### Get Product Details by ID

- **Endpoint:** `/api/products/:productId`
- **Method:** GET
- **Description:** Get product details by ID.
- **Authentication:** Not required.
- **Responses:**
  - 200: Product details retrieved successfully.
  - 400: Bad request, invalid product ID.
  - 404: Product not found.
  - 500: Internal server error.

#### Update Product Details by ID

- **Endpoint:** `/api/products/:productId`
- **Method:** PUT
- **Description:** Update product details by ID.
- **Authentication:** Bearer token required.
- **Request Body:** Any valid product fields you want to update.
- **Responses:**
  - 200: Product details updated successfully.
  - 400: Bad request, invalid product ID or data.
  - 401: Unauthorized, invalid token.
  - 404: Product not found.
  - 500: Internal server error.

#### Delete a Product by ID

- **Endpoint:** `/api/products/:productId`
- **Method:** DELETE
- **Description:** Delete a product by ID.
- **Authentication:** Bearer token required.
- **Responses:**
  - 200: Product deleted successfully.
  - 400: Bad request, invalid product ID.
  - 401: Unauthorized, invalid token.
  - 404: Product not found.
  - 500: Internal server error.

### Order Management

#### Place an Order

- **Endpoint:** `/api/users/:userId/orders`
- **Method:** POST
- **Description:** Place an order with products from the user's cart.
- **Authentication:** Bearer token required.
- **Request Body:**
  - `cartId` (string, required): ID of the user's cart.
- **Responses:**
  - 201: Order placed successfully.
  - 400: Bad request, missing or invalid data.
  - 401: Unauthorized, invalid token.
  - 403: Unauthorized access.
  - 404: User, cart, or product not found.
  - 500: Internal server error.

#### Get Order History

- **Endpoint:** `/api/users/:userId/orders`
- **Method:** GET
- **Description:** Get the order history for an authenticated user.
- **Authentication:** Bearer token required.
- **Responses:**
  - 200: Order history fetched successfully.
  - 400: Bad request, missing or invalid data.
  - 401: Unauthorized, invalid token.
  - 403: Unauthorized access.
  - 404: User or cart not found.
  - 500: Internal server error.

#### Get Order Details by ID

- **Endpoint:** `/api/users/:userId/orders/:orderId`
- **Method:** GET
- **Description:** Get detailed information about a specific order by ID.
- **Authentication:** Bearer token required.
- **Responses:**
  - 200: Order details fetched successfully.
  - 400: Bad request, invalid user or order ID.
  - 401: Unauthorized, invalid token.
  - 403: Unauthorized access.
  - 404: User, order, or product not found.
  - 500: Internal server error.

## Contributing

Contributions to this project are welcome. Feel free to open issues, submit pull requests, or suggest improvements to help make this project better.
