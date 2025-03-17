import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dbConnect from './DATA/dbconne.js';
import userRoute from './Routes/UserRoute.js';
import productRoutes from './Routes/ProductRoute.js';
import orderRoutes from './Routes/OrderRoute.js';


const app = express();

app.use(cors());
app.use(bodyParser.json());

dbConnect();


app.use('/api/user', userRoute);
app.use('/api/product', productRoutes);
app.use('/api/order', orderRoutes);
// Error handling


app.get('/', (req, res) => {
    res.send('Hello World');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});     

