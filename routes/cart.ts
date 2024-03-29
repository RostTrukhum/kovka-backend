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
      markUpInProcents: req?.body?.markUpInProcents,
      height: req?.body?.productHeight,
      class: req?.body?.class,
      openingType: req?.body?.openingType,
      indoorPad: req?.body?.indoorPad,
      outsidePad: req?.body?.outsidePad,
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
      products: {
        $elemMatch: {
          product: req?.body?.productId,
          width: req?.body?.productWidth,
          height: req?.body?.productHeight,
          class: req?.body?.class,
          openingType: req?.body?.openingType,
          indoorPad: req?.body?.indoorPad,
          outsidePad: req?.body?.outsidePad,
        },
      },
    });

    const updateProductCount = async () => {
      const productToUpdate = findExactProductCart?.products.find(
        product =>
          product?.product?._id.toString() === req?.body?.productId &&
          product?.height === req?.body?.productHeight &&
          product?.width === req?.body?.productWidth &&
          product?.class === req?.body?.class &&
          product?.openingType === req?.body?.openingType &&
          product?.indoorPad === req?.body?.indoorPad &&
          product?.outsidePad === req?.body?.outsidePad,
      );

      const updatedCart = await CartModal.findOneAndUpdate(
        {
          _id: req?.body?.cartId,
          products: {
            $elemMatch: {
              product: req?.body?.productId,
              width: req?.body?.productWidth,
              height: req?.body?.productHeight,
              class: req?.body?.class,
              openingType: req?.body?.openingType,
              indoorPad: req?.body?.indoorPad,
              outsidePad: req?.body?.outsidePad,
            },
          },
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
              class: req?.body?.class,
              openingType: req?.body?.openingType,
              indoorPad: req?.body?.indoorPad,
              outsidePad: req?.body?.outsidePad,
              markUpInProcents: req?.body?.markUpInProcents,
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
        products: {
          $elemMatch: {
            _id: req?.body?.cartProductId,
          },
        },
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
