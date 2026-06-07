# Task Manager — MERN Stack

A full-stack Task Management application built with MongoDB, Express.js, React.js, and Node.js.

## Features
- User registration and login with JWT authentication
- Create, edit, delete tasks
- Mark tasks as completed or pending
- Search tasks by title or description
- Filter by status (All / Pending / Completed)
- Task stats overview (Total, Pending, Completed)
- Protected routes — dashboard accessible only when logged in

## Tech Stack
- **Frontend:** React.js, React Router, Axios
- **Backend:** Node.js, Express.js, JWT, bcryptjs
- **Database:** MongoDB Atlas + Mongoose

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB Atlas account

### Backend
cd server
npm install


### Create a .env file inside server/:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

App runs at `http://localhost:3000`  
API runs at `http://localhost:5000`

npm run dev


## Frontend
cd client
npm install
npm start
## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Register user | No |
| POST | /api/auth/login | Login user | No |
| GET | /api/tasks | Get all tasks | Yes |
| POST | /api/tasks | Create task | Yes |
| PUT | /api/tasks/:id | Update task | Yes |
| DELETE | /api/tasks/:id | Delete task | Yes |
| PATCH | /api/tasks/:id/toggle | Toggle status | Yes |

## Screenshots
./screenshots/

## Live Demo
Frontend: https://task-manager-red-pi-24.vercel.app
Backend: https://task-manager-api-7kyj.onrender.com