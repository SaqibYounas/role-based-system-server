require('dotenv').config();
const express = require("express");
const app = express();
const connect = require("./app/config/db");
const cors = require("cors");
const auth = require('./app/routes/routes');
const cookieParser = require("cookie-parser");
let PORT = process.env.PORT;

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use('/', auth);
connect().then(app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})).catch((error) => {
    console.log("Error for", error)
});