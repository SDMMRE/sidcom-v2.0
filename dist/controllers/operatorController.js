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
exports.deleteOperators = exports.updateOperators = exports.getOperatorById = exports.getAllOperators = exports.createOperators = void 0;
//import { hashPassword } from "../services/password.services";
const operator_1 = __importDefault(require("../models/operator"));
//import operator from "../models/operator";
const createOperators = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { razon_social, nit, nim_niar, nro_nim, fecha_exp_nim, tipo_operador, nro_personeria, nro_matricula_seprec, fecha_exp_seprec, tipo_doc_creacion, doc_creacion, dl_departamento, dl_municipio, dl_direccion, dl_ubicacion, correo_inst, tel_fijo, celular, celular_2, act_exploracion, act_comer_interna, act_comer_externa, act_industrializacion, act_tras_colas, act_explotacion, act_ben_concentracion, act_refinacion, act_fundicion, tipo_explotacion, denominacion_area, nro_codigo_unico, nro_cuadricula, municipio_origen, nro_ruex, verif_cert_liberacion, nro_res_ministerial, nombre_resp_for101, ci_resp_for101, celular_resp_for101, correo_resp_for101, nombre_resp_tmuestra, ci_resp_tmuestra, celular_resp_tmuestra, correo_resp_tmuestra } = req.body;
        if (!razon_social) {
            res.status(400).json({ message: 'La razon social es obligatorio' });
            return;
        }
        if (!nit) {
            res.status(400).json({ message: 'El nit es obligatorio' });
            return;
        }
        //const hashedPassword = await hashPassword(password)
        const operator = yield operator_1.default.create({
            data: {
                razon_social,
                nit,
                nim_niar,
                nro_nim,
                fecha_exp_nim,
                tipo_operador,
                nro_personeria,
                nro_matricula_seprec,
                fecha_exp_seprec,
                tipo_doc_creacion,
                doc_creacion,
                dl_departamento,
                dl_municipio,
                dl_direccion,
                dl_ubicacion,
                correo_inst,
                tel_fijo,
                celular,
                celular_2,
                act_exploracion,
                act_comer_interna,
                act_comer_externa,
                act_industrializacion,
                act_tras_colas,
                act_explotacion,
                act_ben_concentracion,
                act_refinacion,
                act_fundicion,
                tipo_explotacion,
                denominacion_area,
                nro_codigo_unico,
                nro_cuadricula,
                municipio_origen,
                nro_ruex,
                verif_cert_liberacion,
                nro_res_ministerial,
                nombre_resp_for101,
                ci_resp_for101,
                celular_resp_for101,
                correo_resp_for101,
                nombre_resp_tmuestra,
                ci_resp_tmuestra,
                celular_resp_tmuestra,
                correo_resp_tmuestra
            }
        });
        res.status(201).json(operator);
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.code) === 'P2002' && ((_b = (_a = error === null || error === void 0 ? void 0 : error.meta) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b.includes('razon:social'))) {
            res.status(400).json({ message: 'La razon social ingresado ya existe' });
        }
        else {
            console.log(error);
            res.status(500).json({ error: 'Hubo un error, pruebe más tarde' });
        }
    }
});
exports.createOperators = createOperators;
const getAllOperators = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const operators = yield operator_1.default.findMany();
        res.status(200).json(operators);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe más tarde' });
    }
});
exports.getAllOperators = getAllOperators;
const getOperatorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const operatorId = parseInt(req.params.id);
    try {
        const operator = yield operator_1.default.findUnique({
            where: {
                id: operatorId
            }
        });
        if (!operator) {
            res.status(404).json({ error: 'El operador minero no fue encontrado' });
            return;
        }
        res.status(200).json(operator);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe más tarde' });
    }
});
exports.getOperatorById = getOperatorById;
const updateOperators = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const operatorId = parseInt(req.params.id);
    const { razon_social, nit, nim_niar, nro_personeria, nro_matricula_seprec, fecha_exp_seprec, tipo_doc_creacion, doc_creacion } = req.body;
    try {
        let dataToUpdate = Object.assign({}, req.body);
        if (razon_social) {
            //const hashedPassword = await hashPassword(password)
            dataToUpdate.razon_social = razon_social;
        }
        if (nit) {
            dataToUpdate.nit = nit;
        }
        if (nim_niar) {
            dataToUpdate.nim_niar = nim_niar;
        }
        if (nro_personeria) {
            dataToUpdate.nro_personeria = nro_personeria;
        }
        if (nro_matricula_seprec) {
            dataToUpdate.nro_matricula_seprec = nro_matricula_seprec;
        }
        if (fecha_exp_seprec) {
            dataToUpdate.fecha_exp_seprec = fecha_exp_seprec;
        }
        if (tipo_doc_creacion) {
            dataToUpdate.tipo_doc_creacion = tipo_doc_creacion;
        }
        if (doc_creacion) {
            dataToUpdate.doc_creacion = doc_creacion;
        }
        const operator = yield operator_1.default.update({
            where: {
                id: operatorId
            },
            data: dataToUpdate
        });
        res.status(200).json(operator);
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.code) === 'P2002' && ((_b = (_a = error === null || error === void 0 ? void 0 : error.meta) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b.includes('razon_social'))) {
            res.status(400).json({ error: 'La razon social ingresado ya existe' });
        }
        else if ((error === null || error === void 0 ? void 0 : error.code) == 'P2025') {
            res.status(404).json('Operador minero no encontrado');
        }
        else {
            console.log(error);
            res.status(500).json({ error: 'Hubo un error, pruebe más tarde' });
        }
    }
});
exports.updateOperators = updateOperators;
const deleteOperators = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const operatorId = parseInt(req.params.id);
    try {
        yield operator_1.default.delete({
            where: {
                id: operatorId
            }
        });
        res.status(200).json({
            message: `El operador minero con id: ${operatorId} ha sido eliminado`
        }).end();
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.code) == 'P2025') {
            res.status(404).json('Operador minero no encontrado');
        }
        else {
            console.log(error);
            res.status(500).json({ error: 'Hubo un error, pruebe más tarde' });
        }
    }
});
exports.deleteOperators = deleteOperators;
