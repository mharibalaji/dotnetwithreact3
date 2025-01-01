
# Task Management System
This is a full-stack web application built for managing tasks. Users can create, view, update, and delete tasks, and the application also features user authentication via JWT for secure access. It is built using ASP.NET Core for the backend and React.js for the frontend.

## Features
# User Authentication
Sign up: Users can create an account with their email and password.
Login: Users can log in with their credentials and receive a JWT token for authentication.
# Task Management
Create Task: Add a new task with fields such as title, description, due date, and priority.
View Tasks: View all tasks with optional sorting and filtering by priority or due date.
Edit Task: Modify the details of an existing task.
Delete Task: Remove a task from the list.
# Security
JWT Authentication: API endpoints are secured using JWT tokens. Only authenticated users can perform CRUD operations.
## Tech Stack
# Backend
ASP.NET Core (C#)
Entity Framework Core (for database interaction)
SQL Server
JWT (for authentication)
# rontend
React.js
React Router (for routing)
Axios (for API integration)
Bootstrap (for styling)
# Database
SQL Server 

# Setup and Installation
## Frontend (React.js) <br />
Clone the repository <br />
cd task-management-frontend <br />
Install dependencies: <br />
npm install <br />
Start the React development server: <br />
npm start <br />

## Backend (.NET)
Clone the repository: <br />
cd task-management-backend <br />
Restore the .NET dependencies: <br />
dotnet restore <br />
Run the backend API: <br />
dotnet run <br />
The backend will be running at http://localhost:5003. <br />

## Database
Change the database connection string in appsettings.json. <br />

## Migration
Run following commands<br />
dotnet ef migrations add InitialCreate<br />
dotnet ef database update<br />

# Running the Application <br />
Start both the frontend and backend servers. <br />
The frontend will automatically interact with the backend API. <br />

# Dependencies <br />
## Frontend <br />
React 18+ <br />
Axios <br />
Bootstrap <br />

## Backend
.NET 8 <br />
Entity Framework <br />

## Challenges Faced
JWT Authentication: Managing JWT tokens and ensuring protected routes are accessible only to authenticated users.<br />
State Management: Efficiently managing state in React, especially with authentication and task CRUD operations.<br />

## License
MIT License - See LICENSE for more details.
