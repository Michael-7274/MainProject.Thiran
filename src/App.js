import { useState } from "react";
import createAuthStruct from "./components/structureCreator/createAuthStruct";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import SellerMainPage from "./pages/sellerPages/sellerMainPage/SellerMainPage";
import AddOrUpdateProducts from "./pages/sellerPages/productUpdatePage/AddOrUpdateProducts";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/loginPage/Login";
import AssignProducts from "./pages/buyerPages/productCatalogPage/AssignProducts";
import ProductFullDetails from "./pages/buyerPages/individualProductPage/ProductFullDetails";
import Cart from "./pages/buyerPages/cartPage/Cart";
export default function App() {

    const defaultAuth = new createAuthStruct(false, null);
    const isAlreadyAuth = localStorage.getItem('authentication');
    //Authorization state object to control user login 
    const [auth, setAuth] = useState(isAlreadyAuth && isAlreadyAuth !== "undefined" ?
        JSON.parse(isAlreadyAuth) : defaultAuth);

    //set the authentication to null(no one) , also doubles as logout
    const logout=()=> {
        localStorage.setItem('authentication', JSON.stringify(defaultAuth));
        setAuth(defaultAuth);
    }
    const isAuth = auth.authentication;
    const isSeller = (auth.role === 'seller');

    return (
        <>
            <HashRouter>
                <Routes>
                    <Route exact path='/'
                        element={
                            isAuth ?
                                (isSeller ? <Navigate to="/seller" /> : <Navigate to="/catalog" />)
                                :
                                <Login setAuth={setAuth} />
                        }>
                    </Route>

                    <Route exact path='/catalog'
                        element={
                            isAuth ?
                                (isSeller ? <Navigate to="/seller" /> : <AssignProducts logout={logout} />)
                                :
                                <Navigate to="/" />
                        }
                    >
                    </Route>

                    <Route exact path='/product/:productID'
                        element={
                            isAuth ?
                                (isSeller ? <Navigate to="/seller" /> : <ProductFullDetails logout={logout} />)
                                :
                                <Navigate to="/" />
                        }>
                    </Route>

                    <Route exact path='/cart'
                        element={
                            isAuth ?
                                (isSeller ? <Navigate to="/seller" /> : <Cart logout={logout} />)
                                :
                                <Navigate to="/" />
                        }>
                    </Route>

                    <Route exact path='/seller'
                        element={
                            isAuth ?
                                (isSeller ? <SellerMainPage logout={logout} /> : <Navigate to="/catalog" />)
                                :
                                <Navigate to="/" />
                        }>
                    </Route>

                    <Route exact path='/productcreateorupdate/:id'
                        element={
                            isAuth ?
                                (isSeller ? <AddOrUpdateProducts /> : <Navigate to="/catalog" />)
                                :
                                <Navigate to="/" />
                        }>
                    </Route>

                    <Route exact path='*' element={<PageNotFound />}></Route>
                </Routes>
            </HashRouter>
        </>
    )
}
