require("dotenv").config();
const port = process.env.PORT || 3000;
const express = require("express");
const http = require("http");
const cors = require("cors");
const { scheduleMissionRepeats }=require('./controller/executive_plane_scheduler')
// const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./models");
const bodyParser = require('body-parser');
const routes = require("./routes");
// const translationMiddleware = require("./translations");
const ErrorHandler = require("./middlware's/errorHandler");
const bcrypt = require('bcrypt')
// create app
const app = express();
app.use(cors({ origin: "*" }));
// app.use(helmet());
// app.use(cookieParser());

app.set(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(translationMiddleware);

app.use(routes);
app.get('/wakeup', (req, res) => {
    res.json('wake up')
})
app.use("*", (req, res, next) => {
    const error = new Error("METHOD NOT ALLOWED!!");
    next(error);
    // next(throw nee Er)
});

app.use(ErrorHandler);
// create server***
const server = http.createServer(app);

async function connectToDatabase() {
    try {
        await db.sequelize.authenticate();
        await db.sequelize.sync({ force: false, alter: true });
        console.log("database connected successfully");
    } catch (error) {
        console.log("error during connecting to database");
        console.log(error);
        server.close();
    }
}
async function hashEmployeePassword(employee) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds, "a"); // Generates salt synchronously
  employee.password = bcrypt.hashSync(employee.password, salt); // Hashes password synchronously
  return employee;
}

// Usage example
(async () => {
    const employee = { password: "alzahra123" };
  const hashedEmployee = await hashEmployeePassword(employee);
  console.log(hashedEmployee.password); // Prints hashed password
})();
scheduleMissionRepeats()
server.listen(port, "0.0.0.0", () => {
    console.log("application running");
    connectToDatabase();
});
