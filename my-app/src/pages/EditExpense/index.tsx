import { useEffect, useState } from 'react';
import { Expense, ExpenseTypeEnum,Category, Categories } from '../../interfaces';
import AddEditForm from '../../components/AddEditForm';
import { useNavigate } from 'react-router-dom';
import { CustomButton, CustomButton2 } from '../../components/UI/Buttons';
import "./Edit.css"

const EditExpense = () => {
   const item = localStorage.getItem('expense');
   const mainCategory=localStorage.getItem("mainCategoryList"); 
   const [categoryData,setCategoryData] =  useState<Category[]>([])
   const navigate = useNavigate()
   const defaultType = ExpenseTypeEnum.CashIn
   const initialData: Expense = item ? {
      id: JSON.parse(item).id,
      type: JSON.parse(item).type,
      category: JSON.parse(item).category,
      date: new Date(JSON.parse(item).date),
      amount: JSON.parse(item).amount,
      description: JSON.parse(item).description
   } : {
      id: 0,
      type: defaultType,
      category: Categories[0],
      date: new Date(),
      amount: 0,
      description: ""
   };
   useEffect(()=>{
      if(mainCategory){
        let parseData=JSON.parse(mainCategory)
        setCategoryData(parseData)
      }else{
         setCategoryData(Categories)
      }
   },[mainCategory])
   const [formState, setFormState] = useState<Expense>(initialData);
   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
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
      console.log(formState);
      
      let item = localStorage.getItem("mainData")
      if(item){
         
         const tempArr=JSON.parse(item).map((obj:any)=>{
            if(obj.id === formState.id){
               return {
                  ...obj,
                  id:formState.id,   
                  type: formState.type,
                  category: formState.category,
                  date: new Date(formState.date),
                  amount: formState.amount,
                  description: formState.description
              };
            }
            return obj
         })
         localStorage.setItem("mainData",JSON.stringify(tempArr))
      }
      navigate("/my-app")
   };
   const handelRemove=()=>{
      let item = localStorage.getItem("mainData")
      if(item){
         const tempArr=JSON.parse(item).filter((obj:any)=>{
          
            return formState.id !== obj.id
         })
         localStorage.setItem("mainData",JSON.stringify(tempArr))
      }
      navigate("/my-app")
   }
   const handleCancel = () => {
      navigate("/my-app")
   }
   return (
      <>
      <div className='edit-main'>
         <div className="header" >
            <h5>Edit Expense</h5>
            <div style={{width:'20px'}}></div>
            <CustomButton name="Remove" onClick={handelRemove}/>
         </div>
         <AddEditForm
            formState={formState}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            Categories={categoryData}
            ExpenseTypeEnum={ExpenseTypeEnum}
         />
         <div className='button-2'>
            <CustomButton2 name="Edit" onClick={handleSubmit} />
            <CustomButton2 name="Cancel" onClick={handleCancel} />
         </div>
         </div>
      </>
   )
}
export default EditExpense;



