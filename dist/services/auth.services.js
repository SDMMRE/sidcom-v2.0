"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'Default-secret';
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email, id_operador: user.id_operador, nombre: user.nombre, apellidos: user.apellidos, ci: user.ci, celular: user.celular, rol: user.rol, estado: user.estado }, JWT_SECRET, { expiresIn: '1h' });
};
exports.generateToken = generateToken;
