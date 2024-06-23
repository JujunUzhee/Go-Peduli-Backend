import express from "express";
import { getPilar } from "../controller/pilarController.js";
const router = express.Router();

router.get("/pilar", getPilar);

export default router;
