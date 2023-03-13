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
const cart_1 = __importDefault(require("../models/cart"));
const router = (0, express_1.Router)();
router.get('/getCart', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const cart = yield cart_1.default.findOne({ _id: (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id });
        res.status(200).send(cart);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
router.post('/createCart', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    try {
        const cart = new cart_1.default({
            products: [(_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.product],
            amount: (_d = (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.product) === null || _d === void 0 ? void 0 : _d.price,
        });
        yield cart.save();
        res.status(200).send(cart);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
router.post('/addToCart', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g, _h, _j;
    try {
        const cart = yield cart_1.default.findOne({ _id: (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.id });
        const updatedCart = cart &&
            (yield cart_1.default.findOneAndUpdate({ _id: (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.id }, {
                products: [...cart === null || cart === void 0 ? void 0 : cart.products, (_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.product],
                amount: (cart === null || cart === void 0 ? void 0 : cart.amount) + ((_j = (_h = req === null || req === void 0 ? void 0 : req.body) === null || _h === void 0 ? void 0 : _h.product) === null || _j === void 0 ? void 0 : _j.price),
            }, { new: true }));
        res.status(200).send(updatedCart);
    }
    catch (err) {
        console.log(err);
    }
}));
exports.default = router;
