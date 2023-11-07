import React, { useEffect, useState } from 'react'
import ShowCartItems from './ShowCartItems';
import './cart.css';
export default function AssignCartProducts() {

  const [cartItems, setCartItems] = useState([]);

  //gets the cart items from local storage on page load
  useEffect(() => {
    getCartItems();
  }, []);

  // refreshes the page whenever we return to it from another tab-to make the cart items are present in the cart page
  useEffect(() => {
    window.addEventListener('focus', refreshPage);//add a eventListener that calls refreshPage() when we get to the tab
    return () => {
      window.removeEventListener('focus', refreshPage);//removes the eventlistener when we are in the tab to avoid memory leaks
    }
  }, []);

  //refreshes the page
  const refreshPage = () => {
    window.location.reload();
  }

  //to get the cart items from local storage on render
  const getCartItems = () => {
    const items = JSON.parse(localStorage.getItem('cart'));
    setCartItems(items && items!=="undefined"? items : []);
  }
  
  // to delete acart item using index of the item in the array
  const deleteItem = (i) => {
    let tempArr = [...cartItems];
    if(window.confirm('DO you want to delete '+tempArr[i].name+' from cart?')){
      tempArr.splice(i, 1);
      localStorage.setItem('cart', JSON.stringify(tempArr));
      setCartItems(tempArr);
    }
  }

  //map the cart items array by using the child components 
  const showCartItems=()=>{
    return cartItems.map((item, i) => { 
      return <ShowCartItems key={item.id} cartItemAndIndex={[item, i]} index={i} deleteItem={deleteItem} /> 
    });
  }

  const itemCards = showCartItems();
  return (
    <>
      <h1>CART PAGE</h1>
      <div className='card-container'>
        {itemCards}
      </div>
    </>
  )
}
