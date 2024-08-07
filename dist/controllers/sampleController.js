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
exports.deleteSamples = exports.updateSamples = exports.getSampleById = exports.getAllSamples = exports.createSamples = void 0;
//import { hashPassword } from "../services/password.services";
const sample_1 = __importDefault(require("../models/sample"));
const library_1 = require("@prisma/client/runtime/library");
//import operator from "../models/operator";
const createSamples = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ubi_geografica, lugar_verificacion, id_operador, responsable, lotes, tipo_muestra, presentacion, sacos, camiones, peso_neto, peso_parcial, id_municipio, senerecom, tipo_agranel, tipo_emsacado, tipo_lingotes, tipo_sal, tipo_otr, observaciones, estado, minerales } = req.body;
        const sample = yield sample_1.default.create({
            data: {
                ubi_geografica,
                lugar_verificacion,
                id_operador,
                responsable,
                lotes,
                tipo_muestra,
                presentacion,
                sacos,
                camiones,
                peso_neto: new library_1.Decimal(peso_neto),
                peso_parcial: new library_1.Decimal(peso_parcial),
                id_municipio,
                senerecom,
                tipo_agranel,
                tipo_emsacado,
                tipo_lingotes,
                tipo_sal,
                tipo_otr,
                observaciones,
                estado,
                minerales: {
                    create: minerales.map((mineral) => ({
                        mineral: {
                            connect: { id: mineral.mineralId },
                        },
                        ley: mineral.ley,
                        unidad: mineral.unidad,
                    })),
                },
            }
        });
        res.status(201).json(sample);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe más tarde' });
    }
});
exports.createSamples = createSamples;
const getAllSamples = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const samples = yield sample_1.default.findMany({
            include: { minerales: true }
        });
        res.status(200).json(samples);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe más tarde' });
    }
});
exports.getAllSamples = getAllSamples;
const getSampleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sampleId = parseInt(req.params.id);
    try {
        const sample = yield sample_1.default.findUnique({
            where: { id: sampleId },
            include: { minerales: true }
        });
        if (!sample) {
            res.status(404).json({ error: 'La muestra no fue encontrado' });
            return;
        }
        res.status(200).json(sample);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error, pruebe más tarde' });
    }
});
exports.getSampleById = getSampleById;
const updateSamples = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const operatorId = parseInt(req.params.id);
    const { razon_social, nit, nim_niar } = req.body;
    try {
        let dataToUpdate = Object.assign({}, req.body);
        if (razon_social) {
            //const hashedPassword = await hashPassword(password)
            dataToUpdate.password = razon_social;
        }
        if (nit) {
            dataToUpdate.email = nit;
        }
        if (nim_niar) {
            dataToUpdate.email = nim_niar;
        }
        const operator = yield sample_1.default.update({
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
            res.status(404).json('Muestra no encontrado');
        }
        else {
            console.log(error);
            res.status(500).json({ error: 'Hubo un error, pruebe más tarde' });
        }
    }
});
exports.updateSamples = updateSamples;
const deleteSamples = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const operatorId = parseInt(req.params.id);
    try {
        yield sample_1.default.delete({
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
exports.deleteSamples = deleteSamples;
