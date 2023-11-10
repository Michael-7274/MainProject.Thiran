import './pagination.css'
export default function ProductPagination({ itemCount, currentPage, setCurrentPage }) {

    //get the no of buttons to generate based on the itemcount of products
    const buttonCount = Math.ceil(itemCount / 10);

    //function to set the changed pgNo on local storage
    const setPgNoToLocalStorage = (pgNo) => {
        localStorage.setItem("pgNo", JSON.stringify(pgNo));
    }

    //function to decrease page count on click
    function goToPreviousPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setPgNoToLocalStorage(currentPage - 1);
        }
    }

    //function to increase page count on click
    function goToNextPage() {
        if (currentPage < buttonCount) {
            setCurrentPage(currentPage + 1);
            setPgNoToLocalStorage(currentPage + 1);
        }
    }

    //function to generate the buttons based on itemcount
    function generateButtons() {
        const buttons = [];
        for (let i = 1; i <= buttonCount; i++) {
            buttons.push(<button key={"B" + i}
                className={currentPage === i ? 'highlight' : 'normal'}
                onClick={() => { changeCurrentPage(i) }}>{i}</button>)
        }
        return buttons;
    }

    //function to changes page based on the page no of button clicked
    const changeCurrentPage = (i) => {
        setCurrentPage(i);
        setPgNoToLocalStorage(i);
    }

    //the buttons are stored in the button variable as an array
    const buttons = generateButtons();

    return (
        <>
            <div className='page-no-button-container'>
                <button id="previous" onClick={goToPreviousPage}>Previous</button>
                <div className='pages'>{buttons}</div>
                <button id="next" onClick={goToNextPage}>Next</button>
            </div>

        </>
    )
}
