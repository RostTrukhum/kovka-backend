import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productsRoutes from './routes/products';
import callBackRoutes from './routes/call-back';
import cartRoutes from './routes/cart';
import bodyParser from 'body-parser';
import axios from 'axios';

const PORT = process.env.PORT ?? 3000;

const app = express();
app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(productsRoutes);
app.use(callBackRoutes);
app.use(cartRoutes);

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://Rost:Rost_333@cluster0.dsc5o96.mongodb.net/?retryWrites=true&w=majority',
      {
        // useNewUrlParser: true,
        // useFindAndModify: false
      },
    );
    app.listen(PORT, () => {
      console.log(`server has been started at ${PORT}`);
      setInterval(() => {
        axios
          .get('https://gospodar-kovka.onrender.com/getProducts?limit=1&skip=0')
          .then(() => console.log('server updated'))
          .catch(() => console.log('server not updated'));
      }, 600000);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
