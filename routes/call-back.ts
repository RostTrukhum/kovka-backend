import { Router } from 'express';
import nodemailer from 'nodemailer';

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
      from: `This message from ${req?.body?.phoneNumber}`,
      to: 'rostislavtruhim012@gmail.com',
      subject: `Новий заказ від ${req?.body?.phoneNumber}`,
      html: `<p>Новий заказ від ${req?.body?.phoneNumber}</p>`,
    });

    res.status(200).send('Success has send call back');
  } catch (e) {
    res.status(400).send(e);
  }
});

export default router;
