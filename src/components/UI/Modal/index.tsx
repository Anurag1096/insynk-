import React from 'react'
import Modal from 'react-modal';
import { CustomButton, CustomButton2 } from '../Buttons';
const customStyles = {
    content: {
      top: '40%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius:'10px',
      fontSize:"14px",
    },
  };
  type Props={
    modalIsOpen:boolean;
    afterOpenModal:()=>void;
    info:string;
    closeModal:()=>void;
    handleCategoryRemoval:(e:any)=>void;
  }
const CustomModal=(props:Props)=>{
    const {modalIsOpen,afterOpenModal,closeModal,info,handleCategoryRemoval}=props
    let val=localStorage.getItem("categoryName")

    return(<>
    <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className='wrapper-text'>

        <div className='text'>. {val} will be removed</div>
        <div className='text'>. All expenses with this category will also be removed</div>
        <div className='text'>Do you really want to remove?</div>
        </div>
        <div className='button-2'>
        <CustomButton2 name={"Confirm"} onClick={handleCategoryRemoval}/>
        <CustomButton2 name={"Cancel"} onClick={closeModal} />

        </div>
     
      </Modal>
    </>)
}

export default CustomModal;