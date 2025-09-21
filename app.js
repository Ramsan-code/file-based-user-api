// console.log("ethfs");
// import express from "express";
// // const express = require("express");

// const app = express();

// app.get("/", (req, res) => {
//   res.send("Hello Express!");
// });

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
app.use(bodyParser.json());
app.use("/api/users", userRoutes);

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
