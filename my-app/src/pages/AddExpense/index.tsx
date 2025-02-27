import { useState,useEffect } from 'react';
import { Expense, ExpenseTypeEnum, Category,Categories } from '../../interfaces';
import AddEditForm from '../../components/AddEditForm';
import { useNavigate } from 'react-router-dom';
import { CustomButton, CustomButton2 } from '../../components/UI/Buttons';
import './Add.css'
const AddExpense = () => {
   const navigate=useNavigate()
   const mainCategory=localStorage.getItem("mainCategoryList")
   const [categoryData,setCategoryData] =useState<Category[]>([]) 
   const defaultType = ExpenseTypeEnum.CashOut
   const [formState, setFormState] = useState<Expense>({
      id:0,
      type: defaultType,
      category: Categories[0],
      date: new Date(),
      amount: 0,
      description: ""
   });
   useEffect(()=>{
      if(mainCategory){
        let parseData=JSON.parse(mainCategory)
        setCategoryData(parseData)
      }else{
         setCategoryData(Categories)
      }
   },[mainCategory])
   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
     
      const { name, value } = e.target;
      console.log(e.target.value)
      if (name === "category") {
         setFormState(prevState => ({
            ...prevState,
            [name]: categoryData.find(cat => cat.name === value) || prevState.category
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
      e.preventDefault(); 
      localStorage.setItem('AddExpense',JSON.stringify(formState));
      let item = localStorage.getItem("mainData") 
      if(item){
         const parsedItem = JSON.parse(item); 
         let itemlen = parsedItem.length + 1;
         formState["id"]= itemlen     
         // Push formState to the parsedItem array
         parsedItem.push(formState);     
         localStorage.setItem("mainData",JSON.stringify(parsedItem))
      }
    
      navigate("/my-app")
   };
   const handleCancel=()=>{
      navigate("/my-app")
   }
   return (
      <>
      <div className='add-main'>
       <div className="header" >
                <h5>Add Expense</h5>
             
            </div>
         
         <AddEditForm formState={formState} handleChange={handleChange} handleSubmit={handleSubmit} Categories={categoryData} ExpenseTypeEnum={ExpenseTypeEnum} />
         <div className='button-2'>
         <CustomButton2 name="Add" onClick={handleSubmit}/>
         <CustomButton2 name="Cancel" onClick={handleCancel}/>
         </div>
         </div>
      </>
   )
}
export default AddExpense;