import express from 'express';
import { loginUser } from '../controller/loginController.js';
import rateLimit from 'express-rate-limit';
import { body } from 'express-validator';

const router = express.Router();

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 menit
    max: 5, // batas maksimal 5 permintaan per 15 menit per IP
    message: "Terlalu banyak percobaan login dari IP ini, coba lagi setelah 15 menit"
});

router.post('/form-login', 
    loginLimiter,
    [
        body('username').isString().notEmpty(),
        body('password').isString().notEmpty()
    ], 
    loginUser
);

export default router;