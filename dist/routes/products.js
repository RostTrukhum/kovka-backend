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
const product_1 = __importDefault(require("../models/product"));
const productType_js_1 = __importDefault(require("../models/productType.js"));
const router = (0, express_1.Router)();
router.get('/getProductTypes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productTypes = yield productType_js_1.default.find();
        res.status(200).send(productTypes);
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
router.get('/getProducts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const products = yield product_1.default.find(Object.assign({}, req === null || req === void 0 ? void 0 : req.query))
            .sort({ createdAt: -1 })
            .limit((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.limit)
            .skip((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.skip);
        product_1.default.count(req === null || req === void 0 ? void 0 : req.query, function (err, count) {
            if (err) {
                res.status(400).send(err);
            }
            else {
                res.status(200).send({ products: products, totalCount: count });
            }
        });
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
router.get('/getProductById', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const product = yield product_1.default.findOne({ _id: (_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.id });
        res.status(200).send(product);
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
router.post('/updateProduct', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f, _g, _h, _j, _k;
    try {
        yield product_1.default.findOneAndUpdate({ _id: (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.id }, {
            title: (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.title,
            price: (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.price,
            img: (_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.img,
            type: (_h = req === null || req === void 0 ? void 0 : req.body) === null || _h === void 0 ? void 0 : _h.type,
            subtype: (_j = req === null || req === void 0 ? void 0 : req.body) === null || _j === void 0 ? void 0 : _j.subtype,
            description: (_k = req === null || req === void 0 ? void 0 : req.body) === null || _k === void 0 ? void 0 : _k.description,
        });
        res.status(200).send({ status: 'success' });
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
router.post('/createProduct', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _l, _m, _o, _p, _q, _r;
    try {
        const product = new product_1.default({
            title: (_l = req === null || req === void 0 ? void 0 : req.body) === null || _l === void 0 ? void 0 : _l.title,
            price: (_m = req === null || req === void 0 ? void 0 : req.body) === null || _m === void 0 ? void 0 : _m.price,
            img: (_o = req === null || req === void 0 ? void 0 : req.body) === null || _o === void 0 ? void 0 : _o.img,
            type: (_p = req === null || req === void 0 ? void 0 : req.body) === null || _p === void 0 ? void 0 : _p.type,
            subtype: (_q = req === null || req === void 0 ? void 0 : req.body) === null || _q === void 0 ? void 0 : _q.subtype,
            description: (_r = req === null || req === void 0 ? void 0 : req.body) === null || _r === void 0 ? void 0 : _r.description,
            createdAt: new Date(),
        });
        yield product.save();
        res.status(200).send(product);
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
router.post('/deleteProduct', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _s, _t;
    try {
        yield product_1.default.findOneAndDelete({
            _id: (_s = req === null || req === void 0 ? void 0 : req.body) === null || _s === void 0 ? void 0 : _s.id,
        });
        res === null || res === void 0 ? void 0 : res.status(200).send('Product deleted');
    }
    catch (e) {
        (_t = res === null || res === void 0 ? void 0 : res.status(400)) === null || _t === void 0 ? void 0 : _t.send(e);
    }
}));
exports.default = router;
