import React from 'react'
import './catalogStyle.css'

export default function ProductShow({productItem}) {
  let productVariable=productItem;
  return (
    <div className="product-card">
      <img className='image-style' alt='product' src={require('./'+productVariable.image)}/>{/*Without require('./'+) the image won't apppear here*/}
      <div id='product-text'>
      <p>{productVariable.name}</p>
      <p>{productVariable.price}</p>  
      </div>  
    </div>
  )
}
