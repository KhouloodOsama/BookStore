const express = require("express");
const logger = require("./middleware/logger");
const {notFound , errorHandler} = require("./middleware/errors");
require("dotenv").config();
const connectToDB = require("./config/database");

// Connection to database
connectToDB();
// Init app
const app = express();
// apply Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logger);

app.set('view engine', "ejs");

// Routes
app.use("/api/books",require("./routes/books"));
app.use("/api/authors", require("./routes/authors"));
app.use("/api/auth" ,require("./routes/auth"));
app.use("/api/users" ,require("./routes/users"));
app.use("/password",require("./routes/password"));
// Error Handler Middleware
app.use(notFound);
app.use(errorHandler)

//running the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
