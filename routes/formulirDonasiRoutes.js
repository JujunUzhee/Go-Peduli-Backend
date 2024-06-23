import express from "express";
import { getFormulirDonasi,postFormulirDonasi } from "../controller/formulirDonasiController.js";
const router = express.Router();

router.get("/formulir-donasi", getFormulirDonasi);
router.post("/formulir-donasi", postFormulirDonasi);

export default router;
