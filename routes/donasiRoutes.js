import express from 'express';
import multer from 'multer';
import path from 'path';
import { getDonasi, getDonasiById, postDonasi, updateDonasi, deleteDonasi } from '../controller/donasiController.js';

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

router.get('/donasiku', getDonasi);
router.get('/donasiku/:id', getDonasiById);
router.post('/donasiku', upload.single('image'), postDonasi);
router.put('/donasiku/:id', upload.single('image'), updateDonasi);
router.delete('/donasiku/:id', deleteDonasi);

export default router;
