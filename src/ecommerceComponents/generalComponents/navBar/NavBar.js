import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import './navBar.css'
export default function NavBar({logout}) {
    //filter is given as a state to maintain the filter text in search bar when switching pages
    const [filter, setFilter] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    //invoke getFilterWordFromLocalStorage() to show filter word in search bar
    useEffect(() => {
        getFilterWordFromLocalStorage();
    }, [])

    //function to logout-sets local storage with default values and navigates to '/'
    const toLogout = () => {
        // localStorage.setItem('authentication', JSON.stringify(
        //     {
        //         authentication: false,
        //         role: null
        //     }
        // ));
        localStorage.setItem("pgNo", JSON.stringify(1));
        localStorage.setItem("filter", JSON.stringify(''));
        logout();
        navigate('/');
        
    }

    //function to remove all filters and show all items in catalog page
    const goToCatalogHome = () => {
        localStorage.setItem("filter", JSON.stringify(''));
        localStorage.setItem("pgNo", JSON.stringify(1));
        let path = location.pathname;
        if (path === '/' || path === '/catalog') {
            window.location.reload();
        }
        else {
            navigate('/catalog');
        }
    }

    //function to invoke search using the word in filter state 
    const searchProduct = (e) => {
        e.preventDefault();
        localStorage.setItem("filter", JSON.stringify(filter));
        localStorage.setItem("pgNo", JSON.stringify(1));
        let path = location.pathname;
        if (path === '/' || path === '/catalog') {
            window.location.reload();
        }
        else {
            navigate('/catalog');
        }
    }

    //get the last used filter word from local storage and set it to filter state
    const getFilterWordFromLocalStorage = () => {
        let filterWord = localStorage.getItem("filter")
        if (filterWord && filterWord !== "undefined") {
            setFilter(JSON.parse(filterWord));
        }
        else {
            localStorage.setItem("filter", JSON.stringify(""));
            setFilter('');
        }
    }

    return (
        <div className='search-container'>
            <div className='centerdiv'>
                <button id='catalog-logout-button' title='Logout' onClick={toLogout} >Logout</button>
                <button id="home" title='Home' onClick={goToCatalogHome}></button>
                <form onSubmit={searchProduct}>
                <input id='search-bar' defaultValue={filter} onChange={(event) => { setFilter(event.target.value) }} />
                </form>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button id='search-button' title='search' onClick={searchProduct}></button>
                <NavLink to={'/cart'}>
                    <button id='cart-button' title='Go to cart'></button>
                </NavLink>
            </div>
        </div>
    )
}
