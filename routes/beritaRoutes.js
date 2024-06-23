// beritaRoutes.js atau file router lainnya
import express from 'express';
import multer from 'multer';
import path from 'path';
import { getBerita, getBeritaById, postBerita, updateBerita, deleteBerita } from '../controller/beritaController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'image/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });

router.get('/berita', getBerita);
router.get('/berita/:id', getBeritaById);
router.post('/berita', upload.single('img'), postBerita);
router.put('/berita/:id', upload.single('img'), updateBerita);
router.delete('/berita/:id', deleteBerita);

export default router;
