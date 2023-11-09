import React, { useEffect, useState } from 'react'
import ShowCartItems from './ShowCartItems';
import './cart.css';
import NavBar from '../generalComponents/navBar/NavBar';
import DeleteModal from '../generalComponents/confirmationModal/deleteModal/DeleteModal';
export default function Cart() {

  const [cartItems, setCartItems] = useState([]);

  //states for delete modal
  const[showModal,setShowModal]=useState(false);
  const[indexOfItemToDelete,setindexOfItemToDelete]=useState(null);

  let totalAmount=0;

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
    const items = localStorage.getItem('cart');
    setCartItems(items && items !== "undefined" ? JSON.parse(items) : []);
  }

  // to delete a cart item using index of the item in the array
  const deleteItem = (i) => {
    setindexOfItemToDelete(i);
    setShowModal(true);
  }

  //invoked if the delete is confirmed
  const confirmDelete=()=>{
    let tempArr = [...cartItems];
    tempArr.splice(indexOfItemToDelete, 1);
    localStorage.setItem('cart', JSON.stringify(tempArr));
    setCartItems(tempArr);
    setShowModal(false);
  }

  //invoked if the delete is cancelled
  const cancelDelete=()=>{

    setShowModal(false);

  }
  

  //map the cart items array by using the child components 
  const showCartItems = () => {
      return cartItems.map((item, i) => {
        totalAmount=totalAmount+Number(item.price);
        return <ShowCartItems key={item.id} cartItemAndIndex={[item, i]} deleteItem={deleteItem} />
      });
  }

  const itemCards = showCartItems();

  if(itemCards.length===0)
  {
    return(
      <>
      <NavBar/>
      <h1>No items in your Cart</h1>
      </>
    );
  }

  return (
    <>
    {
    showModal&&<DeleteModal message={`Do you really want to delete ${cartItems[indexOfItemToDelete].name} from cart?`} 
    onConfirm={confirmDelete} onCancel={cancelDelete}/>
    }
      <NavBar />
      <div className='cart-table-container'>
        <table id="cart-table">
          <tbody>
            {itemCards}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>
                <div className='centerdiv'>
              <h3>Total</h3>
              </div>
              </td>
              <td>
                Rs.{totalAmount}
              </td>
              <td>
              </td>
            </tr>
          </tfoot>
        </table>
        </div>
    </>
  )
}
