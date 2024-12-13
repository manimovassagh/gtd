# GTD Task Manager Backend API Documentation

This backend provides a RESTful API to manage users and tasks following the **Getting Things Done (GTD)** methodology. Below is a detailed list of available endpoints.

## Endpoints

### Authentication and User Management

#### POST `/api/auth/register`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "securepassword"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully",
    "userId": 1
  }
  ```

#### POST `/api/auth/login`
- **Description**: Authenticate a user and return a JWT token.
- **Request Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "securepassword"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt_token_here"
  }
  ```

#### GET `/api/auth/profile`
- **Description**: Get the current logged-in user’s profile using the JWT token.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer jwt_token_here"
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "user"
  }
  ```

### Task Management

#### GET `/api/tasks`
- **Description**: Get all tasks for the current user.
- **Query Parameters**: `status` (e.g., `inbox`, `next_action`).
- **Response**:
  ```json
  [
    {
      "id": 1,
      "title": "Buy groceries",
      "description": "Get milk, eggs, and bread",
      "status": "inbox",
      "dueDate": "2024-12-14T00:00:00Z",
      "contextTags": "@home",
      "userId": 1
    }
  ]
  ```

#### POST `/api/tasks`
- **Description**: Create a new task.
- **Request Body**:
  ```json
  {
    "title": "Buy groceries",
    "description": "Get milk, eggs, and bread",
    "status": "inbox",
    "dueDate": "2024-12-14T00:00:00Z",
    "contextTags": "@home"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Task created successfully",
    "taskId": 1
  }
  ```

#### PATCH `/api/tasks/:id`
- **Description**: Update an existing task.
- **Request Body**:
  ```json
  {
    "title": "Buy groceries and vegetables",
    "status": "next_action"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Task updated successfully"
  }
  ```

#### DELETE `/api/tasks/:id`
- **Description**: Delete a task by its ID.
- **Response**:
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

### Admin-Specific Endpoints (Only for admin users)

#### GET `/api/admin/users`
- **Description**: Get a list of all users.
- **Response**:
  ```json
  [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "role": "user"
    }
  ]
  ```

#### GET `/api/admin/users/:id`
- **Description**: Get details of a specific user, including their tasks.
- **Response**:
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "user",
    "tasks": [
      {
        "id": 1,
        "title": "Buy groceries",
        "description": "Get milk, eggs, and bread",
        "status": "inbox",
        "dueDate": "2024-12-14T00:00:00Z",
        "contextTags": "@home"
      }
    ]
  }
  ```

#### DELETE `/api/admin/users/:id`
- **Description**: Delete a user and all their tasks.
- **Response**:
  ```json
  {
    "message": "User deleted successfully"
  }
  ```

### Utility Endpoints

#### GET `/api/health`
- **Description**: Check the health of the server.
- **Response**:
  ```json
  {
    "status": "OK",
    "uptime": 123456
  }
  ```

#### GET `/api/context-tags`
- **Description**: Get a list of commonly used context tags for tasks.
- **Response**:
  ```json
  [
    "@home",
    "@work",
    "@errands"
  ]
  ```
