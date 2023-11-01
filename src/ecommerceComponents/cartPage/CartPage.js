import React, { useEffect, useState } from 'react'
import ShowCartItems from './ShowCartItems';

export default function CartPage() {

  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    getCartItems();
  }, []);

  useEffect(() => {
    window.addEventListener('focus', refreshPage);//add a eventListener that calls refreshPage() when we get to the tab
    return () => {
      window.removeEventListener('focus', refreshPage);//removes the eventlistener when we are in the tab to avoid memory leaks
    }
  }, []);

  const refreshPage = () => {//refreshes the page whenever we return to it from another tab
    window.location.reload();
  }

  const getCartItems = () => {
    const items = JSON.parse(localStorage.getItem('cart'));
    setCartItems(items ? items : []);
  }
  
  const deleteItem = (i) => {
    let tempArr = [...cartItems];
    if(window.confirm('DO you want to delete '+tempArr[i].name+' from cart?')){
      tempArr.splice(i, 1);
      localStorage.setItem('cart', JSON.stringify(tempArr));
      setCartItems(tempArr);
    }
  }
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
