const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/handleProfile");
const imageCount = require("./controllers/imageCount");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "12345",
    database: "smartbraindb",
  },
});

app.get("/", (req, res) => {
  // res.send(database.users);
  console.log("on root route");
});
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) =>
  register.handleRegister(req, res, db, bcrypt)
);

app.put("/image", (req, res) => {
  imageCount.handleImageCount(req, res, db);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.listen(3001, () => console.log("listening at port 3001"));
