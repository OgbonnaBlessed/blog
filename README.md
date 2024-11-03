![This_Jesus](https://github.com/user-attachments/assets/3fd1cd0e-8374-40f5-a21a-f6c4852a494d)

# This Jesus
![Static Badge](https://img.shields.io/badge/Faith%20based%20blog-8A2BE2)
 ![GitHub last commit](https://img.shields.io/github/last-commit/OgbonnaBlessed/blog)

Welcome to **This Jesus**, a faith-centered blogging platform built using **MERN stack** (MongoDB, Express, ReactJS, NodeJS). 

This project allows users to create accounts, interact with Life giving, Soul lifting contents, as well as explore teachings related to the Christian faith, with a focus on sharing the love of Christ.

This platform includes two main types of users, which are the: **Authors** and **Regular Users**. While **Regular Users** can only go through articles and leave their comments, **Authors** are able to create, edit, delete articles and comments. 

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
- **Comments System**: Users can comment on articles. Comments can only be edited or deleted by their creators or an author.
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

Your backend server will run on `http://localhost:3000` and your frontend on `http://localhost:3001`.

## Backend API Documentation

### Authentication Endpoints
- `POST /api/auth/signup`: Register a new user.
- `POST /api/auth/signin`: Login a user and receive a JWT token.

### User Endpoints
- `GET /api/user/:userId`: Retrieve a user’s profile by ID.
- `DELETE /api/user/:userId`: Delete a user account.
- `PUT /api/user/update/:userId`: Update a user account.
- `POST /api/user/signout`: Signout a user.
- `GET /api/user/getusers`: Fetch all users (Author privilege).
- `POST /api/user/:userId/bookmark/:postId`: Add an article to bookmarks.
- `DELETE /api/user/:userId/bookmark/:postId`: Remove the article from bookmarks.
- `GET /api/user/:userId/bookmarks`: Fetch all bookmarks for a user.

### Post Endpoints
- `GET /api/post/getposts`: Retrieve all articles.
- `POST /api/post/createPost`: Create a new article (author privileges).
- `PUT /api/post/post:id/updatePost`: Update a article by ID (author privileges).
- `DELETE /api/post/post:id/deletePost`: Delete an article by ID (author privileges).
- `GET /api/post/getrelatedposts`: Retrieve all related articles for the currently viewed article.

### Comment Endpoints
- `POST /api/comment/comment`: Add a comment to a post.
- `PUT /api/comment/editcomment/:commentId`: Update a comment by ID (author or comment creator privileges).
- `DELETE /api/comment/deletecomment/:commentId`: Delete a comment by ID (author or comment creator privileges).
- `GET /api/comment/getcomments`: Retrieve all comments (Author privileges).
- `PUT /api/comment/likecomment/:commentId`: Like a comment by ID.
- `POST /api/comment/getpostcomments/:postId`: Retrieve all comment of an article by ID.

### Subscription Endpoint
- `POST /api/subscription/subscribe`: Subscribe to newsletter.

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
-  Add a '/' to the URL of your backend, that's the port on which your backend is running on.
  

## License
This project is licensed under the MIT License.
