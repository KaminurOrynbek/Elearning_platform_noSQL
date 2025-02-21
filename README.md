# Elearning Platform

## Overview

The Elearning Platform is a comprehensive online learning management system that allows users to create, manage, and participate in online courses. The platform supports various functionalities including user registration, course creation, lecture management, quizzes, and progress tracking.

## Features

- **User Management**: Register, login, and manage user profiles.
- **Course Management**: Create, update, and delete courses.
- **Lecture Management**: Add, update, and delete lectures within courses.
- **Quiz Management**: Create and manage quizzes for courses.
- **Progress Tracking**: Track user progress through courses and lectures.
- **Aggregation and Indexing**: Utilize MongoDB's aggregation framework and indexing for efficient data retrieval.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Multer for handling file uploads
- **Styling**: CSS

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/elearning-platform.git
   cd elearning-platform

2. Install dependencies for both frontend and backend:
cd frontend
npm install
cd ../backend
npm install

3. Set up environment variables: Create a .env file in the backend directory and add the following:
PORT = 5000
DB = yourmongodbURI
Activation_Secret = youractivationsecret
Password = yourpassword
Gmail = yourgmailforapisendingemail
Jwt_Sec = yourjwtsecret
YOUTUBE_API_KEY = youryoutubeapi

4. Start the development server:
cd backend
npm run dev
cd ../frontend
npm start

# API Endpoints

## User Routes
- **POST** `/api/user/register`: Register a new user.
- **POST** `/api/user/login`: Login a user.
- **GET** `/api/user/me`: Get the logged-in user's profile.
- **POST** `/api/user/forgot`: Send a password reset email.
- **POST** `/api/user/reset`: Reset the user's password.
- **GET** `/api/user/progress`: Get the user's progress in courses.

## Course Routes
- **GET** `/api/course/all`: Get all courses.
- **GET** `/api/course/:id`: Get a single course by ID.
- **POST** `/api/course/subscribe/:id`: Subscribe to a course.
- **GET** `/api/course/aggregate`: Perform an aggregation on course data.
- **GET** `/api/course/query-efficiency`: Compare query efficiency with and without indexes.

## Lecture Routes
- **GET** `/api/lectures/:id`: Get all lectures for a course.
- **GET** `/api/lecture/:id`: Get a single lecture by ID.

## Admin Routes
- **POST** `/api/admin/course`: Create a new course.
- **POST** `/api/admin/lecture`: Add a new lecture to a course.
- **DELETE** `/api/admin/course/:id`: Delete a course by ID.
- **DELETE** `/api/admin/lecture/:id`: Delete a lecture by ID.
- **PUT** `/api/admin/user/role/:id`: Update a user's role.

# Database Design

## Schemas

### User Schema
```json
{
  "name": "String, required",
  "email": "String, required, unique",
  "password": "String, required",
  "role": "String, default: 'user'",
  "subscription": ["Array of Course IDs"],
  "resetPasswordExpire": "Date",
  "quizResults": ["Array of quiz results"]
}
```

### Course Schema
```json
  "Course Schema": {
    "title": "String, required",
    "description": "String, required",
    "createdBy": "String, required",
    "duration": "Number, required",
    "image": "String, required",
    "quizId": "ObjectId, ref: 'Quiz'",
    "thumbnail": "Binary data",
    "metadata": "Mixed"
  }
```
### Lecture Schema
```json
{
    "title": "String, required",
    "description": "String, required",
    "video": "String, required",
    "course": "ObjectId, ref: 'Course', required"
  }
```

### Quiz Schema
```json
{
    "title": "String, required",
    "questions": ["Array of questions"],
    "course": "ObjectId, ref: 'Course', required"
  }
```
# CRUD Operations

## 1. Create Operations

### Creating a Course
The `createCourse` function in the `admin.js` controller handles the creation of a new course. This function:

- Takes course details from the request body.
- Processes the image and thumbnail files.
- Saves the new course to the database.
- Handles metadata as extended JSON fields.

### Creating a Lecture
The `addLectures` function in the `admin.js` controller handles the creation of a new lecture. This function:

- Takes lecture details from the request body.
- Extracts the video ID from the YouTube URL.
- Saves the new lecture to the database.

## 2. Read Operations

### Fetching All Courses
The `getAllCourses` function in the `course.js` controller:

- Fetches all courses from the database.
- Returns them in the response.

### Fetching a Single Course
The `getSingleCourse` function in the `course.js` controller:

- Fetches a single course by its ID.
- Returns it in the response.
- Populates the `quizId` field.

### Fetching Lectures for a Course
The `fetchLectures` function in the `course.js` controller:

- Fetches all lectures for a specific course.
- Checks if the user is subscribed to the course or is an admin.
- Returns the lectures accordingly.

### Fetching a Single Lecture
The `fetchLecture` function in the `course.js` controller:

- Fetches a single lecture by its ID.
- Checks if the user is subscribed to the course or is an admin.
- Returns the lecture in the response.

## 3. Update Operations

### Updating User Role
The `updateRole` function in the `admin.js` controller:

- Updates the role of a user.
- Ensures that only a superadmin can modify roles.

### Advanced Update Techniques
Advanced update techniques are implemented in the `updateTechniques.js` file using:

- `$set` – Updates specific fields.
- `$unset` – Removes specific fields.
- `$push` – Adds elements to an array.
- `$pull` – Removes elements from an array.

## 4. Delete Operations

### Deleting a Course
The `deleteCourse` function in the `admin.js` controller:

- Deletes a course by its ID.
- Also deletes all associated lectures.
- Updates the subscriptions of affected users.

### Deleting a Lecture
The `deleteLecture` function in the `admin.js` controller:

- Deletes a lecture by its ID.
- Removes the associated video file from the server.

## 5. Bulk Operations

### Bulk Operations for User Model
Bulk operations are implemented in the `bulkUser.js` file. These operations:

- Handle inserting, updating, and deleting multiple user documents in a single request.
- Optimize performance when dealing with large datasets.

# Aggregation and Indexing

## Aggregation Pipeline
- `$unwind`: Deconstructs an array field from the input documents to output a document for each element.  
- `$group`: Groups input documents by a specified identifier expression and applies the accumulator expressions.  
- `$project`: Reshapes each document in the stream, such as by adding new fields or removing existing fields.  
- `$bucket`: Categorizes incoming documents into a specified number of groups, called buckets, based on a specified expression.  
- `$out`: Writes the resulting documents of the aggregation pipeline to a specified collection.  

## Indexing
- `Compound Index`: Index on multiple fields.  
- `Multi-Key Index`: Index on an array field.  
- `TTL Index`: Automatically delete documents after a certain period.  
- `Text Index`: Perform text searches on string fields.  
