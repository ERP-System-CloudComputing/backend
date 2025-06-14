export default class SalaryDefinition {
    constructor ({
        title,
        level,
        basicSalary,
        allowance,
        grossSalary,
        deduction

    }) {
        this.title = title,
        this.level = level,
        this.basicSalary = basicSalary,
        this.allowance = allowance,
        this.grossSalary = grossSalary,
        this.deduction = deduction
    }
}