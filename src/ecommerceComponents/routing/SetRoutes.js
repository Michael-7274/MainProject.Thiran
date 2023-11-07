import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../loginPart/Login';
import AssignProducts from '../productCatalogPart/AssignProducts';
import ProductFullDetails from '../individualProductPage/ProductFullDetails';
import Cart from '../cartPart/Cart';
import PageNotFound from '../PageNotFound';
import SellerMainPage from '../sellerPart/SellerMainPage';
import AddOrUpdateProducts from '../sellerPart/AddOrUpdateProducts';

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

    //Find the user who is currently logged-in -using local storage
    const getAuthentication = () => {

        let data = localStorage.getItem('authentication');
        if (data && (data!=="undefined")) {
            data=JSON.parse(data);
            setAuth(data);
        }
        else {
            setNewAuthentication();
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
                                        <Route exact path='/cart' element={<Cart />}></Route>
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
