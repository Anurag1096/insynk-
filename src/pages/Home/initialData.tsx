import { Expense,ExpenseTypeEnum } from "../../interfaces"
export var InitialData:Expense[]=[
    {
        id:1,
    type: ExpenseTypeEnum.CashOut,
    category:  { isMain: true, order: 1, name: "Food" },
    date: new Date("2023-11-08"),
    amount: 4000,
    description: "some Info about the expense"
},
{
    id:2,
    type: ExpenseTypeEnum.CashIn,
    category:  { isMain: true, order: 3, name: "Work" },
    date: new Date("2023-10-06"),
    amount: 2000,
    description: "some Info about the expense"
},
{
    id:3,
    type: ExpenseTypeEnum.CashOut,
    category:  { isMain: true, order: 2, name: "Transportation" },
    date: new Date("2023-10-06"),
    amount: 7000,
    description: "some Info about the expense"
}
]