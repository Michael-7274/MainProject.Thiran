import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../loginPart/Login';
import PageNotFound from '../PageNotFound';
import SellerMainPage from '../sellerPart/sellerMainPage/SellerMainPage';
import AddOrUpdateProducts from '../sellerPart/addOrUpdateProduct/AddOrUpdateProducts';
import AssignProducts from '../buyerPart/productCatalogPage/AssignProducts';
import ProductFullDetails from '../buyerPart/individualProductPage/ProductFullDetails';
import Cart from '../buyerPart/cartPage/Cart';

export default function SetRoutes() {

    //Authorization state object to control user login 
    const [auth, setAuth] = useState({
        "authemtication":false,
        "role":null
    });

    //invoke getAuthentication() to get auth object 
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

    //Find the user who is currently logged in from local storage
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
                    {   //based on user authentication let user access site
                        (!auth.authentication) ?
                            //login page initially shown to the user
                            <Route exact path='/' element={<Login setAuth={setAuth} />}></Route> :
                            (//based on user role set paths accessible by the user
                                (auth.role === 'buyer') ?
                                    <>
                                        {/* paths accessible to the buyer customer */}
                                        {/* '/' path overwitten to avoid showing the login page to user after login */}
                                        <Route exact path='/' element={<AssignProducts />}></Route>

                                        {/* catalog page to show products to the user */}
                                        <Route exact path='/catalog' element={<AssignProducts />}>
                                        </Route>

                                        {/* Page to show full details of the product */}
                                        <Route exact path='/product/:productID' element={<ProductFullDetails />}></Route>

                                        {/* Cart page to view the items added to cart */}
                                        <Route exact path='/cart' element={<Cart />}></Route>
                                    </> :
                                    <>
                                        {/* paths accessible to the seller */}
                                        {/* '/' path overwitten to avoid showing the login page to user after login */}
                                        <Route exact path='/' element={<SellerMainPage logout={setNewAuthentication} />}>
                                        </Route>
                                        {/* seller page to show products soldby seller */}
                                        <Route exact path='/seller'element={<SellerMainPage logout={setNewAuthentication} />}>
                                        </Route>
                                        {/* form page to add or update products*/}
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
