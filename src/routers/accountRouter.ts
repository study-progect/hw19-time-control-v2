import express, {Request, Response} from "express";
import {EmployeeDto} from "../model/Employee.js";
import asyncHandler from "express-async-handler";
import {AccountController} from "../controllers/AccountController.js";

export const accountRouter = express.Router();
const controller = new AccountController();
accountRouter.post('/', asyncHandler(async (req: Request, res: Response) => {
    const body = req.body as EmployeeDto;
    const result = await controller.addEmployee(body);
    res.status(201).json(result)
}))

accountRouter.get('/',  asyncHandler(async (req: Request, res: Response) =>{
    const result = await controller.getAllEmployees();
    res.json(result)
} ))