import React, { useState,useEffect } from 'react'
import './home.css'
import { Expenses } from './expenseSection'
import CategoryList from '../CategoryList'
import { CustomButton, CustomButton2 } from '../../components/UI/Buttons'
import { useNavigate } from "react-router-dom";
import { InitialData } from "./initialData"
import { Expense, ExpenseTypeEnum } from '../../interfaces';
import { Category ,Categories } from '../../interfaces';
const Home = () => {
    const navigate = useNavigate()
    const item = localStorage.getItem('AddExpense');
    const editItem = localStorage.getItem('expense')
    
    const [data, setData] = useState<Expense[]>(InitialData || [] )
    const [index,setIndex]= useState<number>(0)
    const handleChange=()=>{

    }
    useEffect(() => {
        if(item){
            const parsedItem = JSON.parse(item);
            let AddData = {
                id:parsedItem.id, 
                type: parsedItem.type,
                category: parsedItem.category,
                date: new Date(parsedItem.date),
                amount: parsedItem.amount,
                description: parsedItem.description
            };
            setData(prevState => [...prevState, AddData]);
        }else if(editItem){
            const parseEditItem=JSON.parse(editItem)
            const modifiedExpense = data.map(obj => {
                if (obj.type === parseEditItem.type) {
                    return { ...obj,  
                        type:parseEditItem.type,
                        category:parseEditItem.category,
                        date: new Date(parseEditItem.date),
                        amount:parseEditItem.amount,
                        description:parseEditItem.description
                };
                }
                return obj;
            });
            setData(modifiedExpense)
        }
    }, [item]);  

    function handleClick() {
        localStorage.setItem("AddExpense",JSON.stringify(""))
        navigate("/my-app/add")
    }
    function handleExpenseSwitch() {
        setIndex(0)
    }
    function handleCategorySwitch() {
       setIndex(1)
    }
    return (
        <>
         
            {index === 0 ?(<>
             <div className="header" >
             <h3>Expense Tracking</h3>
             < CustomButton name="Add" onClick={handleClick} />
         </div>
            <Expenses expenses={data} /></>):
           ( <>
            <div className="header" >
                <h3>Category</h3>
             
            </div>
           
           <CategoryList categories={Categories} onCategoriesChange={handleChange}/></>)}
            <CustomButton2 name="Expenses" onClick={handleExpenseSwitch} />
            <CustomButton2 name="Category" onClick={handleCategorySwitch} />
        </>
    )
}
export default Home;