import { Router } from 'express';
import { Types } from 'mongoose';
import CartModal from '../models/cart';
import ProductModel from '../models/product';

const router = Router();

router.get('/getCart', async (req, res) => {
  try {
    const cart = await CartModal.findOne({ _id: req?.query?.cartId }).populate([
      {
        path: 'products',
        populate: [{ path: 'product' }],
      },
    ]);

    res.status(200).send(cart);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/createCart', async (req, res) => {
  try {
    const cart = new CartModal();

    const product: Types.ObjectId | null = await ProductModel.findOne({
      _id: req?.body?.productId,
    });

    if (!product) {
      throw new Error('Product does not exist');
    }

    cart.products.push({
      product,
      count: req?.body?.productCount || 1,
      width: req?.body?.productWidth,
      height: req?.body?.productHeight,
    });

    await cart.save();

    res.status(200).send(cart);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/deleteCart', async (req, res) => {
  try {
    await CartModal.findOneAndDelete({ _id: req?.body?.cartId });

    res.status(200).send('Cart has deleted');
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/addToCart', async (req, res) => {
  try {
    const cart = await CartModal.findOne({ _id: req?.body?.cartId }).populate([
      {
        path: 'products',
        populate: [{ path: 'product' }],
      },
    ]);

    const findExactProductCart = await CartModal.findOne({
      _id: req?.body?.cartId,
      'products.product': req?.body?.productId,
      'products.width': req?.body?.productWidth,
      'products.height': req?.body?.productHeight,
    });

    const updateProductCount = async () => {
      const productToUpdate = findExactProductCart?.products.find(
        product => product?.product?._id.toString() === req?.body?.productId,
      );

      const updatedCart = await CartModal.findOneAndUpdate(
        {
          _id: req?.body?.cartId,
          'products.product': req?.body?.productId,
        },
        {
          $set: {
            'products.$.count':
              productToUpdate?.count! + (req?.body?.productCount || 1),
          },
        },
        { new: true },
      ).populate([
        {
          path: 'products',
          populate: [{ path: 'product' }],
        },
      ]);

      return res?.status(200).send(updatedCart);
    };

    findExactProductCart && (await updateProductCount());

    if (findExactProductCart) {
      return;
    }

    const updatedCart =
      cart &&
      (await CartModal.findOneAndUpdate(
        { _id: req?.body?.cartId },
        {
          products: [
            ...cart?.products,
            {
              product: req?.body?.productId,
              count: req?.body?.productCount || 1,
              width: req?.body?.productWidth,
              height: req?.body?.productHeight,
            },
          ],
        },
        { new: true },
      ).populate([
        {
          path: 'products',
          populate: [{ path: 'product' }],
        },
      ]));

    res.status(200).send(updatedCart);
  } catch (err) {
    console.log(err);
  }
});

router.post('/deleteProductCart', async (req, res) => {
  try {
    const updatedCart = await CartModal.findOneAndUpdate(
      { _id: req?.body?.cartId },
      { $pull: { products: { _id: req?.body?.cartProductId } } },
      { new: true },
    ).populate([
      {
        path: 'products',
        populate: [{ path: 'product' }],
      },
    ]);

    res.status(200).send(updatedCart);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/updateCartProductCount', async (req, res) => {
  try {
    const updatedProduct = await CartModal.findOneAndUpdate(
      {
        _id: req?.body?.cartId,
        'products._id': req?.body?.cartProductId,
        'products.width': req?.body?.productWidth,
        'products.height': req?.body?.productHeight,
      },
      {
        $set: {
          'products.$.count': req?.body?.productCount,
        },
      },
      { new: true },
    ).populate([
      {
        path: 'products',
        populate: [{ path: 'product' }],
      },
    ]);

    res.status(200).send(updatedProduct);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
