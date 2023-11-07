import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../loginPage/Login';
import AssignProducts from '../productCatalogPage/AssignProducts';
import ProductFullDetails from '../individualProductPage/ProductFullDetails';
import AssignCartProducts from '../cartPage/AssignCartProducts';
import PageNotFound from '../PageNotFound';
import SellerMainPage from '../sellerPages/SellerMainPage';
import AddOrUpdateProducts from '../sellerPages/AddOrUpdateProducts';

export default function SetRoutes() {

    const [auth, setAuth] = useState({});

    useEffect(() => {
        getAuthentication();
    }, [])

    //set the authentication to null(no one) , also doubles as logout
    function setNewAuthentication() {
        localStorage.setItem('authentication', JSON.stringify(
            {
                authentication: false,
                role: null
            }
        ));
        setAuth({
            authentication: false,
            role: null
        });
    }

    //Find the user who is currently logged-in from local storage
    const getAuthentication = () => {

        let data = localStorage.getItem('authentication');
        if (data && (data!=="undefined")) {
            data=JSON.parse(data);
            setAuth(data);
        }
        else {
            setNewAuthentication();
            // data = JSON.parse(localStorage.getItem('authentication'));
            // setAuth(data);
        }
    }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    {   //based on user authentication set the routes available for a user
                        (!auth.authentication) ?
                            <Route exact path='/' element={<Login setAuth={setAuth} />}></Route> :
                            (
                                (auth.role === 'buyer') ?
                                    <>
                                        <Route exact path='/' element={<AssignProducts logout={setNewAuthentication} />}></Route>
                                        <Route exact path='/catalog' element={<AssignProducts logout={setNewAuthentication} />}>
                                        </Route>
                                        <Route exact path='/product/:productID' element={<ProductFullDetails />}></Route>
                                        <Route exact path='/cart' element={<AssignCartProducts />}></Route>
                                    </> :
                                    <>
                                        <Route exact path='/' element={<SellerMainPage logout={setNewAuthentication} />}>
                                        </Route>
                                        <Route exact path='/seller'element={<SellerMainPage logout={setNewAuthentication} />}>
                                        </Route>
                                        <Route exact path='/productcreateorupdate/:id' element={<AddOrUpdateProducts />}></Route>
                                    </>
                            )
                    }
                    <Route exact path='*' element={<PageNotFound />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
