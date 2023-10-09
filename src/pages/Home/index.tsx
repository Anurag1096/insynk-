import React, { useState, useEffect } from 'react'
import './home.css'
import { Expenses } from './expenseSection'
import CategoryList from '../CategoryList'
import { CustomButton, CustomButton2 } from '../../components/UI/Buttons'
import { useNavigate } from "react-router-dom";
import { InitialData } from "./initialData"
import { Expense, ExpenseTypeEnum } from '../../interfaces';
import { Category, Categories } from '../../interfaces';
import { isConstructorDeclaration } from 'typescript'
const Home = () => {
    const navigate = useNavigate()
    const item = localStorage.getItem('AddExpense');
    const itemCategory=localStorage.getItem("categoryName");
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [data, setData] = useState<Expense[]>([])
    const [index, setIndex] = useState<number>(0)
    const [newCategory, setCategory] = useState<string>("")
    const [categoryList, setCategoryList] = useState<Category[]>([])

    // For setting up the category on page load 
    useEffect(() => {
        setData(InitialData)
        setCategoryList(Categories)
    }, [])
    useEffect(() => {
        if (item === null) {
            localStorage.setItem("mainData", JSON.stringify(data))
        }
    }, [])

    const handleChange = () => {
    //   fix need
    }
    const handleAddCategory = (e: any) => {
        setCategory(e.target.value)
    }
    const handleCategoryUpdation = () => {
        if (newCategory === "") return
        let newOrder = categoryList.length + 1
        let list = { isMain: true, order: newOrder, name: newCategory }
        setCategoryList(prevState => [...prevState, list]);
        localStorage.setItem("mainCategoryList",JSON.stringify([...categoryList,list]))
        setCategory("")
    }
    const handleCategoryRemoval = (e: any) => {
        let val = localStorage.getItem("categoryName")
        let getMain = localStorage.getItem("mainData")
        if (val) {
            console.log(val)
            if (getMain) {
                let newarr = JSON.parse(getMain).filter((item: any) => {
                    return item.category.name !== val
                })
                localStorage.setItem("mainData", JSON.stringify(newarr))
               
            }
            const valRemovedList = categoryList.filter((item) => item.name !== val)
            setCategoryList(valRemovedList)
            localStorage.setItem("mainCategoryList",JSON.stringify(valRemovedList))
            setIsOpen(false)
        } else {
            console.log("no val")
        }
       
    }
    const handelEditChange = () => {
        // TODO document why this arrow function is empty


    }
    useEffect(() => {
        let getMain = localStorage.getItem("mainData")
        if (getMain) {
           
            let newarr = JSON.parse(getMain).map((item: any) => {
                return {
                    ...item, // Return all properties of the current item
                    date: new Date(item.date.split("T")[0]) // Update the date property
                };
            })
         

            setData(newarr)
        }

    }, [item,modalIsOpen]);

    function handleClick() {

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
            <div className='category-main'>
            {index === 0 ? (<>
                <div className="header" >
                    <h3>Expense Tracking</h3>
                    <div style={{ width: '20px' }}></div>
                    < CustomButton name="Add" onClick={handleClick} />
                </div>
                <Expenses expenses={data} handelEditChange={handelEditChange} /></>) :
                (<>

                    <div className="header" >
                        <h3>Category</h3>

                    </div>

                    <CategoryList
                        handleCategoryRemoval={handleCategoryRemoval}
                        handleCategoryUpdation={handleCategoryUpdation}
                        newCategory={newCategory}
                        modalIsOpen={modalIsOpen}
                        setIsOpen={setIsOpen}
                        categories={categoryList}
                        setCategoryList={setCategoryList}
                        onCategoriesChange={handleChange}
                        handleAddCategory={handleAddCategory} /></>)}



            <div className='button-2'>
                <CustomButton2 name="Expenses" onClick={handleExpenseSwitch} />
                <CustomButton2 name="Category" onClick={handleCategorySwitch} />

            </div>
            </div>
        </>
    )
}
export default Home;