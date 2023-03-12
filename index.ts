import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productsRoutes from './routes/products';
import callBackRoutes from './routes/call-back';
import bodyParser from 'body-parser';

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
    });
  } catch (e) {
    console.log(e);
  }
};

start();
