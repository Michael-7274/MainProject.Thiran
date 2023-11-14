import React, { useEffect, useState } from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import Login from '../loginPart/Login';
import PageNotFound from '../PageNotFound';
import SellerMainPage from '../sellerPart/sellerMainPage/SellerMainPage';
import AddOrUpdateProducts from '../sellerPart/addOrUpdateProduct/AddOrUpdateProducts';
import AssignProducts from '../buyerPart/productCatalogPage/AssignProducts';
import ProductFullDetails from '../buyerPart/individualProductPage/ProductFullDetails';
import Cart from '../buyerPart/cartPage/Cart';
import authStructCreator from '../generalComponents/structureCreator/authStructCreactor';

export default function SetRoutes() {

    const defaultAuth = new authStructCreator(false, null);
    const isAlreadyAuth = localStorage.getItem('authentication');
    //Authorization state object to control user login 
    const [auth, setAuth] = useState(isAlreadyAuth && isAlreadyAuth !== "undefined" ? JSON.parse(isAlreadyAuth) : defaultAuth);

    //set the authentication to null(no one) , also doubles as logout
    function logout() {
        localStorage.setItem('authentication', JSON.stringify(defaultAuth));
        setAuth(defaultAuth);
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
                                        <Route exact path='/' element={<AssignProducts logout={logout} />}></Route>

                                        {/* catalog page to show products to the user */}
                                        <Route exact path='/catalog' element={<AssignProducts logout={logout} />}>
                                        </Route>

                                        {/* Page to show full details of the product */}
                                        <Route exact path='/product/:productID'element={<ProductFullDetails logout={logout}/>}>
                                        </Route>

                                        {/* Cart page to view the items added to cart */}
                                        <Route exact path='/cart' element={<Cart logout={logout} />}></Route>
                                    </> :
                                    <>
                                        {/* paths accessible to the seller */}
                                        {/* '/' path overwitten to avoid showing the login page to user after login */}
                                        <Route exact path='/' element={<SellerMainPage logout={logout} />}>
                                        </Route>
                                        {/* seller page to show products soldby seller */}
                                        <Route exact path='/seller' element={<SellerMainPage logout={logout} />}>
                                        </Route>
                                        {/* form page to add or update products*/}
                                        <Route exact path='/productcreateorupdate/:id' element={<AddOrUpdateProducts />}>
                                        </Route>
                                    </>
                            )
                    }
                    <Route exact path='*' element={<PageNotFound />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
