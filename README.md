# Book Review Platform

A feature-rich platform for browsing, reviewing, and managing books, with role-based access for members and admins.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [User Roles](#user-roles)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)

---

## Overview

The **Book Review Platform** allows users to browse books, read descriptions and reviews, and interact with the content by liking or disliking. Users can also add their own books after signing up. Admins have additional privileges, including promoting members to admins and managing users.

This project implements role-based access control (RBAC) to ensure secure and segregated access to features and data.

---

## Features

### For Members (Authenticated Users)
- Browse books with detailed descriptions and reviews.
- Interact with books by liking or disliking them.
- View aggregated reviews and ratings for books.
- Add new books to the platform.

### For Admins
- View all user data in a dedicated admin dashboard.
- Promote members to admins.
- Access exclusive routes for managing users and roles.

---

## User Roles

### Member
- Default role upon signup.
- Can view and interact with books.
- Can add new books to the platform.

### Admin
- Elevated privileges to manage users and roles.
- Access to the admin dashboard for overseeing platform activity.

---

## Tech Stack

### Frontend
- **React**: For building the user interface.
- **Tailwind CSS**: For responsive and modern styling.
- **React Router**: For navigation and route management.

### Backend
- **Node.js**: For server-side logic.
- **Express.js**: For creating APIs.
- **MongoDB**: For the database.

### Authentication & Authorization
- **JWT**: For secure authentication.

---

Here's the updated **Installation** section for your README:

---

## Installation

### Prerequisites
- Node.js and npm installed.
- MongoDB database connection string.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Khan2001631/book-reviewer.git
   ```
2. Navigate to the project directory:
   ```bash
   cd book-reviewer
   ```
3. Install and run the **backend**:
   ```bash
   cd .\backend\
   npm install
   npm run dev
   ```
4. Install and run the **frontend**:
   ```bash
   cd .\frontend\
   npm install
   npm run dev
   ```

5. A sample .env file is included for reference.

---

## API Endpoints

### Admin Routes
These routes are accessible only to authenticated admins:
- `PATCH /admin/update-role`: Updates the role of a user (admin only).
- `GET /admin/getUsers`: Retrieves a list of all users (admin only).

### Books Routes
These routes are for managing books:
- `POST /books`: Fetches and displays all books.
- `POST /books/addBook`: Adds a new book (members only).
- `POST /books/deleteBook`: Deletes a specific book (members only).
- `POST /books/editBooks`: Edits details of a book (members only).
- `POST /books/updateBookReview`: Updates book reviews (members only).

### User Routes
These routes handle user authentication:
- `POST /auth/register`: Registers a new user.
- `POST /auth/login`: Logs in a user.
- `POST /auth/logout`: Logs out an authenticated user.

---

## Screenshots

Here are some screenshots of the **Book Review Platform**:

1. **Home Page**:
   ![Home Page](https://github.com/user-attachments/assets/4d41fa4d-08f6-4a4b-80f0-c8bc47a61c64)

2. **Review Books Page**:
   ![Review Books Page](https://github.com/user-attachments/assets/d11e7f06-8744-4b7d-82e8-09d4e8f258ce)

3. **Selected Book**: A detailed view of a selected book, including description, reviews, and the option to like or dislike.
   ![Selected Book](https://github.com/user-attachments/assets/467783c6-602a-4f5d-9560-2968f47338ff)

4. **Admin Page**:
   ![Admin Page](https://github.com/user-attachments/assets/4d912923-caae-45a2-84c6-bf2ce6c6923a)

## Future Enhancements

- Add a search and filter feature for books.
- Implement book categories for better organization.
- Allow users to comment on reviews.
- Add real-time notifications for user activity.
- Make the website more interactive.
- Add a profile page and an API endpoint so that users can edit their     profile information.

---
