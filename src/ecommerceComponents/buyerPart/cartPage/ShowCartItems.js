import React from 'react'
import './cart.css';
import { NavLink } from 'react-router-dom';
//component to show a single cart item
//the props contain the item, it's index and function to delete the item
export default function ShowCartItems({ cartItemAndIndex, deleteItem }) {
  const itemArr = cartItemAndIndex;

  //checks if there are new lines in the description (i.e)'/n' and returns them as text inside <p></p>
  const getProperDescription = () => {
    let descriptionLines = itemArr[0].description.split('\n')
    return descriptionLines[0].slice(0,30)+" ....";
  }

  //the array of description lines is stored here
  const description = getProperDescription();

  return (
    <>

      <tr>
        <td>
          <NavLink to={`/product/${itemArr[0].id}`}>
            <div className='centerdiv'>
              <img className='cart-item-image' alt='product' src={itemArr[0].imageurl} />
            </div>
          </NavLink>
        </td>

        <td>
          <NavLink to={`/product/${itemArr[0].id}`}>
            <h3 className='product-title-in-cart'>{itemArr[0].name}</h3><br/>
            {description}
          </NavLink>
        </td>

        <td>
            <p >Rs.{itemArr[0].price}</p>
        </td>

        <td>
          <div className='centerdiv'>
            <button className='product-delete-button' onClick={() => { deleteItem(itemArr[1]) }}>Delete from cart</button>
          </div>
        </td>
      </tr>

    </>
  )
}
