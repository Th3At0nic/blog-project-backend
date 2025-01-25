# Blogging Platform Backend

A secure, scalable backend for a blogging platform where users can create, update, and manage their blogs. The platform features robust authentication, role-based access control, and efficient query functionalities like search, sort, and filtering.

## Live URL

[https://blog-project-nine-chi.vercel.app/](https://blog-project-nine-chi.vercel.app/)

## Features

- **Role-based Access Control**

  - **Admin:** Can manage users and their blogs.
  - **User:** Can perform CRUD operations on their own blogs.

- **Secure Authentication**

  - Users can register and log in securely with encrypted passwords.
  - Token-based authentication for protected routes.

- **Blog Management**

  - Users can create, read, update, and delete their blogs.
  - Admins can manage all blogs.

- **Public API**

  - View blogs with the ability to search by title or content.
  - Sort blogs by specific fields like `createdAt` or `title`.
  - Filter blogs based on specific criteria.

- **Performance-focused Design**
  - Efficient querying with pagination, sorting, and filtering.
  - Comprehensive error handling with detailed feedback.

## Technology Stack

- **Programming Language:** TypeScript
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose

## Setup Instructions

Follow these steps to set up the project locally:

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd blog-project

   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**  
   Create a `.env` file in the root directory with the following keys:

   ```env
   PORT=5000
   MONGO_URI=<your-mongo-database-url>
   JWT_SECRET=<your-jwt-secret>
   ```

4. **Build the Project**  
   Compile TypeScript files to JavaScript:

   ```bash
   npm run build
   ```

5. **Run the Project**

   - **Development:**
     ```bash
     npm run start:dev
     ```
   - **Production:**
     ```bash
     npm run start:prod
     ```

6. **Linting and Formatting**
   - Run linting:
     ```bash
     npm run lint
     ```
   - Fix linting issues:
     ```bash
     npm run lint:fix
     ```
   - Format code:
     ```bash
     npm run format
     ```

## API Documentation

- **Authentication:**

  - `POST /api/auth/register` - Register a new user.
  - `POST /api/auth/login` - Log in to obtain an access token.

- **Blogs:**

  - `GET /api/blogs` - View all blogs (supports search, sort, and filtering).
  - `POST /api/blogs` - Create a new blog (protected).
  - `PATCH /api/blogs/:id` - Update a blog (protected).
  - `DELETE /api/blogs/:id` - Delete a blog (protected).

- **Users:**
  - `PATCH /api/admin/users/:userId/block` - Block a user (admin only).
  - `DELETE /api/admin/blogs/:id` - Delete a user (admin only).

## Testing the Live API

To test the live API, you can use tools like **Postman** or **cURL**.  
For authorization-protected routes, include a valid **Bearer Token** in the `Authorization` header.

## Future Improvements

- Add unit and integration tests.
- Enhance query performance for large datasets.
- Implement a front-end for end-to-end user experience.

---

For any issues or suggestions, feel free to contact the project owner.  
Happy coding! 🚀
