"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transactions_1 = require("../controllers/transactions");
const router = express_1.Router();
router.get('/', transactions_1.getTransactions);
router.post('/add', transactions_1.addTransaction);
router.post('/delete', transactions_1.deleteTransaction);
router.post('/edit', transactions_1.editTransaction);
exports.default = router;
//# sourceMappingURL=transaction.js.map