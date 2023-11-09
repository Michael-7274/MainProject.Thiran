import React from 'react'
import './cart.css';
//component to show individual cart items
export default function ShowCartItems({ cartItemAndIndex, deleteItem }) {
  const itemArr = cartItemAndIndex;
  //checks if there are new lines in the description (i.e)'/n' and returns them as text inside <p></p>
  const getProperDescription = () => {
    let descriptionLines = itemArr[0].description.split('\n')
    return descriptionLines.map((description,i) => <p key={description.length+i}>{description}</p>);
  }
  const description = getProperDescription();

  return (
    <>
      <tr>
        <td>
          <div className='centerdiv'>
            {/*Without require('./'+) the image won't apppear here*/}
            <img className='cart-item-image' alt='product' src={itemArr[0].imageurls.small} />
          </div>
        </td>

        <td>
          <h3>{itemArr[0].name}</h3><br/>
          {description}
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
