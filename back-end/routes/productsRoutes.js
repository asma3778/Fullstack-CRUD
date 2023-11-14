import { Router } from "express";
import { 
    getAllProducts, 
    addProduct,
    deleteSingleProduct,
    updateSingleProduct,
} from "../controlers/productsControler.js";
import {
    productValidator,
    validateProduct,
    validateUpdateProduct,
  } from "../validation/productsValidate.js";
  import { runValidation } from "../validation/validation.js";

const router = Router();

router.get('/products', getAllProducts);

router.post('/products', validateProduct, runValidation, addProduct);

router.delete('/products/:id', productValidator(), runValidation, deleteSingleProduct);

router.put('/products/:id', productValidator(), validateUpdateProduct, runValidation, updateSingleProduct);

export default router; 