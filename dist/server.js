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
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const port = process.env.PORT || 3000;
const app = express_1.default();
app.use(cors_1.default());
app.use(cookie_parser_1.default());
app.use(express_1.default.json());
app.use('/', routes_1.default);
app.get('*', (req, res) => {
    res.send({});
});
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect('mongodb+srv://pavlenkovit:111213@cluster0.csccq.mongodb.net/transactions', {});
            app.listen(port, () => {
                console.log(`> Ready on http://localhost:${port}`);
            });
        }
        catch (e) {
            console.log(e);
        }
    });
}
start();
//# sourceMappingURL=server.js.map