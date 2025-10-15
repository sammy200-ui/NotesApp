# NotesApp 

A full-stack note-taking application built with a focus on robust backend architecture and clean API design. This project demonstrates modern backend development practices including RESTful APIs, JWT authentication, and database management.

## Project Overview

NotesApp is a simple yet powerful note-taking application that allows users to create, read, update, and delete notes securely. The project emphasizes backend development with proper authentication, authorization, and database management while maintaining a clean and functional frontend.

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Token-based authentication
- **bcrypt** - Password hashing
- **dotenv** - Environment variable management
- **cors** - Cross-Origin Resource Sharing

### Frontend
- **React** - UI library
- **JavaScript** - Programming language
- **CSS** - Styling

## Features

### Backend Features
-  User registration and authentication
-  Secure password hashing with bcrypt
-  JWT-based authentication and authorization
-  RESTful API design
-  CRUD operations for notes
-  Input validation and error handling
-  Protected routes middleware
-  MongoDB database integration

### Frontend Features
-  User-friendly interface
-  Login and registration forms
-  Create, edit, and delete notes
-  View all user notes
-  Responsive design

## 📁 Project Structure

```
NotesApp/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

##  Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sammy200-ui/NotesApp.git
   cd NotesApp
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables**
   
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   npm start
   ```
   Backend will run on `http://localhost:5000`

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```
   Frontend will run on `http://localhost:3000`

##  API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Notes
- `GET /api/notes` - Get all notes (Protected)
- `GET /api/notes/:id` - Get single note (Protected)
- `POST /api/notes` - Create new note (Protected)
- `PUT /api/notes/:id` - Update note (Protected)
- `DELETE /api/notes/:id` - Delete note (Protected)

##  Security Features

- Password hashing using bcrypt
- JWT token-based authentication
- Protected API routes
- Environment variables for sensitive data
- Input validation and sanitization



##  Contributing

This is a personal project, but suggestions and feedback are welcome!

##  License

This project is open source and available under the [MIT License](LICENSE).

##  Author

**Sameer Pawar**
- GitHub: [@sammy200-ui](https://github.com/sammy200-ui)

---


