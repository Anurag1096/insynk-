import './AddEdit.css'
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

        <form className='form'>
        {/* Type Selector */}
        <div className="selector-style">
            <div className='label'>Type</div>
           
            <div className="switch-field">
		<input type="radio" id="radio-one" name="type" onChange={handleChange} value={ExpenseTypeEnum.CashIn} checked={formState.type === ExpenseTypeEnum.CashIn}/>
		<label htmlFor="radio-one">{ExpenseTypeEnum.CashIn}</label>
		<input type="radio" onChange={handleChange} id="radio-two" name="type" value={ExpenseTypeEnum.CashOut} checked={formState.type === ExpenseTypeEnum.CashOut} />
		<label htmlFor="radio-two">{ExpenseTypeEnum.CashOut}</label>
	</div>
        </div>

        {/* Category Selector */}
        <div>
            <div className='label'>Category</div>
            <select name="category" value={formState.category.name} onChange={handleChange}>
                {Categories.map((cat:any, index:number) => (
                    <option key={index} value={cat.name}>{cat.name}</option>
                ))}
            </select>
        </div>

        {/* Date Input */}
        <div>
            <div className='label'>Date</div>
            <input type="date" name="date" value={formState.date.toISOString().split('T')[0]} onChange={handleChange} />
        </div>

        {/* Amount Input */}
        <div>
            <div className='label'>Amount</div>
            <input type="number" name="amount" value={formState.amount} onChange={handleChange} />
        </div>

        {/* Description Input */}
        <div>
            <div className='label'>Description</div>
            <textarea name="description" value={formState.description} onChange={handleChange}></textarea>
        </div>    
    </form>
    )
}
export default AddEditForm;