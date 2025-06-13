import {AccountingService} from "./AccountingService.js";
import {Employee, EmployeeDto, SavedFiredEmployee} from "../../model/Employee.js";
import {checkFiredEmployees, convertEmployeeToFiredEmployeeDto, getError} from "../../utils/tools.js";
import {EmployeeModel, FiredEmployeeModel} from "../../model/EmployeeMongo.js";
import bcrypt from "bcrypt";
import {Role} from "../../utils/timeControlTypes.js";

export class AccountingServiceMongoImpl implements  AccountingService{


    async changePassword(empId: string, newPassword: string): Promise<void> {
        const employee = await EmployeeModel.findOne({id: empId});
        if(!employee) throw new Error(JSON.stringify({status: 404, message: `Employee ${empId} Not Found`}))
        employee.hash = await bcrypt.hash(newPassword, bcrypt.genSaltSync(10))
        await employee.save()
    }



    async fireEmployee(empId: string): Promise<SavedFiredEmployee> {
        const employee = await EmployeeModel.findOneAndDelete<Employee>({id:empId})
        if (!employee) {
            throw Error(JSON.stringify({status: 404, message: `Employee by id ${empId} Not Found`}))
        }
        const convertEmployee = convertEmployeeToFiredEmployeeDto(employee);
        const employeeDoc = new FiredEmployeeModel(convertEmployee);
        employeeDoc.fireDate = new Date() as unknown as string;
        await employeeDoc.save()
        return employeeDoc as SavedFiredEmployee;
    }



    async getAllEmployees(): Promise<SavedFiredEmployee[]> {
        const result = await EmployeeModel.find<Employee>({})
        const employees = result.map(emp => convertEmployeeToFiredEmployeeDto(emp))

        return Promise.resolve(employees);
    }

    async getEmployeeById(id: string): Promise<Employee> {
        const result = await EmployeeModel.findOne<Employee>({id:id});
        if(!result) throw new Error(JSON.stringify({status: 404, message: `Employee ${id} Not Found`}))
        return result
    }

    async hireEmployee(employee: Employee): Promise<Employee> {
        await checkFiredEmployees(employee.id)
        if(await EmployeeModel.findOne({id: employee.id}))
            throw new Error(getError(409, `Employee id ${employee.id} already exists`))
    const employeeDoc = new EmployeeModel(employee)
        await employeeDoc.save()
        return employeeDoc as Employee
    }

    async setRole(empId: string,newRole: string[]): Promise<Employee> {
        const employee = await EmployeeModel.findOne({id: empId});
        if(!employee) throw new Error(JSON.stringify({status: 404, message: `Employee ${empId} Not Found`}))
        employee.roles = newRole as Role[];
        await employee.save()
        return employee as Employee;
    }



    async updateEmployee(employeeDto: EmployeeDto): Promise<Employee> {
        const employee = await EmployeeModel.findOne({id: employeeDto.id});
        if(!employee) throw new Error(JSON.stringify({status: 404, message: `Employee ${employeeDto.id} Not Found`}))
        employee.lastName = employeeDto.lastName
        employee.firstName = employeeDto.firstName
        await employee.save()

        return employee as Employee;
    }

}