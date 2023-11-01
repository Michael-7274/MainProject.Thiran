import React from 'react'
import './catalog.css'
import { NavLink } from 'react-router-dom';

export default function ProductShow({productItem}) {
  let productVariable=productItem;

  return (
    <NavLink target='_blank' to={`/product/${productVariable.id}`}>
    <div className="product-card">
      <img className='image-style' alt='product' src={productItem.imageurls.small}/>
      <div className='card-text'>
      <p>{productVariable.name}</p>
      <p>{productVariable.price}</p>  
      </div>  
    </div>
    </NavLink>
  )
}
