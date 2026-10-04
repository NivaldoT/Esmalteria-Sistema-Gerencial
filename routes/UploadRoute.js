import express from 'express';
import multer from "multer";
import path from "path";
import UploadController from '../controllers/UploadController.js';


const router = express.Router();
const controller = new UploadController();
router.get('/:image', (req, res) => {
    
    controller.upload(req, res);
});

export default router;