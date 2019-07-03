const express = require("express");
const db = require("./db");
const jwt = require("jsonwebtoken");
const UserModel = require("./user.model");
// const cors = require("cors");

const app = express();

const generateToken = user =>
  jwt.sign(
    { sub: user.id, iat: new Date().getTime(), user: user.username },
    "a-secret-key",
    { expiresIn: "1h" }
  );

app.use(express.json());
// app.use(express.static("public"));
// app.use(cors());

app.get("/jwt", (req, res) => {
  res.send("Token route is working").status(200);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const foundUser = UserModel.findOne({ username, password });
  if (foundUser) {
      const jwt = generateToken(foundUser);
    res.json({ username: foundUser.username, token: jwt }).then(() => sessionStorage.setItem('JWT', jwt));
  } else {
    res.sendStatus(401);
  }
});

app.post("/logout", (req, res) => {});
