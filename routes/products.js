const { Router } = require('express');
const ProductModel = require('../models/product');
const ProductTypeModel = require('../models/productType.js');
const ProductSubtypeModel = require('../models/productSubtype.js');

const router = Router();

router.get('/getProductTypes', async (req, res) => {
  try {
    const productTypes = await ProductTypeModel.find();

    res.status(200).send(productTypes);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/getProductSubtypes', async (req, res) => {
  try {
    const productSubtypes = await ProductSubtypeModel.find();

    res.status(200).send(productSubtypes);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/getProducts', async (req, res) => {
  try {
    const products = await ProductModel.find({ ...req?.body?.filter })
      .sort({ createdAt: -1 })
      .limit(req?.body?.limit)
      .skip(req?.body?.skip);

    res.status(200).send(products);
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

    res.send(200, product);
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

module.exports = router;
