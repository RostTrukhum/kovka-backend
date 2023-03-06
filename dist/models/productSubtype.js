"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSubtypeSchema = new mongoose_1.Schema({
    subtype: { type: String },
    title: { type: String },
});
exports.default = (0, mongoose_1.model)('ProductSubtype', ProductSubtypeSchema);
