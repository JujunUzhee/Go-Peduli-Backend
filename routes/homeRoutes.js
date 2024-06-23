import express from 'express';
import { getData } from '../controller/homeController.js';
const router = express.Router();

router.get('/home',getData);

export default router