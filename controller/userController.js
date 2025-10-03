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

const getAllUsers = (req, res) => {
  try {
    const users = readUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const getUserById = (req, res) => {
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

const createUser = (req, res) => {
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

const updateUser = (req, res) => {
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

const deleteUser = (req, res) => {
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
export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
