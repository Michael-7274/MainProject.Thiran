import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../loginPage/Login';
import ProductSet from '../productCatalogPage/ProductSet';
import ProductFullDetails from '../individualProductPage/ProductFullDetails';
import CartPage from '../cartPage/CartPage';
import PageNotFound from '../PageNotFound';
import SellerMainPage from '../sellerPages/SellerMainPage';
import AddOrUpdateProducts from '../sellerPages/AddOrUpdateProducts';

export default function SetRoutes() {

    const [auth, setAuth] = useState({});


    useEffect(() => {
        getAuthentication();
    }, [])


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

    const getAuthentication = () => {

        let data = JSON.parse(localStorage.getItem('authentication'));
        if (data) {
            setAuth(data);
        }
        else {
            setNewAuthentication();
            data = JSON.parse(localStorage.getItem('authentication'));
            setAuth(data);
        }

    }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    {
                        (!auth.authentication) ?
                            <Route exact path='/' element={<Login setAuth={setAuth} />}></Route> :
                            (
                                (auth.role === 'buyer') ?
                                    <>
                                        <Route exact path='/' element={<ProductSet logout={setNewAuthentication} />}></Route>
                                        <Route exact path='/catalog' element={<ProductSet logout={setNewAuthentication} />}>
                                        </Route>
                                        <Route exact path='/product/:productID' element={<ProductFullDetails />}></Route>
                                        <Route exact path='/cart' element={<CartPage />}></Route>
                                    </> :
                                    <>
                                        <Route exact path='/' element={<SellerMainPage logout={setNewAuthentication} />}>
                                        </Route>
                                        <Route exact path='/seller'element={<SellerMainPage logout={setNewAuthentication} />}>
                                        </Route>
                                        <Route exact path='/productcreateorupdate' element={<AddOrUpdateProducts />}></Route>
                                    </>
                            )
                    }
                    <Route exact path='*' element={<PageNotFound />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
