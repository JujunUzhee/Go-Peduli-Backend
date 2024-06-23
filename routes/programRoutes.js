import express from "express";
import { getProgram } from "../controller/programController.js";
const router = express.Router();

router.get("/program", getProgram);

export default router;