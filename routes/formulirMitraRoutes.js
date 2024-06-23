import express from 'express';
import { getMitraFormulir, postMitraFormulir } from '../controller/formulirMitraController.js';

const router = express.Router();

router.get('/mitra-formulir', getMitraFormulir);
router.post('/mitra-formulir', postMitraFormulir);

export default router;
