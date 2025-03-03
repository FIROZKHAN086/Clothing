import express from "express";
import { 
    createProduct, 
    getProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct 
} from "../Controllers/ProductControl.js";

const router = express.Router();

// Middleware to validate ObjectId
const validateObjectId = (req, res, next) => {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ success: false, message: "Invalid product ID" });
    }
    next();
};

router.route("/")
    .post(createProduct)
    .get(getProducts);

router.route("/:id")
    .get(validateObjectId, getProductById)
    .put(validateObjectId, updateProduct)
    .delete(validateObjectId, deleteProduct);

export default router;  
