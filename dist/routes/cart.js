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
const product_1 = __importDefault(require("../models/product"));
const router = (0, express_1.Router)();
router.get('/getCart', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const cart = yield cart_1.default.findOne({ _id: (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.cartId }).populate([
            {
                path: 'products',
                populate: [{ path: 'product' }],
            },
        ]);
        res.status(200).send(cart);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
router.post('/createCart', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e;
    try {
        const cart = new cart_1.default();
        const product = yield product_1.default.findOne({
            _id: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.productId,
        });
        if (!product) {
            throw new Error('Product does not exist');
        }
        cart.products.push({
            product,
            count: ((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.productCount) || 1,
            width: (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.productWidth,
            height: (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.productHeight,
        });
        yield cart.save();
        res.status(200).send(cart);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
router.post('/deleteCart', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    try {
        yield cart_1.default.findOneAndDelete({ _id: (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.cartId });
        res.status(200).send('Cart has deleted');
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
router.post('/addToCart', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    try {
        const cart = yield cart_1.default.findOne({ _id: (_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.cartId }).populate([
            {
                path: 'products',
                populate: [{ path: 'product' }],
            },
        ]);
        const findExactProductCart = yield cart_1.default.findOne({
            _id: (_h = req === null || req === void 0 ? void 0 : req.body) === null || _h === void 0 ? void 0 : _h.cartId,
            products: {
                $elemMatch: {
                    product: (_j = req === null || req === void 0 ? void 0 : req.body) === null || _j === void 0 ? void 0 : _j.productId,
                    width: (_k = req === null || req === void 0 ? void 0 : req.body) === null || _k === void 0 ? void 0 : _k.productWidth,
                    height: (_l = req === null || req === void 0 ? void 0 : req.body) === null || _l === void 0 ? void 0 : _l.productHeight,
                },
            },
        });
        const updateProductCount = () => __awaiter(void 0, void 0, void 0, function* () {
            var _s, _t, _u, _v, _w;
            const productToUpdate = findExactProductCart === null || findExactProductCart === void 0 ? void 0 : findExactProductCart.products.find(product => {
                var _a, _b, _c, _d;
                return ((_a = product === null || product === void 0 ? void 0 : product.product) === null || _a === void 0 ? void 0 : _a._id.toString()) === ((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.productId) &&
                    (product === null || product === void 0 ? void 0 : product.height) === ((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.productHeight) &&
                    product.width === ((_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.productWidth);
            });
            const updatedCart = yield cart_1.default.findOneAndUpdate({
                _id: (_s = req === null || req === void 0 ? void 0 : req.body) === null || _s === void 0 ? void 0 : _s.cartId,
                products: {
                    $elemMatch: {
                        product: (_t = req === null || req === void 0 ? void 0 : req.body) === null || _t === void 0 ? void 0 : _t.productId,
                        width: (_u = req === null || req === void 0 ? void 0 : req.body) === null || _u === void 0 ? void 0 : _u.productWidth,
                        height: (_v = req === null || req === void 0 ? void 0 : req.body) === null || _v === void 0 ? void 0 : _v.productHeight,
                    },
                },
            }, {
                $set: {
                    'products.$.count': (productToUpdate === null || productToUpdate === void 0 ? void 0 : productToUpdate.count) + (((_w = req === null || req === void 0 ? void 0 : req.body) === null || _w === void 0 ? void 0 : _w.productCount) || 1),
                },
            }, { new: true }).populate([
                {
                    path: 'products',
                    populate: [{ path: 'product' }],
                },
            ]);
            return res === null || res === void 0 ? void 0 : res.status(200).send(updatedCart);
        });
        findExactProductCart && (yield updateProductCount());
        if (findExactProductCart) {
            return;
        }
        const updatedCart = cart &&
            (yield cart_1.default.findOneAndUpdate({ _id: (_m = req === null || req === void 0 ? void 0 : req.body) === null || _m === void 0 ? void 0 : _m.cartId }, {
                products: [
                    ...cart === null || cart === void 0 ? void 0 : cart.products,
                    {
                        product: (_o = req === null || req === void 0 ? void 0 : req.body) === null || _o === void 0 ? void 0 : _o.productId,
                        count: ((_p = req === null || req === void 0 ? void 0 : req.body) === null || _p === void 0 ? void 0 : _p.productCount) || 1,
                        width: (_q = req === null || req === void 0 ? void 0 : req.body) === null || _q === void 0 ? void 0 : _q.productWidth,
                        height: (_r = req === null || req === void 0 ? void 0 : req.body) === null || _r === void 0 ? void 0 : _r.productHeight,
                    },
                ],
            }, { new: true }).populate([
                {
                    path: 'products',
                    populate: [{ path: 'product' }],
                },
            ]));
        res.status(200).send(updatedCart);
    }
    catch (err) {
        console.log(err);
    }
}));
router.post('/deleteProductCart', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _x, _y;
    try {
        const updatedCart = yield cart_1.default.findOneAndUpdate({ _id: (_x = req === null || req === void 0 ? void 0 : req.body) === null || _x === void 0 ? void 0 : _x.cartId }, { $pull: { products: { _id: (_y = req === null || req === void 0 ? void 0 : req.body) === null || _y === void 0 ? void 0 : _y.cartProductId } } }, { new: true }).populate([
            {
                path: 'products',
                populate: [{ path: 'product' }],
            },
        ]);
        res.status(200).send(updatedCart);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
router.post('/updateCartProductCount', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _z, _0, _1;
    try {
        const updatedProduct = yield cart_1.default.findOneAndUpdate({
            _id: (_z = req === null || req === void 0 ? void 0 : req.body) === null || _z === void 0 ? void 0 : _z.cartId,
            products: {
                $elemMatch: {
                    _id: (_0 = req === null || req === void 0 ? void 0 : req.body) === null || _0 === void 0 ? void 0 : _0.cartProductId,
                },
            },
        }, {
            $set: {
                'products.$.count': (_1 = req === null || req === void 0 ? void 0 : req.body) === null || _1 === void 0 ? void 0 : _1.productCount,
            },
        }, { new: true }).populate([
            {
                path: 'products',
                populate: [{ path: 'product' }],
            },
        ]);
        res.status(200).send(updatedProduct);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
exports.default = router;
