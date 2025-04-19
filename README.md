# Student Course Management System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for managing students and courses.

## Features

- User Authentication (Admin and Student)
- Student Registration
- Student Dashboard
- Admin Dashboard
- Course Management
- Responsive Design

## Tech Stack

### Frontend
- React.js (v19.0.0)
- React Router DOM (v7.1.4)
- React Bootstrap (v2.10.9)
- Axios for API calls
- CSS for styling

### Backend
- Node.js
- Express.js (v4.21.2)
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- CORS enabled

## Prerequisites

- Node.js (Latest LTS version)
- MongoDB installed and running
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install Backend Dependencies:
```bash
cd backend
npm install
```

3. Install Frontend Dependencies:
```bash
cd frontend
npm install
```

## Configuration

1. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Running the Application

1. Start the Backend Server:
```bash
cd backend
npm start
```

2. Start the Frontend Development Server:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## API Endpoints

### Authentication
- POST `/api/auth/login` - User login
- POST `/api/auth/signup` - User registration

### Students
- POST `/api/students` - Create new student
- GET `/api/students` - Get all students
- GET `/api/students/:id` - Get specific student
- PUT `/api/students/:id` - Update student
- DELETE `/api/students/:id` - Delete student

### Courses
- Protected routes requiring authentication
- GET `/api/courses` - Get all courses
- POST `/api/courses` - Create new course
- PUT `/api/courses/:id` - Update course
- DELETE `/api/courses/:id` - Delete course

## Project Structure

```
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

ISC License

## Author

Aleli Macapagal