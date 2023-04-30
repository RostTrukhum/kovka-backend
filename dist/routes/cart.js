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
    var _b, _c, _d, _e, _f, _g, _h, _j, _k;
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
            markUpInProcents: (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.markUpInProcents,
            height: (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.productHeight,
            class: (_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.class,
            openingType: (_h = req === null || req === void 0 ? void 0 : req.body) === null || _h === void 0 ? void 0 : _h.openingType,
            indoorPad: (_j = req === null || req === void 0 ? void 0 : req.body) === null || _j === void 0 ? void 0 : _j.indoorPad,
            outsidePad: (_k = req === null || req === void 0 ? void 0 : req.body) === null || _k === void 0 ? void 0 : _k.outsidePad,
        });
        yield cart.save();
        res.status(200).send(cart);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
router.post('/deleteCart', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _l;
    try {
        yield cart_1.default.findOneAndDelete({ _id: (_l = req === null || req === void 0 ? void 0 : req.body) === null || _l === void 0 ? void 0 : _l.cartId });
        res.status(200).send('Cart has deleted');
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
router.post('/addToCart', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5;
    try {
        const cart = yield cart_1.default.findOne({ _id: (_m = req === null || req === void 0 ? void 0 : req.body) === null || _m === void 0 ? void 0 : _m.cartId }).populate([
            {
                path: 'products',
                populate: [{ path: 'product' }],
            },
        ]);
        const findExactProductCart = yield cart_1.default.findOne({
            _id: (_o = req === null || req === void 0 ? void 0 : req.body) === null || _o === void 0 ? void 0 : _o.cartId,
            products: {
                $elemMatch: {
                    product: (_p = req === null || req === void 0 ? void 0 : req.body) === null || _p === void 0 ? void 0 : _p.productId,
                    width: (_q = req === null || req === void 0 ? void 0 : req.body) === null || _q === void 0 ? void 0 : _q.productWidth,
                    height: (_r = req === null || req === void 0 ? void 0 : req.body) === null || _r === void 0 ? void 0 : _r.productHeight,
                    class: (_s = req === null || req === void 0 ? void 0 : req.body) === null || _s === void 0 ? void 0 : _s.class,
                    openingType: (_t = req === null || req === void 0 ? void 0 : req.body) === null || _t === void 0 ? void 0 : _t.openingType,
                    indoorPad: (_u = req === null || req === void 0 ? void 0 : req.body) === null || _u === void 0 ? void 0 : _u.indoorPad,
                    outsidePad: (_v = req === null || req === void 0 ? void 0 : req.body) === null || _v === void 0 ? void 0 : _v.outsidePad,
                },
            },
        });
        const updateProductCount = () => __awaiter(void 0, void 0, void 0, function* () {
            var _6, _7, _8, _9, _10, _11, _12, _13, _14;
            const productToUpdate = findExactProductCart === null || findExactProductCart === void 0 ? void 0 : findExactProductCart.products.find(product => {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                return ((_a = product === null || product === void 0 ? void 0 : product.product) === null || _a === void 0 ? void 0 : _a._id.toString()) === ((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.productId) &&
                    (product === null || product === void 0 ? void 0 : product.height) === ((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.productHeight) &&
                    (product === null || product === void 0 ? void 0 : product.width) === ((_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.productWidth) &&
                    (product === null || product === void 0 ? void 0 : product.class) === ((_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.class) &&
                    (product === null || product === void 0 ? void 0 : product.openingType) === ((_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.openingType) &&
                    (product === null || product === void 0 ? void 0 : product.indoorPad) === ((_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.indoorPad) &&
                    (product === null || product === void 0 ? void 0 : product.outsidePad) === ((_h = req === null || req === void 0 ? void 0 : req.body) === null || _h === void 0 ? void 0 : _h.outsidePad);
            });
            const updatedCart = yield cart_1.default.findOneAndUpdate({
                _id: (_6 = req === null || req === void 0 ? void 0 : req.body) === null || _6 === void 0 ? void 0 : _6.cartId,
                products: {
                    $elemMatch: {
                        product: (_7 = req === null || req === void 0 ? void 0 : req.body) === null || _7 === void 0 ? void 0 : _7.productId,
                        width: (_8 = req === null || req === void 0 ? void 0 : req.body) === null || _8 === void 0 ? void 0 : _8.productWidth,
                        height: (_9 = req === null || req === void 0 ? void 0 : req.body) === null || _9 === void 0 ? void 0 : _9.productHeight,
                        class: (_10 = req === null || req === void 0 ? void 0 : req.body) === null || _10 === void 0 ? void 0 : _10.class,
                        openingType: (_11 = req === null || req === void 0 ? void 0 : req.body) === null || _11 === void 0 ? void 0 : _11.openingType,
                        indoorPad: (_12 = req === null || req === void 0 ? void 0 : req.body) === null || _12 === void 0 ? void 0 : _12.indoorPad,
                        outsidePad: (_13 = req === null || req === void 0 ? void 0 : req.body) === null || _13 === void 0 ? void 0 : _13.outsidePad,
                    },
                },
            }, {
                $set: {
                    'products.$.count': (productToUpdate === null || productToUpdate === void 0 ? void 0 : productToUpdate.count) + (((_14 = req === null || req === void 0 ? void 0 : req.body) === null || _14 === void 0 ? void 0 : _14.productCount) || 1),
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
            (yield cart_1.default.findOneAndUpdate({ _id: (_w = req === null || req === void 0 ? void 0 : req.body) === null || _w === void 0 ? void 0 : _w.cartId }, {
                products: [
                    ...cart === null || cart === void 0 ? void 0 : cart.products,
                    {
                        product: (_x = req === null || req === void 0 ? void 0 : req.body) === null || _x === void 0 ? void 0 : _x.productId,
                        count: ((_y = req === null || req === void 0 ? void 0 : req.body) === null || _y === void 0 ? void 0 : _y.productCount) || 1,
                        width: (_z = req === null || req === void 0 ? void 0 : req.body) === null || _z === void 0 ? void 0 : _z.productWidth,
                        height: (_0 = req === null || req === void 0 ? void 0 : req.body) === null || _0 === void 0 ? void 0 : _0.productHeight,
                        class: (_1 = req === null || req === void 0 ? void 0 : req.body) === null || _1 === void 0 ? void 0 : _1.class,
                        openingType: (_2 = req === null || req === void 0 ? void 0 : req.body) === null || _2 === void 0 ? void 0 : _2.openingType,
                        indoorPad: (_3 = req === null || req === void 0 ? void 0 : req.body) === null || _3 === void 0 ? void 0 : _3.indoorPad,
                        outsidePad: (_4 = req === null || req === void 0 ? void 0 : req.body) === null || _4 === void 0 ? void 0 : _4.outsidePad,
                        markUpInProcents: (_5 = req === null || req === void 0 ? void 0 : req.body) === null || _5 === void 0 ? void 0 : _5.markUpInProcents,
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
    var _15, _16;
    try {
        const updatedCart = yield cart_1.default.findOneAndUpdate({ _id: (_15 = req === null || req === void 0 ? void 0 : req.body) === null || _15 === void 0 ? void 0 : _15.cartId }, { $pull: { products: { _id: (_16 = req === null || req === void 0 ? void 0 : req.body) === null || _16 === void 0 ? void 0 : _16.cartProductId } } }, { new: true }).populate([
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
    var _17, _18, _19;
    try {
        const updatedProduct = yield cart_1.default.findOneAndUpdate({
            _id: (_17 = req === null || req === void 0 ? void 0 : req.body) === null || _17 === void 0 ? void 0 : _17.cartId,
            products: {
                $elemMatch: {
                    _id: (_18 = req === null || req === void 0 ? void 0 : req.body) === null || _18 === void 0 ? void 0 : _18.cartProductId,
                },
            },
        }, {
            $set: {
                'products.$.count': (_19 = req === null || req === void 0 ? void 0 : req.body) === null || _19 === void 0 ? void 0 : _19.productCount,
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
