import React from 'react';
import { Expense, ExpenseTypeEnum } from '../../interfaces'; 
import "./home.css"
import {groupExpensesByMonth} from '../../helper';
import { useNavigate } from 'react-router-dom';

export const Expenses = ({ expenses,handelEditChange}: { expenses: Expense[],handelEditChange:any }) => {
    let monthlyExpensesGrouped:any;
    if(expenses.length){
       monthlyExpensesGrouped=groupExpensesByMonth(expenses)
    }else {
       monthlyExpensesGrouped=[]
    }
    
    const navigate=useNavigate()
const handleEditNav=(expenseToEdit:any)=>{
  localStorage.setItem('expense', JSON.stringify(expenseToEdit));
  navigate("/my-app/edit")
    }
    return (
        <div className="expense-container">
        {monthlyExpensesGrouped ? Object.keys(monthlyExpensesGrouped).map(monthYearKey => {
            const monthExpenses = monthlyExpensesGrouped[monthYearKey];

            return (
                <div key={monthYearKey} className="month-section">
                    <div className="month-header">
                        {monthYearKey.replace("-","/")} 
                        <span className="month-total">
                        € {monthExpenses.reduce((sum:number, expense:any) =>

                                sum + Number(expense.type === ExpenseTypeEnum.CashIn? expense.amount:-expense.amount)
                            
                            , 0)}
                            
                        </span>
                    </div>
                        <div className='divider'></div>

                    {monthExpenses.map((expense:any)=> (
                        <>
                        <div 
                            key={expense.date.toISOString()} 
                            className={`expense-item ${expense.type === ExpenseTypeEnum.CashIn ? 'cash-in' : 'cash-out'}`}
                            onClick={()=>handleEditNav(expense)}
                        >   
                         {expense.category.name}
                           <div className='expense-amount'>
                            {expense.type === ExpenseTypeEnum.CashIn ? '+' : '-'}
                            {expense.amount}

                           </div>
                        </div>
                           <div className={`${expense.type === ExpenseTypeEnum.CashIn ?'divider-in':'divider-out'}`}></div>
                           </>
                    ))}
                </div>
            );
        }):<h1>Add Expenses</h1>}
         </div>
      
    );
}