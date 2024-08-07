"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const operatorRoutes_1 = __importDefault(require("./routes/operatorRoutes"));
const sampleRoutes_1 = __importDefault(require("./routes/sampleRoutes"));
const formextRoutes_1 = __importDefault(require("./routes/formextRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
//Routes
app.use('/auth', authRoutes_1.default);
app.use('/user', userRoutes_1.default);
app.use('/operator', operatorRoutes_1.default);
app.use('/sample', sampleRoutes_1.default);
app.use('/formext', formextRoutes_1.default);
//autenticacion
//user
console.log('esto esta siendo ejecutado');
exports.default = app;
