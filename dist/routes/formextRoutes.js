"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const formextController_1 = require("../controllers/formextController");
const router = express_1.default.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';
//Middleware de JWT para ver si estamos autenticados
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No autorizado' });
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Error en la autenticación: ', err);
            return res.status(403).json({ error: 'No tienes acceso a este recurso' });
        }
        next();
    });
};
router.post('/', authenticateToken, formextController_1.createForms);
router.get('/', authenticateToken, formextController_1.getAllForms);
router.get('/:id', authenticateToken, formextController_1.getFormById);
router.put('/:id', authenticateToken, formextController_1.updateForms);
router.delete('/:id', authenticateToken, formextController_1.deleteForms);
exports.default = router;
