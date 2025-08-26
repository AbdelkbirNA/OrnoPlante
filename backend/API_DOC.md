# OrnoPlante API Documentation

Welcome to the OrnoPlante API! This document provides details on the available endpoints.

## Base URL

The API is served from: `http://localhost:8080/api`

## Authentication

Most endpoints require a JSON Web Token (JWT) for authentication. To access protected routes, you must include the token in the `Authorization` header of your request.

**Format:** `Authorization: Bearer <YOUR_JWT_TOKEN>`

You can obtain a token by using the `/auth/login` endpoint.

---

## Endpoints

### Authentication

#### `POST /auth/register`

Register a new user.

*   **Request Body:**
    ```json
    {
      "username": "testuser",
      "email": "test@example.com",
      "password": "password123"
    }
    ```
*   **Response (201 Created):**
    ```json
    {
      "message": "User registered successfully"
    }
    ```

#### `POST /auth/login`

Login an existing user and receive a JWT.

*   **Request Body:**
    ```json
    {
      "email": "test@example.com",
      "password": "password123"
    }
    ```
*   **Response (200 OK):**
    ```json
    {
      "token": "ey...",
      "user": {
        "id": 1,
        "username": "testuser",
        "email": "test@example.com"
      }
    }
    ```

---

### Plants

#### `GET /plantes`

Get a list of all plants.

*   **Authentication:** Required.
*   **Response (200 OK):**
    ```json
    [
      {
        "id": 1,
        "name": "Monstera Deliciosa",
        "species": "Monstera deliciosa",
        "description": "A popular houseplant with iconic split leaves."
      }
    ]
    ```

#### `GET /plantes/:id`

Get details for a specific plant.

*   **Authentication:** Required.
*   **Response (200 OK):**
    ```json
    {
      "id": 1,
      "name": "Monstera Deliciosa",
      "species": "Monstera deliciosa",
      "description": "A popular houseplant with iconic split leaves.",
      "imageUrl": "/uploads/plants/monstera.jpg"
    }
    ```

#### `POST /plantes/predict`

Identify a plant from an uploaded image.

*   **Authentication:** Required.
*   **Request:** `multipart/form-data` with a field `image` containing the image file.
*   **Response (200 OK):**
    ```json
    {
      "predictions": [
        {
          "plantName": "Monstera Deliciosa",
          "probability": 0.92
        }
      ]
    }
    ```

---

### Favorites

#### `POST /favorites`

Add a plant to the user's favorites.

*   **Authentication:** Required.
*   **Request Body:**
    ```json
    {
      "plantId": 1
    }
    ```
*   **Response (201 Created):**
    ```json
    {
      "message": "Plant added to favorites"
    }
    ```
