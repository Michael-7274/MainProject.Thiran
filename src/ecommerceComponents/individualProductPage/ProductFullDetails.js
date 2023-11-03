import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './individualProductPage.css';
export default function ProductFullDetails() {

  const { productID } = useParams();
  const [cart, setToCart] = useState([]);

  useEffect(() => {
    getCartItems();
  }, []);
  useEffect(() => {
    window.addEventListener('focus', refreshPage);//add a eventListener that calls refreshPage() when we get to the tab
    // return () => {
    //   window.removeEventListener('focus', refreshPage);//removes the eventlistener when we are in the tab to avoid memory leaks
    // }
  }, []);

  const refreshPage = () => {//refreshes the page whenever we return to it from another tab
    window.location.reload();
  }

  const getCartItems = () => {
    const cartList = JSON.parse(localStorage.getItem('cart'));
    setToCart(cartList && (cartList !== "undefined") ? cartList : []);
  }

  const getProductItem = () => {
    const productList = JSON.parse(localStorage.getItem('products'));
    const product = productList.find(product => product.id === productID);
    return product ? product : {};
  }

  const isProductInCart = () => {
    return (cart.find(cartItem => cartItem.id === productID)) !== undefined;
  }

  const product = getProductItem();

  const isInCart = isProductInCart();

  const addToCart = () => {
    if (!isInCart) {
      let cartItems = [...cart, product];
      localStorage.setItem('cart', JSON.stringify(cartItems));
      setToCart(cartItems);
    }
  }

  return (
    <>
      {/* <div className='card-container'>
        <div className="product-card">
          <img className='image-style' alt='product' src={product.imageurls.small} />{/*Without require('./'+) the image won't apppear here*/}
          {/*<div className='card-text'>
            <p>{product.name}</p>
            <p>{product.price}</p>
            <button id="add-to-cart" onClick={() => { addToCart() }}>{isInCart ? "Added to cart" : "Add to cart"}</button>
          </div>
        </div>
      </div> */}


      

        <div class="split-container">

          <div class="left-section">
            <img src={product.imageurls.full} />
          </div>

          <div class="right-section">
            <h2>{product.name}</h2>
            <p>Category: {product.category}</p>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            <p>Warranty: {product.warranty}</p>
            <p>Return: {product.return}</p>
            <button onClick={() => { addToCart() }}>{isInCart ? "Added to cart" : "Add to cart"}</button>
          </div>

        </div>

      </>
  )
}
