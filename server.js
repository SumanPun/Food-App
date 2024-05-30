const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

//dot env configuration
dotenv.config();

//db connect
connectDb();

//rest object
const app = express();

//middleware
//app.use(cors);
app.use(express.json());
app.use(morgan('dev'));

app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/resturant", require("./routes/resturantRoutes"));

const PORT = process.env.PORT || 9090;

app.listen(PORT,() =>{
    console.log(`Server is listening on port ${PORT}`);
});