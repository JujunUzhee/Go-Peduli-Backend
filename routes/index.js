import express from "express";
import routeDonasi from "./donasiRoutes.js";
import routeHome from "./homeRoutes.js";
import routeBerita from "./beritaRoutes.js";
import routedaftarMitra from "./daftarMitraRoutes.js";
import routePilar from "./pilarRoutes.js";
import routeFaq from "./faqRoutes.js";
import routeFormulirDonasi from "./formulirDonasiRoutes.js";
import routeFormulirMitra from "./formulirMitraRoutes.js";
import routeLogin from "./loginRoutes.js";
import routeProgram from "./programRoutes.js";

const router = express.Router();
router.use(routeDonasi);
router.use(routeHome);
router.use(routeBerita);
router.use(routedaftarMitra);
router.use(routePilar);
router.use(routeFaq);
router.use(routeFormulirDonasi);
router.use(routeFormulirMitra);
router.use(routeLogin);
router.use(routeProgram);

export default router;
