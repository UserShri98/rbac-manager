RBAC Manager

Role-Based Access Control (RBAC) system with user authentication and task management.

 Setup Instructions

 Backend Setup
 `bash
cd backend
npm install


Create `.env` file:

MONGO_URI
JWT_SECRET
JWT_EXPIRES
PORT


Start backend:
`bash
npm run dev


 Frontend Setup
`bash
cd frontend
npm install
npm run dev



## Features Implemented

* Authentication
- User registration with role assignment (admin/user)
- Login with email or username
- JWT-based authentication
- Protected routes

* Authorization (RBAC)
- Role-based access control (Admin & User roles)
- Admin: Full access to all tasks
- User: Access only to own tasks

* Task Management
- Create tasks
- View tasks (filtered by role)
- Update tasks (with permission check)
- Delete tasks (with permission check)
- Filter tasks by status (pending/in-progress/completed)

* User Management
- User profile view
- Password hashing with bcrypt
- Secure token storage

* Assumptions / Trade-offs

* Assumptions
- Only two roles: admin and user
- Admin has full access to all resources
- Users can only manage their own tasks
- Token stored in localStorage (client-side)

* Trade-offs
- localStorage vs httpOnly cookies**: Used localStorage for simplicity
- No refresh token: Single JWT token approach for simplicity
- No pagination**: All tasks loaded at once (suitable for small datasets)
- No email verification**: Direct registration without email confirmation

* Bonus Feature
- Strong UI/UX features
- User Profile Picture upload

* Tech Stack

*Backend:*
- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication
- bcrypt for password hashing

*Frontend:*
- React + Vite
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- Context API for state management

* API Endpoints

* Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

* Users
- `GET /api/users/me` - Get user profile (protected)

* Tasks
- `GET /api/tasks` - Get tasks (protected, role-filtered)
- `POST /api/tasks` - Create task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

