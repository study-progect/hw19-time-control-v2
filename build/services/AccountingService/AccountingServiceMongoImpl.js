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
import { EmployeeModel } from "../../model/EmployeeMongo.js";
export class AccountingServiceMongoImpl {
    changePassword(empId, newPassword) {
        return Promise.resolve(undefined);
    }
    fireEmployee(empId) {
        throw '';
    }
    getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield EmployeeModel.find({});
            const employees = result.map(emp => convertEmployeeToFiredEmployeeDto(emp));
            return Promise.resolve(employees);
        });
    }
    getEmployeeById(id) {
        throw '';
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
    setRole(newRole) {
        throw '';
    }
    updateEmployee(employee) {
        throw '';
    }
}
