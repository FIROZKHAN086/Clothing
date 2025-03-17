import OrderPay from '../Models/OrderPay';

// Create a new order payment
export const createOrderPayment = async (req, res) => {
  try {

    const { orderId, amount, paymentMethod, paymentStatus, transactionId } = req.body;

    const orderPayment = new OrderPay({ orderId, amount, paymentMethod, paymentStatus, transactionId });

    await orderPayment.save();      

    res.status(201).json({ message: 'Order payment created successfully', orderPayment });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order payment', error: error.message });
  }
};

// Get all order payments
export const getAllOrderPayments = async (req, res) => {
  try {
    const orderPayments = await OrderPay.find();    
    res.status(200).json({ orderPayments });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order payments', error: error.message });
  }
};  

// Get order payment by ID
export const getOrderPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const orderPayment = await OrderPay.findById(id);   
    if (!orderPayment) {
      return res.status(404).json({ message: 'Order payment not found' });
    }
    res.status(200).json({ orderPayment });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order payment', error: error.message });    
  }
};

// Update order payment by ID
export const updateOrderPaymentById = async (req, res) => {
  try { 
    const { id } = req.params;
    const { orderId, amount, paymentMethod, paymentStatus, transactionId } = req.body;
    const orderPayment = await OrderPay.findByIdAndUpdate(id, { orderId, amount, paymentMethod, paymentStatus, transactionId }, { new: true });
    if (!orderPayment) {
      return res.status(404).json({ message: 'Order payment not found' });
    }   
    res.status(200).json({ message: 'Order payment updated successfully', orderPayment });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order payment', error: error.message });
  }
};

// Delete order payment by ID
export const deleteOrderPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const orderPayment = await OrderPay.findByIdAndDelete(id);  
    if (!orderPayment) {
      return res.status(404).json({ message: 'Order payment not found' });
    }
    res.status(200).json({ message: 'Order payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order payment', error: error.message });
  }
};      



