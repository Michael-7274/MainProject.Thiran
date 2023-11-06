import React from 'react'
import './cart.css';
//component to show individual cart items
export default function ShowCartItems({ cartItemAndIndex, deleteItem }) {
  const itemArr = cartItemAndIndex;

  return (
    <div className="product-card">
      <img className='image-style' alt='product' src={itemArr[0].imageurls.small} />{/*Without require('./'+) the image won't apppear here*/}
      <div className='card-text'>
        <p>{itemArr[0].name}</p>
        <p>{itemArr[0].price}</p>
      </div>
      <button className="delete-from-cart" onClick={() => { deleteItem(itemArr[1]) }}>Delete from cart</button>
    </div>
  )
}
