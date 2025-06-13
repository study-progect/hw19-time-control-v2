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
accountRouter.get('/:id', asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await controller.getEmployeeById(id)
    res.status(201).json(result)
}))
accountRouter.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await controller.fireEmployee(id)
    res.status(201).json(result)
}))
accountRouter.patch('/', asyncHandler(async (req: Request, res: Response) => {
    const body = req.body as EmployeeDto;
    const result = await controller.updateEmployee(body);
    res.status(201).json(result)

}))

accountRouter.patch('/:id/role', asyncHandler(async (req: Request, res: Response) => {
    const {id} = req.params;
    const {role} = req.body
    const result = await controller.setRole(id, role);
    res.status(201).json(result)

}))
accountRouter.patch('/:id/pass', asyncHandler(async (req: Request, res: Response) => {
    const {id} = req.params;
    const {password} = req.body
    const result = await controller.changePassword(id, password);
    res.status(201).json(result)
}))