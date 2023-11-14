import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './productFullDetails.css';
import NavBar from '../../generalComponents/navBar/NavBar';

export default function ProductFullDetails({logout}) {

  //product ID obtained as params
  const { productID } = useParams();

  //get the cartId for the current user
  //used to store the item in the appropriate cart
  const cartId = "cart" + JSON.parse(localStorage.getItem('authentication')).id;

  //getting the cart items from localstorage
  const cartList = localStorage.getItem(cartId);
  const cart=cartList && (cartList !== "undefined") ? JSON.parse(cartList) : []

  //useNavigate to navigate to another page
  const navigate = useNavigate();


  //function to get a particular product object from productList array
  const getProductItem = () => {
    const productList = JSON.parse(localStorage.getItem('products'));
    const product = productList.find(product => product.id === productID);
    return product ? product : {
      "name": "",
      "image": "",
      "category": "",
      "description": "",
      "price": "",
      "warranty": "",
      "return": "",
      "imageurl": ""
    };
  }

  //the product object is stored into the product constant
  const product = getProductItem();

  //checks if there are new lines in the description (i.e)'/n',this function puts <br/> in place of '\n' to create new lines
  const getProperDescription = () => {
    const d = new Date();
    let descriptionLines = product.description.split('\n')
    return descriptionLines.map((description, i) => <li key={d.getTime() + i}>{description}</li>);
  }

  //the description array is stored into description constant
  const description = getProperDescription();

  //function to check if the product is in cart
  const isProductInCart = () => {
    return (cart.find(cartItem => cartItem.id === productID)) !== undefined;
  }

  //constant to store boolean obtained from isProductIncart() 
  const isInCart = isProductInCart();

  //adds the current item shown to cart
  const addToCart = () => {
    if (!isInCart) {
      let cartItems = [...cart];
      cartItems.splice(0, 0, product);
      localStorage.setItem(cartId, JSON.stringify(cartItems));
      navigate('/cart');
    }
    else {
      navigate('/cart');
    }
  }

  return (
    <>
      <NavBar logout={logout}/>
      <div className="split-container">

        <div className="left-section">
          <img src={product.imageurl} alt='product' />
        </div>

        <div className="right-section">
          <h2>{product.name}</h2>
          <p><b>Description:</b></p>
          <ul>{description}</ul>
          <p><b>Price:</b> Rs.{product.price}</p>
          <p><b>Warranty:</b> {product.warranty}</p>
          <p><b>Return:</b> {product.return}</p>
          <button onClick={() => { addToCart() }}>{isInCart ? "Added to cart" : "Add to cart"}</button>
        </div>

      </div>

    </>
  )
}
