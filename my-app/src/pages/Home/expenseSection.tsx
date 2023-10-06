import React from 'react';
import { Expense, ExpenseTypeEnum } from '../../interfaces'; 
import "./home.css"
import {groupExpensesByMonth} from '../../helper';
import { useNavigate } from 'react-router-dom';

export const Expenses = ({ expenses}: { expenses: Expense[] }) => {
    // Group expenses by month and calculate monthly total. 
    // We would use a helper function here for brevity.
    const monthlyExpensesGrouped=groupExpensesByMonth(expenses.length?expenses:[])
    const navigate=useNavigate()
const handleEditNav=(expenseToEdit:any)=>{
  localStorage.setItem('expense', JSON.stringify(expenseToEdit));
  navigate("/my-app/edit")
    }
    return (
        <div className="expense-container">
                 {monthlyExpensesGrouped && Object.keys(monthlyExpensesGrouped).map(monthYearKey => {
            const monthExpenses = monthlyExpensesGrouped[monthYearKey];

            return (
                <div key={monthYearKey} className="month-section">
                    <div className="month-header">
                        {monthYearKey} 
                        <span className="month-total">
                            Total: {monthExpenses.reduce((sum, expense) => sum + expense.amount, 0)}
                        </span>
                    </div>
                        <div className='divider'></div>

                    {monthExpenses.map(expense => (
                        <div 
                            key={expense.date.toISOString()} 
                            className={`expense-item ${expense.type === ExpenseTypeEnum.CashIn ? 'cash-in' : 'cash-out'}`}
                            onClick={()=>handleEditNav(expense)}
                        >   
                         {expense.category.name}
                           <div>
                            {expense.type === ExpenseTypeEnum.CashIn ? '+' : '-'}
                            {expense.amount}

                           </div>
                        </div>
                    ))}
                </div>
            );
        })}
         
        </div>
    );
}