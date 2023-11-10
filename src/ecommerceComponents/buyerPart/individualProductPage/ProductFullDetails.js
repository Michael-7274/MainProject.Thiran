import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './productFullDetails.css';
import NavBar from '../../generalComponents/navBar/NavBar';
export default function ProductFullDetails() {

  //product ID obtained as params
  const { productID } = useParams();

  //cart state to store cart items
  //Don' t remove this state because it helps change the button text to "Added to cart" when clicked
  const [cart, setToCart] = useState([]);

  //useNavigate to navigate to another page
  const navigate = useNavigate();

  //get the cartId for the current user
  //used to store the item in the appropriate cart
  const cartId = "cart" +JSON.parse(localStorage.getItem('authentication')).id;

  //useEffect to invoke getCartItems() and add event listener 'focus' to page 
  useEffect(() => {
    getCartItems();
  }, []);

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
      "imageurls": {
        "small": ""
      }
    };
  }

  //the product object is stored into the product constant
  const product = getProductItem();

  //checks if there are new lines in the description (i.e)'/n',this function puts <br/> in place of '\n' to create new lines
  const getProperDescription = () => {
    const d= new Date();
    let descriptionLines = product.description.split('\n')
    console.log(descriptionLines);
    return descriptionLines.map((description,i) => <li key={d.getTime()+i}>{description}</li>);
  }

  //the description array is stored into description constant
  const description = getProperDescription();
  console.log(description);

  //function to get the items which are in cart or create an empty array if cart unavailable in local storage
  const getCartItems = () => {
    const cartList = localStorage.getItem(cartId);
    setToCart(cartList && (cartList !== "undefined") ? JSON.parse(cartList) : []);
  }

  //function to check if the product is in cart
  const isProductInCart = () => {
    return (cart.find(cartItem => cartItem.id === productID)) !== undefined;
  }

  //constant to store boolean obtained from isProductIncart() 
  const isInCart = isProductInCart();

  //adds the current item shown to cart
  const addToCart = () => {
    if (!isInCart) {
      let cartItems = [...cart, product];
      localStorage.setItem(cartId, JSON.stringify(cartItems));
      setToCart(cartItems);
      navigate('/cart');
    }
    else {
      navigate('/cart');
    }
  }

  return (
    <>
      <NavBar />
      <div className="split-container">

        <div className="left-section">
          <img src={product.imageurls.small} alt='product' />
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
