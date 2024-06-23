import express from "express";
import { getFaq } from "../controller/faqController.js";
const router = express.Router();

router.get("/faq", getFaq);

export default router;
