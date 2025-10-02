// console.log("rgw");
// const fs = require("fs");
// const filePath = require("../data/users.json");
// // const users = require("./api/users.json");

// // exports.getAllusers = (req, res) => {
// //   res.json(users);};

// fs.readFile(filePath, "utf-8", (err, data) => {
//   if (!data) return res.status(404).json({ error: "User not found" });
// });

// fs.writeFile(filePath, content, "utf8", (err) => {
//   if (err) {
//     return res.status(500).send("Error writing file.");
//   }
//   res.status(200).send("User added successfully.");
// });

// exports.getAllusers = (req, res) => {
//   res.json(filePath);
// };
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

// const fs = require("fs");
// const filePath = "../data/users.json";

// exports.getAllUsers = (req, res) => {
//   fs.readFile(filePath, "utf-8", (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: "Error reading file" });
//     }

//     try {
//       const users = JSON.parse(data);
//       res.json(users);
//     } catch (parseErr) {
//       return res.status(500).json({ error: "Error parsing JSON" });
//     }
//   });
// };

// exports.createUser = (req, res) => {
//   const { id, name, email } = req.body;
//   const newUser = { id, name, email };

//   // First read existing users
//   fs.readFile(filePath, "utf-8", (err, data) => {
//     let users = [];

//     if (!err && data) {
//       try {
//         users = JSON.parse(data);
//       } catch (parseErr) {
//         return res.status(500).json({ error: "Error parsing existing data" });
//       }
//     }

//     users.push(newUser);

//     // Write updated users back to file
//     fs.writeFile(filePath, JSON.stringify(users, null, 2), "utf8", (writeErr) => {
//       if (writeErr) {
//         return res.status(500).json({ error: "Error writing file" });
//       }
//       res.status(200).json({ message: "User added successfully", user: newUser });
//     });
//   });
// };

import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/users.json");

function readUsers() {
  try {
    const data = readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeUsers(users) {
  writeFileSync(filePath, JSON.stringify(users, null, 2));
}

export const getAllUsers = (req, res) => {
  try {
    const users = readUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const getUserById = (req, res) => {
  try {
    const users = readUsers();
    const user = users.find((u) => u.id === parseInt(req.params.id));

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const createUser = (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const users = readUsers();

    const emailExists = users.find((u) => u.email === email);
    if (emailExists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const newUser = {
      id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      name,
      email,
    };

    users.push(newUser);

    writeUsers(users);

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const updateUser = (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;

    const users = readUsers();

    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    if (email) {
      const emailExists = users.find(
        (u) => u.email === email && u.id !== userId
      );
      if (emailExists) {
        return res.status(400).json({ error: "Email already exists" });
      }
    }

    if (name) users[userIndex].name = name;
    if (email) users[userIndex].email = email;

    writeUsers(users);

    res.json({
      message: "User updated successfully",
      user: users[userIndex],
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

export const deleteUser = (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const users = readUsers();

    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    const deletedUser = users.splice(userIndex, 1)[0];

    writeUsers(users);

    res.json({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};
