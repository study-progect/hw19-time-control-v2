var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import asyncHandler from "express-async-handler";
import { AccountController } from "../controllers/AccountController.js";
export const accountRouter = express.Router();
const controller = new AccountController();
accountRouter.post('/', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const result = yield controller.addEmployee(body);
    res.status(201).json(result);
})));
accountRouter.get('/', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield controller.getAllEmployees();
    res.json(result);
})));
accountRouter.get('/:id', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield controller.getEmployeeById(id);
    res.status(201).json(result);
})));
accountRouter.delete('/:id', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield controller.fireEmployee(id);
    res.status(201).json(result);
})));
accountRouter.patch('/', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const result = yield controller.updateEmployee(body);
    res.status(201).json(result);
})));
accountRouter.patch('/:id/role', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { role } = req.body;
    const result = yield controller.setRole(id, role);
    res.status(201).json(result);
})));
accountRouter.patch('/:id/pass', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { password } = req.body;
    const result = yield controller.changePassword(id, password);
    res.status(201).json(result);
})));
