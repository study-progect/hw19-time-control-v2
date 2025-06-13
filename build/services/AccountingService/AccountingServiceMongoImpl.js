var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { checkFiredEmployees, convertEmployeeToFiredEmployeeDto, getError } from "../../utils/tools.js";
import { EmployeeModel, FiredEmployeeModel } from "../../model/EmployeeMongo.js";
import bcrypt from "bcrypt";
export class AccountingServiceMongoImpl {
    changePassword(empId, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield EmployeeModel.findOne({ id: empId });
            if (!employee)
                throw new Error(JSON.stringify({ status: 404, message: `Employee ${empId} Not Found` }));
            employee.hash = yield bcrypt.hash(newPassword, bcrypt.genSaltSync(10));
            yield employee.save();
        });
    }
    fireEmployee(empId) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield EmployeeModel.findOneAndDelete({ id: empId });
            if (!employee) {
                throw Error(JSON.stringify({ status: 404, message: `Employee by id ${empId} Not Found` }));
            }
            const convertEmployee = convertEmployeeToFiredEmployeeDto(employee);
            const employeeDoc = new FiredEmployeeModel(convertEmployee);
            employeeDoc.fireDate = new Date();
            yield employeeDoc.save();
            return employeeDoc;
        });
    }
    getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield EmployeeModel.find({});
            const employees = result.map(emp => convertEmployeeToFiredEmployeeDto(emp));
            return Promise.resolve(employees);
        });
    }
    getEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield EmployeeModel.findOne({ id: id });
            if (!result)
                throw new Error(JSON.stringify({ status: 404, message: `Employee ${id} Not Found` }));
            return result;
        });
    }
    hireEmployee(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            yield checkFiredEmployees(employee.id);
            if (yield EmployeeModel.findOne({ id: employee.id }))
                throw new Error(getError(409, `Employee id ${employee.id} already exists`));
            const employeeDoc = new EmployeeModel(employee);
            yield employeeDoc.save();
            return employeeDoc;
        });
    }
    setRole(empId, newRole) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield EmployeeModel.findOne({ id: empId });
            if (!employee)
                throw new Error(JSON.stringify({ status: 404, message: `Employee ${empId} Not Found` }));
            employee.roles = newRole;
            yield employee.save();
            return employee;
        });
    }
    updateEmployee(employeeDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield EmployeeModel.findOne({ id: employeeDto.id });
            if (!employee)
                throw new Error(JSON.stringify({ status: 404, message: `Employee ${employeeDto.id} Not Found` }));
            employee.lastName = employeeDto.lastName;
            employee.firstName = employeeDto.firstName;
            yield employee.save();
            return employee;
        });
    }
}
