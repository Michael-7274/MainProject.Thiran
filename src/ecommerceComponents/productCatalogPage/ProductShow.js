import React from 'react'
import './catalogStyle.css'
import { NavLink } from 'react-router-dom';

export default function ProductShow({productItem}) {
  let productVariable=productItem;

  return (
    <NavLink target='_blank' to={`/product/${productItem.id}`}>
    <div className="product-card">
      <img className='image-style' alt='product' src={require('./'+productVariable.image)}/>{/*Without require('./'+) the image won't apppear here*/}
      <div className='card-text'>
      <p>{productVariable.name}</p>
      <p>{productVariable.price}</p>  
      </div>  
    </div>
    </NavLink>
  )
}
