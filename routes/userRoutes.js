// console.log("efgs");

// const express = require("express");
// const router = express.Router();

// const userController = require("../controllers/userController");

// router.get("/", userController.getAllUsers);
// router.get("/:id", userController.getUserById);
// router.post("/", userController.createUser);
// router.put("/:id", userController.updateUser);
// router.delete("/:id", userController.deleteUser);
// module.exports = router;
import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
