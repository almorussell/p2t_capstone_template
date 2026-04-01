// capstone-backend/routes/product.js
import express from 'express';
import multer from 'multer';
import { 
    getProducts, 
    createProduct,
    deleteProduct,
} from '../controllers/product.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', getProducts);
router.post('/add', upload.array('productImages'), createProduct);
router.delete('/:id', deleteProduct);

export default router;