import React from 'react'
import '../../../css/catalog.css'
import { NavLink } from 'react-router-dom';
//function to show individual products in the catalog
export default function ProductShow({ productItem }) {
  let productVariable = productItem;

  return (

    <div className="zoom">
      <NavLink to={`/product/${productVariable.id}`}>
        <div className="product-card">
          <img className='image-style' alt='product' src={productItem.imageurl} />
          <div className='card-text'>
            <p>{productVariable.name}</p>
            <p>Rs.{productVariable.price}</p>
          </div>
        </div>
      </NavLink>
    </div>

  )
}
