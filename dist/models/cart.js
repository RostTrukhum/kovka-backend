"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CartSchema = new mongoose_1.Schema({
    products: [
        {
            product: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Product',
            },
            markUpInProcents: { type: Number },
            count: { type: Number },
            width: { type: Number },
            height: { type: Number },
            class: { type: String },
            openingType: { type: String },
            indoorPad: { type: String },
            outsidePad: { type: String },
        },
    ],
});
exports.default = (0, mongoose_1.model)('Cart', CartSchema);
