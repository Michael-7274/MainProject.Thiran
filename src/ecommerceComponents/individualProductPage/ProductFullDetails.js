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
    return () => {
      window.removeEventListener('focus', refreshPage);//removes the eventlistener when we are in the tab to avoid memory leaks
    }
  }, []);

  //refreshes the page whenever we return to it from another tab
  const refreshPage = () => {
    window.location.reload();
  }

  //get the items which are in cart or create an empty array if cart unavailable in local storage
  const getCartItems = () => {
    const cartList = localStorage.getItem('cart');
    setToCart(cartList && (cartList !== "undefined") ? JSON.parse(cartList) : []);
  }

  //get this particular product from array
  const getProductItem = () => {
    const productList = JSON.parse(localStorage.getItem('products'));
    const product = productList.find(product => product.id === productID);
    return product ? product : {};
  }

  //check if the product is in cart
  const isProductInCart = () => {
    return (cart.find(cartItem => cartItem.id === productID)) !== undefined;
  }

  const product = getProductItem();
  console.log(product);
  
  //checks if there are new lines in the description and puts <br/> in place of '\n' to create new lines
  const getProperDescription=()=>{
    let descriptionLines=product.description.split('\n')
    return descriptionLines.map((description)=><p>{description}</p>);
  }

  const isInCart = isProductInCart();

  const description=getProperDescription();

  //adds the current item shown to cart
  const addToCart = () => {
    if (!isInCart) {
      let cartItems = [...cart, product];
      localStorage.setItem('cart', JSON.stringify(cartItems));
      setToCart(cartItems);
    }
  }

  return (
    <>
        <div class="split-container">

          <div class="left-section">
            <img src={product.imageurls.small} alt='product'/>
          </div>

          <div class="right-section">
            <h2>{product.name}</h2>
            <p>Category: {product.category}</p>
            <p>Description: {description}</p>
            <p>Price: Rs.{product.price}</p>
            <p>Warranty: {product.warranty}</p>
            <p>Return: {product.return}</p>
            <button onClick={() => { addToCart() }}>{isInCart ? "Added to cart" : "Add to cart"}</button>
          </div>

        </div>

      </>
  )
}
