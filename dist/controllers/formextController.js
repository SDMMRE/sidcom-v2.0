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
exports.deleteForms = exports.updateForms = exports.getFormById = exports.getAllForms = exports.createForms = void 0;
const formext_1 = __importDefault(require("../models/formext"));
const createForms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { id_sample, m03, nro_factura_exportacion, laboratorio, cod_analisis, des_comprador, des_aduana, des_pais, tipo_transporte, placa, nom_conductor, licencia, observaciones } = req.body;
        // Validar campos obligatorios
        if (id_sample === undefined || id_sample === null) {
            res.status(400).json({ message: 'El id_sample es obligatorio' });
            return;
        }
        // Crear un nuevo registro en la tabla FormExt
        const newForm = yield formext_1.default.create({
            data: {
                id_sample,
                m03,
                nro_factura_exportacion,
                laboratorio,
                cod_analisis,
                des_comprador,
                des_aduana,
                des_pais,
                tipo_transporte,
                placa,
                nom_conductor,
                licencia,
                observaciones
            },
            include: {
                sample: true // Incluye la relación con Sample si es necesario
            }
        });
        res.status(201).json(newForm);
    }
    catch (error) {
        console.error(error);
        if ((error === null || error === void 0 ? void 0 : error.code) === 'P2002' && ((_b = (_a = error === null || error === void 0 ? void 0 : error.meta) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b.includes('id_sample'))) {
            res.status(400).json({ message: 'El id_sample ya está en uso' });
        }
        else {
            res.status(500).json({ error: 'Hubo un error, pruebe más tarde' });
        }
    }
});
exports.createForms = createForms;
const getAllForms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const formext = yield formext_1.default.findMany({
            include: { sample: { include: { minerales: true } } },
        });
        res.status(200).json(formext);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe más tarde' });
    }
});
exports.getAllForms = getAllForms;
const getFormById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const formextId = parseInt(req.params.id);
    try {
        const formext = yield formext_1.default.findUnique({
            where: { id: formextId },
            include: { sample: { include: { minerales: true } } },
        });
        if (!formext) {
            res.status(404).json({ error: 'El formulario externo no fue encontrado' });
            return;
        }
        res.status(200).json(formext);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe más tarde' });
    }
});
exports.getFormById = getFormById;
const updateForms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const formId = parseInt(req.params.id);
    const { id_sample, m03, nro_factura_exportacion, laboratorio, cod_analisis, des_comprador, des_aduana, des_pais, tipo_transporte, placa, nom_conductor, licencia, observaciones } = req.body;
    try {
        let dataToUpdate = Object.assign({}, req.body);
        if (id_sample) {
            dataToUpdate.id_sample = id_sample;
        }
        if (m03) {
            dataToUpdate.m03 = m03;
        }
        if (nro_factura_exportacion) {
            dataToUpdate.nro_factura_exportacion = nro_factura_exportacion;
        }
        if (laboratorio) {
            dataToUpdate.laboratorio = laboratorio;
        }
        if (cod_analisis) {
            dataToUpdate.cod_analisis = cod_analisis;
        }
        if (des_comprador) {
            dataToUpdate.des_comprador = des_comprador;
        }
        if (des_aduana) {
            dataToUpdate.des_aduana = des_aduana;
        }
        if (des_pais) {
            dataToUpdate.des_pais = des_pais;
        }
        if (tipo_transporte) {
            dataToUpdate.tipo_transporte = tipo_transporte;
        }
        if (placa) {
            dataToUpdate.placa = placa;
        }
        if (nom_conductor) {
            dataToUpdate.nom_conductor = nom_conductor;
        }
        if (licencia) {
            dataToUpdate.licencia = licencia;
        }
        if (observaciones) {
            dataToUpdate.observaciones = observaciones;
        }
        const formext = yield formext_1.default.update({
            where: {
                id: formId
            },
            data: dataToUpdate
        });
        res.status(200).json(formext);
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.code) === 'P2002' && ((_b = (_a = error === null || error === void 0 ? void 0 : error.meta) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b.includes('email'))) {
            res.status(400).json({ error: 'El email ingresado ya existe' });
        }
        else if ((error === null || error === void 0 ? void 0 : error.code) == 'P2025') {
            res.status(404).json('Usuario no encontrado');
        }
        else {
            console.log(error);
            res.status(500).json({ error: 'Hubo un error, pruebe más tarde' });
        }
    }
});
exports.updateForms = updateForms;
const deleteForms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const formextId = parseInt(req.params.id);
    try {
        yield formext_1.default.delete({
            where: {
                id: formextId
            }
        });
        res.status(200).json({
            message: `El usuario ${formextId} ha sido eliminado`
        }).end();
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.code) == 'P2025') {
            res.status(404).json('Usuario no encontrado');
        }
        else {
            console.log(error);
            res.status(500).json({ error: 'Hubo un error, pruebe más tarde' });
        }
    }
});
exports.deleteForms = deleteForms;
