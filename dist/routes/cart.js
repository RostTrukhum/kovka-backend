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
    var _b, _c;
    try {
        const cart = new cart_1.default();
        const product = yield product_1.default.findOne({
            _id: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.productId,
        });
        if (!product) {
            throw new Error('Product does not exist');
        }
        cart.products.push({ product, count: ((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.productCount) || 1 });
        yield cart.save();
        res.status(200).send(cart);
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
router.post('/addToCart', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f, _g, _h, _j;
    try {
        const cart = yield cart_1.default.findOne({ _id: (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.cartId }).populate([
            {
                path: 'products',
                populate: [{ path: 'product' }],
            },
        ]);
        const findExactProductCart = yield cart_1.default.findOne({
            _id: (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.cartId,
            'products.product': (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.productId,
        });
        const updateProductCount = () => __awaiter(void 0, void 0, void 0, function* () {
            var _k, _l, _m;
            const productToUpdate = findExactProductCart === null || findExactProductCart === void 0 ? void 0 : findExactProductCart.products.find(product => { var _a, _b; return ((_a = product === null || product === void 0 ? void 0 : product.product) === null || _a === void 0 ? void 0 : _a._id.toString()) === ((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.productId); });
            const updatedCart = yield cart_1.default.findOneAndUpdate({
                _id: (_k = req === null || req === void 0 ? void 0 : req.body) === null || _k === void 0 ? void 0 : _k.cartId,
                'products.product': (_l = req === null || req === void 0 ? void 0 : req.body) === null || _l === void 0 ? void 0 : _l.productId,
            }, {
                $set: {
                    'products.$.count': (productToUpdate === null || productToUpdate === void 0 ? void 0 : productToUpdate.count) + (((_m = req === null || req === void 0 ? void 0 : req.body) === null || _m === void 0 ? void 0 : _m.productCount) || 1),
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
            (yield cart_1.default.findOneAndUpdate({ _id: (_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.cartId }, {
                products: [
                    ...cart === null || cart === void 0 ? void 0 : cart.products,
                    {
                        product: (_h = req === null || req === void 0 ? void 0 : req.body) === null || _h === void 0 ? void 0 : _h.productId,
                        count: ((_j = req === null || req === void 0 ? void 0 : req.body) === null || _j === void 0 ? void 0 : _j.productCount) || 1,
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
    var _o, _p;
    try {
        const updatedCart = yield cart_1.default.findOneAndUpdate({ _id: (_o = req === null || req === void 0 ? void 0 : req.body) === null || _o === void 0 ? void 0 : _o.cartId }, { $pull: { products: { _id: (_p = req === null || req === void 0 ? void 0 : req.body) === null || _p === void 0 ? void 0 : _p.cartProductId } } }, { new: true }).populate([
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
    var _q, _r, _s;
    try {
        const updatedProduct = yield cart_1.default.findOneAndUpdate({ _id: (_q = req === null || req === void 0 ? void 0 : req.body) === null || _q === void 0 ? void 0 : _q.cartId, 'products._id': (_r = req === null || req === void 0 ? void 0 : req.body) === null || _r === void 0 ? void 0 : _r.cartProductId }, {
            $set: {
                'products.$.count': (_s = req === null || req === void 0 ? void 0 : req.body) === null || _s === void 0 ? void 0 : _s.productCount,
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
