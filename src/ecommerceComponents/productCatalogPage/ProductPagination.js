import React, { useState } from 'react'
import './catalog.css'
export default function ProductPagination({ itemCount, currentPage, setCurrentPage }) {

    const buttonCount = Math.ceil(itemCount / 10);

    //decrease page count on click
    function goToPreviousPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    //increase page count on click
    function goToNextPage() {
        if (currentPage < buttonCount) {
            setCurrentPage(currentPage + 1);
        }
    }

    //generate the buttons based on itemcount
    function generateButtons() {
        const buttons = [];
        for (let i = 1; i <= buttonCount; i++) {
            buttons.push(<button key={"B" + i} className={currentPage === i ? 'highlight' : ''}
                onClick={() => { changeCurrentPage(i) }}>{i}</button>)//Directly pushing to button array kept outside the 
                                                                      //function pushes button objects into the array which 
                                                                      //can't be shown on screen
        }
        return buttons;
    }

    //changes page based on the button clicked
    const changeCurrentPage = (i) => {
        setCurrentPage(i);
    }

    //the buttons are stored in the button array  
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
