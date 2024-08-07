"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const operatorController_1 = require("../controllers/operatorController");
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
/*router.post('/', authenticateToken, ()=>{return console.log('post')})
router.get('/', authenticateToken,  ()=>{return console.log('getAll')})
router.get('/:id', authenticateToken,  ()=>{return console.log('getByid')})
router.put('/:id', authenticateToken,  ()=>{return console.log('post')})
router.delete('/:id', authenticateToken, ()=>{return console.log('post')})*/
router.post('/', authenticateToken, operatorController_1.createOperators);
router.get('/', authenticateToken, operatorController_1.getAllOperators);
router.get('/:id', authenticateToken, operatorController_1.getOperatorById);
router.put('/:id', authenticateToken, operatorController_1.updateOperators);
router.delete('/:id', authenticateToken, operatorController_1.deleteOperators);
exports.default = router;
