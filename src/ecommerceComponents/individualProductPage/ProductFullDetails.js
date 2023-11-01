import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ProductFullDetails() {

  const { productID } = useParams();
  const [cart, setToCart] = useState([]);

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = () => {
    const cartList = JSON.parse(localStorage.getItem('cart'));
    setToCart(cartList ? cartList : []);
  }

  const getProductItem = () => {
    const productList = JSON.parse(localStorage.getItem('products'));
    const product = productList.find(product => product.id === productID);
    return product ? product : {};
  }

  const isProductInCart = () => {
    return cart.find(cartItem => cartItem.id === productID) !== undefined;
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
      <div className='card-container'>
        <div className="product-card">
          <img className='image-style' alt='product' src={product.imageurls.small} />{/*Without require('./'+) the image won't apppear here*/}
          <div className='card-text'>
            <p>{product.name}</p>
            <p>{product.price}</p>
            <button id="add-to-cart" onClick={() => { addToCart() }}>{isInCart ? "Added to cart" : "Add to cart"}</button>
          </div>
        </div>
      </div>
    </>
  )
}
