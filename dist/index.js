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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const products_1 = __importDefault(require("./routes/products"));
const call_back_1 = __importDefault(require("./routes/call-back"));
const cart_1 = __importDefault(require("./routes/cart"));
const body_parser_1 = __importDefault(require("body-parser"));
const axios_1 = __importDefault(require("axios"));
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*',
}));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(products_1.default);
app.use(call_back_1.default);
app.use(cart_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect('mongodb+srv://Rost:Rost_333@cluster0.dsc5o96.mongodb.net/?retryWrites=true&w=majority', {
        // useNewUrlParser: true,
        // useFindAndModify: false
        });
        app.listen(PORT, () => {
            console.log(`server has been started at ${PORT}`);
            setInterval(() => {
                axios_1.default
                    .get('https://gospodar-kovka.onrender.com/getProducts?limit=1&skip=0')
                    .then(() => console.log('server updated'))
                    .catch(() => console.log('server not updated'));
            }, 600000);
        });
    }
    catch (e) {
        console.log(e);
    }
});
start();
