# This Jesus - A Faith-based Blog Platform

Welcome to **This Jesus**, a faith-centered blogging platform built using **MERN stack** (MongoDB, Express, ReactJS, NodeJS). 

This project allows users to create accounts, interact with Life giving, Soul lifting contents, as well as explore teachings related to the Christian faith, with a focus on sharing the love of Christ.

This platform includes two main types of users, which are the: **Authors** and **Regular Users**. While **Regular Users** can only go through articles and leave their comments, **Authors** are able to create, edit, delete posts and comments. 

The project uses modern design and animations to provide a smooth user experience, with Framer Motion, which brings the static pages of the website to life.

## Table of Contents
- [Technologies](#technologies)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation and Setup](#installation-and-setup)
- [Backend API Documentation](#backend-api-documentation)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)
  

## Technologies
The website is built using the **MERN Stack**, alongside other notable tools:

- **ReactJS** (Frontend)
- **ExpressJS** (Backend)
- **NodeJS** (Server-side)
- **MongoDB** (Database)
- **Framer Motion** (Animations for smooth transitions)
- **JWT** (User Authentication)
- **BcryptJS** (Password Hashing)
- **Mongoose** (MongoDB ORM)
- **Redux** (State management)


## Features

### General Features
- **User Authentication**: Secure signup and login system using JWT.
- **User Profiles**: Every user has a unique profile.
- **Comments System**: Users can comment on posts. Comments can only be edited or deleted by their creators or an author.
- **Responsive Design**: The website is fully responsive across all devices.
- **Smooth Animations**: Using Framer Motion for enhanced UX.
- **Search Functionality**: Users can search for articles by category, or by a search term.
- **Advanced Filtering**: Users can further filter displayed results by a search term.
- **Toggle Theme**: Users can change the theme of the website to either a light or dark mode, suiting the preferenece of the user.
- **Advanced Pagination**: The method at which the posts are displayed allows users to view more or view less of the articles.
- **Admin Dashboard**: The website comes with an admin panel which is basically for the authors. It allows authors to manage posts, comments and users.
  

## Project Structure

```
Blog/
│
├── api/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.js  (Entry point for the backend)
│
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.js  (Main React component)
│       └── index.js  (Entry point for the frontend)
│
├── README.md
└── .gitignore
```


## Installation and Setup

### Prerequisites
Ensure you have the following tools installed:
- **Node.js** (v12 or higher)
- **MongoDB** (running locally or using MongoDB Atlas)
- **Git**

### Clone the Repository
```bash
git clone https://github.com/your-username/this-jesus.git
cd Blog
```

### Backend Setup
1. Navigate to the `api` folder:
    ```bash
    cd api
    ```

2. Install backend dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the `api` folder with the following variables:
    ```bash
    MONGO_URI=<Your MongoDB URI>
    JWT_SECRET=<Your Secret Key>
    PORT=5000
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup
1. Navigate to the `client` folder:
    ```bash
    cd client
    ```

2. Initialize the react project
   ```bash
   npx create-react-app ./
   ````
   
3. Install frontend dependencies:
    ```bash
    npm install
    ```

4. Start the React development server:
    ```bash
    npm start
    ```

Your backend server will run on `http://localhost:5000` and your frontend on `http://localhost:3000`.

## Backend API Documentation

### Authentication Endpoints
- `POST /api/auth/signup`: Register a new user.
- `POST /api/auth/signin`: Login a user and receive a JWT token.

### User Endpoints
- `GET /api/user:id`: Retrieve a user’s profile by ID.
- `DELETE /api/user:id`: Delete a user account (author privileges).

### Post Endpoints
- `GET /api/post/getposts`: Retrieve all posts.
- `POST /api/post/createPost`: Create a new post (author privileges).
- `PUT /api/post/post:id/updatePost`: Update a post by ID (author privileges).
- `DELETE /api/post/post:id/deletePost`: Delete a post by ID (author privileges).

### Comment Endpoints
- `POST /api/comment`: Add a comment to a post.
- `PUT /api/comments/:id`: Update a comment by ID (author or comment creator privileges).
- `DELETE /api/comments/:id`: Delete a comment by ID (author or comment creator privileges).

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m "Add a new feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.


## Troubleshooting
Listed below are the possible errors you might encounter whilst you build this. Plus, I've attached the solution to each problem.

1. Proxy error: If your terminal keeps bringing a warning of not being able to proxy between two ports, you can do the below to solve such.
-  Add a '/' to the URL of your backend, that's the port on which your backend is running on
  

## License
This project is licensed under the MIT License.
