const express = require("express");
const bcrypt = require("bcrypt");
const User = require("./userSchema");
const Quiz = require("./quizSchema");
const mongoose = require("mongoose");
const cors = require("cors");
const parser = require("body-parser");

mongoose.Promise = global.Promise;

const app = express();
const mongoDB ="";

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());

// Connecting with DB
try {
  mongoose.connect(mongoDB, { useNewUrlParser: true });
} catch (err) {
  console.log("Mongo Conn error:", err);
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

const hostname = "127.0.0.1";
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.post("/signup", (req, res) => {
  let userDetails = req.body;

  bcrypt.hash(userDetails.password, 10, (err, hash) => {
    userDetails.password = hash;
    let user = new User(userDetails);

    user
      .save()
      .then(function () {
        console.log("User created successfully");
        return res.status(201).json(user);
      })
      .catch(function (err) {
        console.log(err);
        return res.status(400).json({
          message: "Something went wrong!",
        });
      });
  });
});

app.post("/login", (req, res) => {
  let loginDetails = req.body;
  User.findOne({ email: loginDetails.email }).then((data) => {
    bcrypt.compare(loginDetails.password, data.password, (err, result) => {
      if (result) {
        res.json(data);
      } else {
        console.log("Invalid credentials");
        res.status(400).json({
          message: "Invalid credientials",
        });
      }
    });
  });
});

app.post("/addQuiz", (req, res) => {
  let result = req.body;

  let data = new Quiz(result);

  data
    .save()
    .then((success) => {
      return res.status(201).json({
        message: "New quiz data updated successfully!",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        message: "New entry failed to upload",
      });
    });
});

app.get("/activeQuiz", (req, res) => {
  Quiz.find()
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.status(500).json({
        message: "error",
      });
    });
});

app.delete("/deleteQuiz", (req, res) => {
    Quiz.findByIdAndDelete(req.body.id).then(function(data) {
        res.status(201).json("Deleted");
      })
      .catch(function(err) {
        res.send(err);
      });
})

app.post("/findQuiz", (req, res) => {
    Quiz.findById(req.body.id).then(function(data) {
        res.status(201).json(data)
    }).catch(function(err) {
        res.send(err)
    })
})

app.listen(port, hostname, () => {
  console.log(`Server running at ${port}`);
});
