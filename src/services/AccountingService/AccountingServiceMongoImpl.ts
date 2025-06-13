import {AccountingService} from "./AccountingService.js";
import {Employee, EmployeeDto, SavedFiredEmployee} from "../../model/Employee.js";
import {checkFiredEmployees, convertEmployeeToFiredEmployeeDto, getError} from "../../utils/tools.js";
import {EmployeeModel} from "../../model/EmployeeMongo.js";

export class AccountingServiceMongoImpl implements  AccountingService{
    changePassword(empId: string, newPassword: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    fireEmployee(empId: string): Promise<SavedFiredEmployee> {
        throw ''
    }

    async getAllEmployees(): Promise<SavedFiredEmployee[]> {
        const result = await EmployeeModel.find<Employee>({})
        const employees = result.map(emp => convertEmployeeToFiredEmployeeDto(emp))

        return Promise.resolve(employees);
    }

    getEmployeeById(id: string): Promise<Employee> {
        throw ''
    }

    async hireEmployee(employee: Employee): Promise<Employee> {
        await checkFiredEmployees(employee.id)
        if(await EmployeeModel.findOne({id: employee.id}))
            throw new Error(getError(409, `Employee id ${employee.id} already exists`))
    const employeeDoc = new EmployeeModel(employee)
        await employeeDoc.save()
        return employeeDoc as Employee
    }

    setRole(newRole: string): Promise<Employee> {
        throw ''
    }

    updateEmployee(employee: EmployeeDto): Promise<Employee> {
        throw ''
    }

}