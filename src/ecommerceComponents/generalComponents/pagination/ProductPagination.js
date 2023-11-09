import './pagination.css'
export default function ProductPagination({ itemCount, currentPage, setCurrentPage }) {

    const buttonCount = Math.ceil(itemCount / 10);

    const setPgNoToLocalStorage = (pgNo) => {
        localStorage.setItem("pgNo", JSON.stringify(pgNo));
    }

    //decrease page count on click
    function goToPreviousPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setPgNoToLocalStorage(currentPage - 1);
        }
    }

    //increase page count on click
    function goToNextPage() {
        if (currentPage < buttonCount) {
            setCurrentPage(currentPage + 1);
            setPgNoToLocalStorage(currentPage + 1);
        }
    }

    //generate the buttons based on itemcount
    function generateButtons() {
        const buttons = [];
        for (let i = 1; i <= buttonCount; i++) {
            buttons.push(<button key={"B" + i}
                className={currentPage === i ? 'highlight' : 'normal'}
                onClick={() => { changeCurrentPage(i) }}>{i}</button>)
        }
        return buttons;
    }

    //changes page based on the button clicked
    const changeCurrentPage = (i) => {
        setCurrentPage(i);
        setPgNoToLocalStorage(i);
    }

    //the buttons are stored in the button array  
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
