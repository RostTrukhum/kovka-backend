import { Router } from 'express';
import CartModal from '../models/cart';

const router = Router();

router.get('/getCart', async (req, res) => {
  try {
    const cart = await CartModal.findOne({ _id: req?.query?.id });

    res.status(200).send(cart);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/createCart', async (req, res) => {
  try {
    const cart = new CartModal({
      products: [req?.body?.product],
      amount: req?.body?.product?.price,
    });

    await cart.save();

    res.status(200).send(cart);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/addToCart', async (req, res) => {
  try {
    const cart = await CartModal.findOne({ _id: req?.body?.id });

    const updatedCart =
      cart &&
      (await CartModal.findOneAndUpdate(
        { _id: req?.body?.id },
        {
          products: [...cart?.products, req?.body?.product],
          amount: cart?.amount + req?.body?.product?.price,
        },
        { new: true },
      ));

    res.status(200).send(updatedCart);
  } catch (err) {
    console.log(err);
  }
});

export default router;
