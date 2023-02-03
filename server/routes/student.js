import express from "express";
import {
  createStudent,
  deleteStudent,
  editStudent,
  getStudent,
  getStudents,
} from "../controllers/students.js";


const router = express.Router();

// GET
router.get("/", getStudents);
router.get("/view/:id", getStudent);

// POST
router.post("/add", createStudent);

// PATCH
router.patch("/edit/:id", editStudent);

// DELETE
router.delete("/delete/:id", deleteStudent);

export default router;
