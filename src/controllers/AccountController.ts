import {AccountingService} from "../services/AccountingService/AccountingService.js";
import {AccountingServiceMongoImpl} from "../services/AccountingService/AccountingServiceMongoImpl.js";
import {EmployeeDto} from "../model/Employee.js";
import {convertEmployeeDtoToEmployee} from "../utils/tools.js";

export class AccountController {
    private service: AccountingService = new AccountingServiceMongoImpl();

    async addEmployee(dto: EmployeeDto) {
        const employee = await convertEmployeeDtoToEmployee(dto);
        return await this.service.hireEmployee(employee);
    }

    async getAllEmployees() {
        return await this.service.getAllEmployees();
    }
    async changePassword(empId: string, newPassword: string) {
        return await this.service.changePassword(empId, newPassword);
    }
    async fireEmployee(empId: string) {
        return await this.service.fireEmployee(empId);
    }
    async getEmployeeById(id: string) {
        return await this.service.getEmployeeById(id);
    }
    async setRole(empId: string,newRole: string[]) {
        return await this.service.setRole(empId, newRole);
    }
    async updateEmployee(employeeDto: EmployeeDto) {
        return await this.service.updateEmployee(employeeDto);
    }
}