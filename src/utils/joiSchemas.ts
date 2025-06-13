import Joi from 'joi'
import {Role} from "./timeControlTypes.js";
export  const EmployeeDtoSchema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
    id: Joi.string().length(9).required(),
})

export const EmployeeRoleSchema = Joi.object({
    role: Joi.string().valid(...Object.values(Role)).required(),
})
export  const EmployeeDtoUpdateSchema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    id: Joi.string().length(9).required(),
})
export const EmployeePassUpdateSchema = Joi.object({
    password: Joi.string().min(8).required(),
})
export const joiSchemas = {
    'POST/accounts' : EmployeeDtoSchema,
    'PATCH/accounts': EmployeeDtoUpdateSchema,
    'PATCH/:id/role': EmployeeRoleSchema,
    'PATCH/:id/pass': EmployeePassUpdateSchema,

}