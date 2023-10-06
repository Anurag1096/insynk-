
type Props={
    handleSubmit:(e: React.FormEvent)=>void;
    formState:any,
    ExpenseTypeEnum:any,
    handleChange:(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    Categories:any,
}


const AddEditForm=(prop:Props)=>{
    const {handleSubmit,formState,ExpenseTypeEnum,handleChange,Categories}= prop;
    return (

        <form >
        {/* Type Selector */}
        <div>
            <label>Type:</label>
            <select name="type" value={formState.type} onChange={handleChange}>
                <option value={ExpenseTypeEnum.CashIn}>{ExpenseTypeEnum.CashIn}</option>
                <option value={ExpenseTypeEnum.CashOut}>{ExpenseTypeEnum.CashOut}</option>
            </select>
        </div>

        {/* Category Selector */}
        <div>
            <label>Category:</label>
            <select name="category" value={formState.category.name} onChange={handleChange}>
                {Categories.map((cat:any, index:number) => (
                    <option key={index} value={cat.name}>{cat.name}</option>
                ))}
            </select>
        </div>

        {/* Date Input */}
        <div>
            <label>Date:</label>
            <input type="date" name="date" value={formState.date.toISOString().split('T')[0]} onChange={handleChange} />
        </div>

        {/* Amount Input */}
        <div>
            <label>Amount:</label>
            <input type="number" name="amount" value={formState.amount} onChange={handleChange} />
        </div>

        {/* Description Input */}
        <div>
            <label>Description:</label>
            <textarea name="description" value={formState.description} onChange={handleChange}></textarea>
        </div>    
    </form>
    )
}
export default AddEditForm;