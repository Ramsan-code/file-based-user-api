// console.log("rgw");
const fs = require("fs");
const filePath = require("../data/users.json");
// const users = require("./api/users.json");

// exports.getAllusers = (req, res) => {
//   res.json(users);};

fs.readFile(filePath, "utf-8", (err, data) => {
  if (!data) return res.status(404).json({ error: "User not found" });
});

fs.writeFile(filePath, content, "utf8", (err) => {
  if (err) {
    return res.status(500).send("Error writing file.");
  }
  res.status(200).send("User added successfully.");
});

exports.getAllusers = (req, res) => {
  res.json(filePath);
};
// exports.getUserByID = (req, res) => {
//   const userID = req.params.id;
//   const user = users.find(u => u.id === userID); // arr
//   if (!user) return res.status(404).json({ error: "User not found" });
//   res.json(user);
// };

// exports.createUser = (req, res) => {
//   const { id, name, email } = req.body;
//   const newUser = { id, name, email };
//   users.push(newUser);
