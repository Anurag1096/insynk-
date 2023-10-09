import { Expense } from "./interfaces";
export function groupExpensesByMonth(expenses: Expense[]): Record<string, Expense[]> {
    return expenses.reduce((acc:any, expense) => {
        
        const month = expense.date.getMonth() + 1; // getMonth() returns 0-based month
        const year = expense.date.getFullYear();
        const key = `${month}-${year}`;

        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(expense);

        return acc;
    }, {});
}