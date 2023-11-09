import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './navBar.css'
export default function NavBar() {
    const [filter, setFilter] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        getFilterWord();
    }, [])

    const logout = () => {
        localStorage.setItem('authentication', JSON.stringify(
            {
                authentication: false,
                role: null
            }
        ));
        localStorage.setItem("pgNo", JSON.stringify(1));
        localStorage.setItem("filter", JSON.stringify(''));
        navigate('/');
        window.location.reload();
    }

    const goToCatalogHome=()=>{
        localStorage.setItem("filter", JSON.stringify(''));
        localStorage.setItem("pgNo",JSON.stringify(1));
        let path=window.location.pathname;
        if(path==='/'||path==='/catalog')
        {
            window.location.reload();
        }
        else
        {
            navigate('/catalog');
        }
    }

    const setFilterWord = (event) => {
        setFilter(event.target.value);
    }

    const searchProduct = () => {
        localStorage.setItem("filter", JSON.stringify(filter));
        localStorage.setItem("pgNo", JSON.stringify(1));
        let path=window.location.pathname;
        if(path==='/'||path==='/catalog')
        {
            window.location.reload();
        }
        else
        {
            navigate('/catalog');
        }
    }

    const getFilterWord = () => {
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
                <button id='catalog-logout-button' title='Logout' onClick={logout} >Logout</button>
                <button id="home" title='Home' onClick={goToCatalogHome}></button>
                <input id='search-bar' defaultValue={filter} onChange={(event) => { setFilterWord(event) }} />&nbsp;&nbsp;
                &nbsp;&nbsp;
                <button id='search-button' title='search' onClick={searchProduct}></button>
                <NavLink to={'/cart'}>
                    <button id='cart-button' title='Go to cart'></button>
                </NavLink>
            </div>
        </div>
    )
}
