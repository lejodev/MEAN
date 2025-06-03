## Live project
https://mean-4443lc9zb-lejodevs-projects.vercel.app/dashboard

# Running the Project Locally

Follow these steps to set up and run the project on your local machine.

## StepsSteps to run the project locally

***Clone the repo:***

   ```shell script
git clone https://github.com/lejodev/MEAN.git
```
 ***Initialize git :***
   ```shell script
 git init
```

 ***go to backend:***
   ```shell script
 cd backend
```
 
 ***install dependencies:***
   ```shell script 
 npm run install
```

 ***Run the backend:***
   ```shell script

  npm run dev
```

 ***Go to frontend:***
   ```shell script
cd ../frontend
```

 ***install dependencies:***
   ```shell script
 npm run install
```

 ***run the frontend: ***
   ```shell script
npm run start
```


# Task Management Application Features Overview

## Core Features

- Create new tasks with title, description, and due date
- Search tasks by its title
- Update existing tasks
- Confirmation dialog when deleteing a task
- Delete tasks
- Task history tracking

## Technical Features
- Backend (Node.js/Express)
- Frontend (Angular)
- Architecture: MVC pattern
- Database: MongoDB with Mongoose

## Middleware Stack:
- Request logging
- Error handling

## History tracking
- Due date validation

# Task Management API Documentation

## Base URL
```
https://mean-pof3.onrender.com/api/tasks
```

## Endpoints

### Get All Tasks
Retrieves all tasks sorted by due date.

- **URL:** `/all`
- **Method:** `GET`
- **Auth required:** No
- **Response Format:** JSON

**Success Response:**
```json
[
  {
    "_id": "string",
    "title": "string",
    "description": "string",
    "dueDate": "YYYY-MM-DD",
    "status": "string",
    "history": [
      {
        "field": "string",
        "oldValue": "any",
        "newValue": "any",
        "changedAt": "datetime"
      }
    ]
  }
]
```

### Get Task by ID
Retrieves a specific task by its ID.

- **URL:** `/:id`
- **Method:** `GET`
- **URL Params:** 
  - Required: `id=[string]`
- **Response Format:** JSON

**Success Response:**
```json
{
  "_id": "string",
  "title": "string",
  "description": "string",
  "dueDate": "YYYY-MM-DD",
  "status": "string",
  "history": []
}
```

### Create Task
Creates a new task.

- **URL:** `/`
- **Method:** `POST`
- **Data Params:**
```json
{
  "title": "string",
  "description": "string",
  "dueDate": "YYYY-MM-DD",
  "status": "string"
}
```
- **Response Format:** JSON

### Update Task
Updates an existing task.

- **URL:** `/:id`
- **Method:** `PUT`
- **URL Params:**
  - Required: `id=[string]`
- **Data Params:**
```json
{
  "title": "string",
  "description": "string",
  "dueDate": "YYYY-MM-DD",
  "status": "string"
}
```
- **Middleware:** Validates due date format
- **Response Format:** JSON

### Delete Task
Deletes a specific task.

- **URL:** `/:taskId`
- **Method:** `DELETE`
- **URL Params:**
  - Required: `taskId=[string]`
- **Response Format:** JSON

## Error Responses

**404 Not Found:**
```json
{
  "error": "Task not found"
}
```

**400 Bad Request:**
```json
{
  "error": "Invalid due date format"
}
```

**500 Server Error:**
```json
{
  "error": "Internal server error"
}
```

## Notes
- All dates should be in `YYYY-MM-DD` format
- The history array tracks all changes made to the task
- Task status can be: "pending", "in-progress", "completed" 

* the project willl be served on the following link: http://localhost:4200/dashboard*

Convert this text into a .md format

## Overview
  
**Objective:** Build a fully functional CRUD application for managing "Tasks" using the MEAN stack (MongoDB, Express.js, Angular, and Node.js). Expand the basic application requirements to include advanced features to assess logical thinking and strong technical knowledge in the MEAN stack.

### Summary of Differences from Original Test

This advanced version builds upon the original test by adding:
- **Task Priority:** An optional priority field with enum values (Low, Medium, High).
- **Tags:** An optional array for categorizing tasks.
- **Task History Tracking:** Logs changes made to tasks, such as updates and status changes.
- **Enhanced Filters:** Query tasks by priority and tags.
- **Additional Frontend Features:** Includes a search bar, dynamic tag input, and history view.

Each Task will have the following attributes:
- **Title** (String, required)
- **Description** (String, optional)
- **Status** (Enum: Pending, In Progress, Completed, required)
- **Priority** (Enum: Low, Medium, High, optional, defaults to Medium)
- **Due Date** (Date, required)
- **Tags** (Array of Strings, optional, allows task categorization)

---

## Task Requirements

### 1. Backend Development

Develop the backend using **Node.js**, **Express.js**, and **MongoDB** with the following functionality:

#### **REST API Endpoints**

1. **POST /tasks**
   - Create a new task.
   - **Validation:** Ensure the following:
     - `title`, `status`, and `dueDate` are provided.
     - `priority` defaults to `Medium` if not provided.
     - `tags` can only contain unique values.
     - `dueDate` cannot be in the past.
   - **Response:**
     - Return the created task object with a status code of 201 Created.
     - Return a detailed error message for validation failures.

2. **GET /tasks**
   - Retrieve all tasks.
   - **Query Parameters (Optional):**
     - `status`: Filter tasks by their status (e.g., `GET /tasks?status=Completed`).
     - `priority`: Filter tasks by priority (e.g., `GET /tasks?priority=High`).
     - `tags`: Search for tasks containing specific tags (e.g., `GET /tasks?tags=work,urgent`).
     - `dueDate range`: Fetch tasks within a date range (e.g., `GET /tasks?startDate=2023-01-01&endDate=2023-12-31`).
   - **Response:**
     - Return a list of tasks in JSON format, sorted by `dueDate` in ascending order.

3. **GET /tasks/:id**
   - Retrieve a specific task by ID.
   - **Error Handling:**
     - Return a 404 error if the task is not found.
   - **Response:**
     - Return the task object in JSON format.

4. **PUT /tasks/:id**
   - Update an existing task.
   - **Features:**
     - Allow partial updates.
     - Prevent changing `status` directly from `Pending` to `Completed`.
   - **Error Handling:**
     - Return a 404 error if the task does not exist.
   - **Response:**
     - Return the updated task object.

5. **DELETE /tasks/:id**
   - Delete a specific task by ID.
   - **Error Handling:**
     - Return a 404 error if the task does not exist.
   - **Response:**
     - Return a status code of 204 No Content.

#### **Database**

- Use **MongoDB** to store tasks.
- Define a Mongoose schema with:
  - `title`: Required, string, minimum length of 3 characters.
  - `description`: Optional, string, maximum length of 500 characters.
  - `status`: Required, enum with values `Pending`, `In Progress`, `Completed`.
  - `priority`: Optional, enum with values `Low`, `Medium`, `High`.
  - `dueDate`: Required, must be a valid future date.
  - `tags`: Array of unique strings (optional).
  - **Indexes:** Add indexes on `dueDate` and `status` for optimized querying.

#### **Additional Features**

1. **Request Logging:** Middleware to log each request's endpoint, method, and timestamp.
2. **Error Handling:** Centralized error handling for invalid requests or server errors.
3. **Task History Tracking:** Maintain a log of changes for each task (e.g., status changes, updates). Implement a sub-document in the schema to store the change history.

---

### 2. Frontend Development

Develop the frontend using **Angular** with the following functionality:

#### **Task List**

- Display all tasks in a table.
- **Columns to Display:**
  - Title
  - Status
  - Priority
  - Due Date
  - Tags
  - Actions (Edit, Delete)
- **Filter Options:**
  - Filter tasks by `status`, `priority`, or specific tags.
- **Search Bar:**
  - Implement a search bar to search tasks by title.

#### **Task Form**

- **Create a New Task:**
  - Form fields: Title, Due Date, Status, Priority, Tags.
  - **Validation:**
    - Title: Required, minimum length of 3 characters.
    - Due Date: Cannot be a past date.
    - Tags: Enforce unique values.
- **Edit an Existing Task:**
  - Prefill the form with the task's current details.
- **Dynamic Tag Input:**
  - Add and remove tags dynamically.

#### **Task Deletion**

- Implement a confirmation dialog to confirm deletion.

#### **Styling**

- Use a CSS framework (e.g., **Bootstrap**) for a responsive, user-friendly design.

#### **Additional Features**

1. **Pagination:** Add pagination for large task lists.
2. **Sorting Options:** Enable sorting by `dueDate`, `priority`, or `status`.
3. **Task History View:** Display the change history for each task.
4. **Angular Material:** Use Angular Material for form elements and UI components for a modern look.

---

## General Requirements

### 1. Code Quality

- Follow best practices for code organization.
- Use meaningful, descriptive variable and function names.
- Include comments for key code sections.
- Follow linting rules using **ESLint**.

### 2. Version Control

- Use **Git** for version control.
- Provide a GitHub repository with a clear commit history.

### 3. Deployment

- Deploy the application to a platform like **Heroku**, **Vercel**, or **AWS**.
- Include the live URL in the documentation.
- Ensure environment variables are properly configured for deployment.

---

## Submission

### Instructions for Submission

1. **Fork the Repository**
   - Candidates should fork this repository to their own GitHub account.
   - This ensures they work independently and can demonstrate their ability to manage the project setup and version control.

2. **Complete the Test**
   - Implement all the required features and functionality as outlined in this document.
   - Commit changes regularly with meaningful commit messages to showcase the progression of work.

3. **Documentation**
   - Update the `README.md` in the forked repository with:
     - Clear instructions for setting up and running the project locally.
     - An overview of the implemented features.
     - API documentation for the backend endpoints.
     - Steps to access the live deployed application (if applicable).

4. **Deployment** (Optional)
   - Deploy the completed application to a platform such as **Heroku**, **Vercel**, or **AWS**.
   - Include the live URL in the updated `README.md`.

5. **Submit the Repository Link**
   - Once the test is complete, share the link to the forked repository (e.g., via a form or email).
   - Ensure the repository is public or that access is granted to the reviewer.

6. **Evaluation Checklist**
   - Ensure that the following are included before submission:
     - Full source code for both the frontend and backend.
     - Updated `README.md` with all required details.
     - Proper commit history with descriptive messages.
     - Optional: Live deployed application link for bonus points.
