import express from "express";
import { 
    createProduct, 
    getProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct 

} from "../Controllers/ProductControl.js";

const router = express.Router();

// Fix the routes
router.post("/createProduct", createProduct);  // for creating product
router.get("/getAllProducts", getProducts);    // for getting all products
router.get("/getProductById/:id", getProductById); // for getting single product
router.get('/:id', getProductById); 
router.put("/updateProduct/:id", updateProduct); // for updating product
router.delete("/deleteProduct/:id", deleteProduct); // for deleting product 


export default router; 