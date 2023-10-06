import { useState } from 'react';
import { Expense, ExpenseTypeEnum, Categories } from '../../interfaces';
import AddEditForm from '../../components/AddEditForm';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../../components/UI/Buttons';
const EditExpense=()=>{
    const item = localStorage.getItem('expense'); 
   
    const navigate=useNavigate()
    const defaultType = ExpenseTypeEnum.CashIn
    const initialData: Expense = item ? {
      id:JSON.parse(item).id,  
      type: JSON.parse(item).type,
        category:  JSON.parse(item).category,
        date: new Date( JSON.parse(item).date),
        amount:  JSON.parse(item).amount,
        description:  JSON.parse(item).description
    } : {
      id:0,
        type: defaultType,
        category: Categories[0],
        date: new Date(),
        amount: 0,
        description: ""
    };
    const [formState, setFormState] = useState<Expense>(initialData);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "category") {
           setFormState(prevState => ({
              ...prevState,
              [name]: Categories.find(cat => cat.name === value) || prevState.category
           }));
        }
        else if (name === 'amount') {
           setFormState(prevState => ({
              ...prevState,
              [name]: Number(value)
           }));
  
        } else if (name === 'date') {
           setFormState(prevState => ({
              ...prevState,
              [name]: new Date(value)
           }));
  
        }
        else {
           setFormState(prevState => ({
              ...prevState,
              [name]: value
           }));
        }
     };
     const handleSubmit = (e: React.FormEvent) => {
        console.log(formState);
        localStorage.setItem('expense',JSON.stringify(formState));
        navigate("/my-app")
     };
     const handleCancel=()=>{
        navigate("/my-app")
     }
    return (
        <>
        Edit expense page
        <AddEditForm formState={formState} handleChange={handleChange} handleSubmit={handleSubmit} Categories={Categories} ExpenseTypeEnum={ExpenseTypeEnum} />
        <CustomButton name="Edit" onClick={handleSubmit}/>
         <button onClick={handleCancel}>Cancel</button>
     </>
    )
 }
 export default EditExpense;



