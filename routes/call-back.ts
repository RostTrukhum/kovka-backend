import { Router } from 'express';
import nodemailer from 'nodemailer';
import { IProduct } from './types';

const router = Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'b24259488@gmail.com',
    pass: 'dvmomvovnjpyywow',
  },
});

router.post('/sendCallBack', async (req, res) => {
  try {
    transporter.sendMail({
      from: `Зворотній дзвінок від ${req?.body?.phoneNumber}`,
      to: 'rostislavtruhim012@gmail.com',
      subject: `Зворотній дзвінок від ${req?.body?.phoneNumber}`,
      html: `<p>Зворотній дзвінок від <a href=tel:+${req?.body?.phoneNumber}>
      +${req?.body?.phoneNumber}
    </a></p>`,
    });

    res.status(200).send('Success has send call back');
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/sendCartCallBack', async (req, res) => {
  const products = req?.body?.products
    .map((product: IProduct) => {
      return `
    <img src="${product?.product?.img}" />
    <p>Назва продукту: ${product?.product?.title}</p>
    <p>Ціна: ${Math.ceil(
      product?.product?.price *
        ((product?.width || 1000) / 1000) *
        ((product?.height || 1000) / 1000) *
        (product?.markUpInProcents || 1),
    )} грн</p>
    <p>Кількість: ${product?.count}</p>
    ${product?.width ? `<p>Ширина: ${product?.width} мм</p>` : ''}
    ${product?.height ? `<p>Висота: ${product?.height} мм</p>` : ''}
    ${product?.openingType ? `<p>Відкривання: ${product?.openingType}</p>` : ''}
    ${product?.class ? `<p>Клас: ${product?.class}</p>` : ''}
    `;
    })
    .join('');

  try {
    transporter.sendMail({
      from: `This message from ${req?.body?.phoneNumber}`,
      to: 'rostislavtruhim012@gmail.com',
      subject: `Новий заказ від ${req?.body?.phoneNumber}`,
      html: `
        <h2>Новий заказ від <a href=tel:+${req?.body?.phoneNumber}>
          +${req?.body?.phoneNumber}
        </a> на суму ${req?.body?.totalPrice} грн</h2>
        ${products}
      `,
    });

    res.status(200).send('Success has send call back');
  } catch (e) {
    res.status(400).send(e);
  }
});

export default router;
