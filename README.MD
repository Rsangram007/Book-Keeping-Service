
# Book-Keeping REST API
This is a REST API built using Node.js and Express.js for Book-Keeping Project. It provides endpoints for user authentication, Book management, Libray management, and Return and Bowrrow management.


## Features

- User registration
- User login and logout
- Book creation, update, deletion, and retrieval
- Libray creation, update, deletion, and retrieval
- Image upload for Book
- JWT-based authentication

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)


## Tech Stack
**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- firebase
 

**Image Upload:** 
- FireBase API

**Data Storage:** 
- MongoDB

**User Authentication:**
- JSON Web Tokens (JWT)
## API Reference

#### User Authentication
- `POST /api/v1/auth/register` - Register a new user.
- `POST /api/v1/auth/login` -    Login with an existing user.
- `GET /api/v1/auth/logout` -    Logout the current user.

#### User
- `GET /api/v1/users` - Get all users.
- `GET /api/v1/users/:id` -    Get single user.
- `GET /api/v1/users/showMe` -  Show current user.
- `PATCH /api/v1/users/updateUser` -  Update user profile.
- `PATCH /api/v1/users/updateUserPassword` -  Update User Password.

#### Books
- `GET /api/v1/book` - Get all Book.
- `POST /api/v1/book` -    Create a new Book.
- `GET /api/v1/book/:id` -    Get a single Book by ID .
- `PATCH /api/v1/book/:id` -   Update a Book by ID .
- `DELETE /api/v1/book/:id` -   Delete a Book by ID .
 



#### libraries
- `GET /api/v1/libraries` - Get all libraries.
- `POST /api/v1/libraries` -    Create a libraries .
- `GET /api/v1/libraries/:id` -    Get a single libraries.
- `PATCH /api/v1/libraries/:id` -   Update a libraries.
 

 

## Installation


1. Clone the repository.


```
git clone https://github.com/Rsangram007/Book-Keeping-Service.git
```

2. Navigate to the project directory.

```
cd  Book-Keeping
```

3. Install the dependencies.

```
npm install 
```

4. Set the environment variables in a .env file in the root directory of the project. 
Example:
```
PORT=5000
MONGO_URL=*******Your Url ******
JWT_SECRET=your_secret_key_here
JWT_LIFETIME=1d
FIREBASE_PROJECT_ID= ***** your id ****
```

5. Start the application.

```
npm run dev

```
 


## Feedback

Please let us know your thoughts on my app by sending any suggestions or feedback to sangrambeheraa007@gmail.com.


## 🚀 About Me
- Backend developer with experience in modern web development
- intermidate in React and JavaScript for frontend development
- Experienced in Node.js and Express.js for backend development
- Ability to create efficient and high-performance server-side applications
- Proficient in using TailwindCSS for creating visually appealing and responsive user interfaces
- Passionate about building user-friendly and efficient applications using cutting-edge technologies
- Always eager to learn new technologies and improve skills to provide the best solutions to clients.



