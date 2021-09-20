"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});
exports.default = mongoose_1.model('transaction', schema);
//# sourceMappingURL=Transaction.js.map