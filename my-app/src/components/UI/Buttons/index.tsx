import React from 'react';
import './buttons.css'
interface ButtonProps {
    name:string;
    onClick: (e: React.FormEvent) => void;
}

export const CustomButton: React.FC<ButtonProps> = ({name="Click Button", onClick }) => {
    return (
        <button className="my-button" onClick={onClick}>{name}</button>
    );
}

export const CustomButton2:React.FC<ButtonProps>=({name="Click Button 2",onClick})=>{
    return (
        <button className="my-button2" onClick={onClick}>
        {name}
    </button>
   
    )
}