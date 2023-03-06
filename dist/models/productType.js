"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductTypeSchema = new mongoose_1.Schema({
    type: { type: String },
    title: { type: String },
});
exports.default = (0, mongoose_1.model)('ProductType', ProductTypeSchema);
