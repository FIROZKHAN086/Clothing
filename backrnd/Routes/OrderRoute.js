import express from 'express';
import { createOrderPayment, getAllOrderPayments, getOrderPaymentById, updateOrderPaymentById, deleteOrderPaymentById } from '../Controllers/OrderPayCont';

const router = express.Router();


router.post('/createOrderPayment', createOrderPayment);
router.get('/getAllOrderPayments', getAllOrderPayments);
router.get('/getOrderPaymentById/:id', getOrderPaymentById);
router.put('/updateOrderPaymentById/:id', updateOrderPaymentById);
router.delete('/deleteOrderPaymentById/:id', deleteOrderPaymentById);

export default router;
