import React, { useState } from 'react'
import'./catalog.css'
export default function ProductPagination({itemCount,currentPage,setCurrentPage}) {
    
    const buttonCount = Math.ceil(itemCount / 10);

    function goToPreviousPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function goToNextPage() {
        if(currentPage<buttonCount){
            setCurrentPage(currentPage+1);
        }
    }

    //const buttons=[];
    function generateButtons() {
        const buttons = [];
        for (let i = 1; i <= buttonCount; i++) 
        {
            buttons.push(<button key={"B"+i} className={currentPage === i ? 'highlight' : ''} 
            onClick={() => { changeCurrentPage(i) }}>{i}</button>)//Directly pushing to button array kept outside the function 
                                                                  //Pushes button objects into the array which can't be shown 
                                                                  //on screen
        }
        return buttons;
    }

    const changeCurrentPage = (i) => {
        setCurrentPage(i);
    }

    const buttons = generateButtons();

    return (
        <>
        <div className='page-button-container'>
        <div className='centerdiv'>        
        <button onClick={goToPreviousPage}>{'<'}</button>
            {buttons}
        <button onClick={goToNextPage}>{'>'}</button></div>
        </div>

        </>
    )
}
