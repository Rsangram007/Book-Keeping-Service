require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// Rest of the packages
const morgan = require("morgan"); //HTTP request logger middleware
const cookieParser = require("cookie-parser");



// Require Database
const connectDB = require("./db/connect");
const { rateLimiter } = require("./utils/Ratelimite");

// Require Routers
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const bookRouter = require("./routes/bookRoutes");
const libraryRoutes= require("./routes/libraryRoutes");
const borrowRoutes = require('./routes/borrowRoutes');
// Require Middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// Invoke Extra packages
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);


 

// Invoke Routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter); 
app.use("/api/v1/book", bookRouter); 
app.use('/api/v1/libraries', libraryRoutes); 
app.use('/api/v1/borrow', borrowRoutes); 

// Invoke Middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    // Connect database
    await connectDB(process.env.MONGO_URL, console.log("MongoDb Connected"));

    app.listen(port, () =>
      console.log(`🚀 Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error); 
  }
};

start();
