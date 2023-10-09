// CategoryList.tsx
import React, { ReactHTMLElement, useEffect, useState } from 'react';
import { Category } from '../../interfaces';
import { CustomButton } from '../../components/UI/Buttons';
import './Category.css'
import cross from '../../cross-svgrepo-com.svg';
import CustomModal from '../../components/UI/Modal';
interface Props {
  categories: Category[];
  onCategoriesChange: (categories: Category[]) => void;
  handleAddCategory:(e: React.FormEvent)=>void;
  newCategory:string;
  handleCategoryUpdation:()=>void;
  handleCategoryRemoval:(e:any)=>void;
  setIsOpen:(val:boolean)=>void;
  modalIsOpen:boolean;
  setCategoryList:(val:[])=>void;
}

const CategoryList: React.FC<Props> = ({ modalIsOpen,setCategoryList, setIsOpen,categories,handleCategoryRemoval, onCategoriesChange,handleAddCategory,newCategory, handleCategoryUpdation }) => {
 
useEffect(()=>{
  let categoryList= localStorage.getItem("mainCategoryList");
  if(categoryList){
    setCategoryList(JSON.parse(categoryList))
  }
},[])

function openModal(val:string) {
  
  localStorage.setItem("categoryName",val)
  setIsOpen(true);
}

function afterOpenModal() {
  // references are now sync'd and can be accessed.
  
}

function closeModal() {
  setIsOpen(false);
}
  return (
    <div >
     
     {categories.length?(<div>
       {categories.map((item:any)=>{
        return(
          <>
          <div className='category-list'>
            <div>{item.name}</div>
            <div onClick={()=>openModal(item.name)}><img alt="cross" className='cross-logo' src={cross}/></div>
            
          </div>
          <div className='divider2'></div>
          </>
        )
       })}

     </div>):<h1>"Add categories"</h1>}
      <div className='category-input'>
      <input type="text" value={newCategory} onChange={handleAddCategory}/>
      <div className='category-add-button'>

      <CustomButton name={"Add"} onClick={handleCategoryUpdation}/>  
      </div>

      </div>
      <CustomModal modalIsOpen={modalIsOpen} handleCategoryRemoval={handleCategoryRemoval} afterOpenModal={afterOpenModal} closeModal={closeModal} info={"sme"} />
    </div>
  );
};

export default CategoryList;
