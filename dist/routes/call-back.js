"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const nodemailer_1 = __importDefault(require("nodemailer"));
const router = (0, express_1.Router)();
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'b24259488@gmail.com',
        pass: 'dvmomvovnjpyywow',
    },
});
router.post('/sendCallBack', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        transporter.sendMail({
            from: `This message from ${(_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.phoneNumber}`,
            to: 'rostislavtruhim012@gmail.com',
            subject: `Новий заказ від ${(_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.phoneNumber}`,
            html: `<p>Новий заказ від ${(_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.phoneNumber}</p>`,
        });
        res.status(200).send('Success has send call back');
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
router.post('/sendCartCallBack', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f, _g, _h;
    const products = (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.products.map((product) => {
        var _a, _b, _c;
        return `
    <img src="${(_a = product === null || product === void 0 ? void 0 : product.product) === null || _a === void 0 ? void 0 : _a.img}" />
    <p>Назва продукту: ${(_b = product === null || product === void 0 ? void 0 : product.product) === null || _b === void 0 ? void 0 : _b.title}</p>
    <p>Ціна: ${((_c = product === null || product === void 0 ? void 0 : product.product) === null || _c === void 0 ? void 0 : _c.price) *
            ((product === null || product === void 0 ? void 0 : product.width) / 1000) *
            ((product === null || product === void 0 ? void 0 : product.height) / 1000)} грн</p>
    <p>Кількість: ${product === null || product === void 0 ? void 0 : product.count}</p>
    <p>Ширина: ${product === null || product === void 0 ? void 0 : product.width}</p>
    <p>Висота: ${product === null || product === void 0 ? void 0 : product.height}</p>
    `;
    }).join('');
    try {
        transporter.sendMail({
            from: `This message from ${(_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.phoneNumber}`,
            to: 'rostislavtruhim012@gmail.com',
            subject: `Новий заказ від ${(_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.phoneNumber}`,
            html: `
        <h2>Новий заказ від ${(_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.phoneNumber} на суму ${(_h = req === null || req === void 0 ? void 0 : req.body) === null || _h === void 0 ? void 0 : _h.totalPrice} грн</h2>
        ${products}
      `,
        });
        res.status(200).send('Success has send call back');
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
exports.default = router;
