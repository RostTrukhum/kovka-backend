import { Router } from 'express';
import ProductModel from '../models/product';
import ProductTypeModel from '../models/productType.js';
import ProductSubtypeModel from '../models/productSubtype.js';
import { IProductRequest } from './types';

const router = Router();

router.get('/getProductTypes', async (req, res) => {
  try {
    const productTypes = await ProductTypeModel.find();

    res.status(200).send(productTypes);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/getProducts', async (req: IProductRequest, res) => {
  try {
    const products = await ProductModel.find({ ...req?.query })
      .sort({ createdAt: -1 })
      .limit(req?.query?.limit)
      .skip(req?.query?.skip);

    ProductModel.count(req?.query, function (err, count) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send({ products: products, totalCount: count });
      }
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/getProductById', async (req, res) => {
  try {
    const product = await ProductModel.findOne({ _id: req?.body?.id });

    res.status(200).send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/updateProduct', async (req, res) => {
  try {
    await ProductModel.findOneAndUpdate(
      { _id: req?.body?.id },
      {
        title: req?.body?.title,
        price: req?.body?.price,
        img: req?.body?.img,
        type: req?.body?.type,
        subtype: req?.body?.subtype,
      },
    );
    res.status(200).send({ status: 'success' });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/createProduct', async (req, res) => {
  try {
    const product = new ProductModel({
      title: req?.body?.title,
      price: req?.body?.price,
      img: req?.body?.img,
      type: req?.body?.type,
      subtype: req?.body?.subtype,
      createdAt: new Date(),
    });

    await product.save();

    res.status(200).send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/deleteProduct', async (req, res) => {
  try {
    await ProductModel.findOneAndDelete({
      _id: req?.body?.id,
    });

    res?.status(200).send('Product deleted');
  } catch (e) {
    res?.status(400)?.send(e);
  }
});

export default router;
