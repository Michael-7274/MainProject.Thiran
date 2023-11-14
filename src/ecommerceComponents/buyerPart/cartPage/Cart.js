import React, { useEffect, useState } from 'react'
import ShowCartItems from './ShowCartItems';
import './cart.css';
import NavBar from '../../generalComponents/navBar/NavBar';
import DeleteModal from '../../generalComponents/confirmationModal/deleteModal/DeleteModal';

export default function Cart({logout}) {

  //state to store cart items
  const [cartItems, setCartItems] = useState([]);

  //states for delete modal
  const [showModal, setShowModal] = useState(false);
  const [indexOfItemToDelete, setindexOfItemToDelete] = useState(null);

  let totalAmount = 0;
  const cartId = "cart" + JSON.parse(localStorage.getItem('authentication')).id;
  const availableProducts = JSON.parse(localStorage.getItem('products'));

  //useEffect to invoke getCartitems() and set Event Listener 'focus' to refresh the page on visit
  useEffect(() => {
    getCartItems();
    window.addEventListener('focus', refreshPage);//add a eventListener that calls refreshPage() when we get to the tab
    return () => {
      window.removeEventListener('focus', refreshPage);//removes the eventlistener when we are in tab to avoid memory leaks
    }
  }, []);

  //function to refresh the page
  const refreshPage = () => {
    //the refresh is used to sync the cart with local storage
    window.location.reload();
  }

  //function to get the cart items from local storage on render
  const getCartItems = () => {
    let items = localStorage.getItem(cartId);

    if (items && items !== "undefined") {
      items = JSON.parse(items);
      let availableCartItems=[];
      for(let i=0;i<items.length;i++)
      {
        if(availableProducts.some(product=>product.id===items[i].id)){
          let product=availableProducts.find(product=>product.id===items[i].id);
          availableCartItems.push(product);
        }
      }
      // const availableCartItems = items
      //   .filter(availableProduct => {
      //     return availableProducts.some(product => product.id === availableProduct.id) 
      //   });

      localStorage.setItem(cartId, JSON.stringify(availableCartItems));
      setCartItems(availableCartItems);
    }
    else {
      setCartItems([]);
    }
  }

  //function to invoke delete Modal
  const deleteItem = (i) => {
    setindexOfItemToDelete(i);
    setShowModal(true);
  }

  //function invoked if the delete is confirmed(in Delete Modal)
  const confirmDelete = () => {
    let tempArr = [...cartItems];
    tempArr.splice(indexOfItemToDelete, 1);
    localStorage.setItem(cartId, JSON.stringify(tempArr));
    setCartItems(tempArr);
    setShowModal(false);
  }

  // function invoked if the delete is cancelled(in Delete Modal)
  const cancelDelete = () => {

    setShowModal(false);

  }

  //function to map the cartitems into child components, store it as an array and calculate total price of cart items
  const showCartItems = () => {
    return cartItems.map((item, i) => {
      totalAmount = totalAmount + Number(item.price);
      return <ShowCartItems key={item.id} cartItemAndIndex={[item, i]} deleteItem={deleteItem} />
    });
  }

  //the array of child components is stored into itemCards
  const itemCards = showCartItems();

  //page to set when items are not found
  if (itemCards.length === 0) {
    return (
      <>
        <NavBar logout={logout}/>
        <h1>No items in your Cart</h1>
      </>
    );
  }

  return (
    <>
      <div className="cart-page">
        {
          showModal && <DeleteModal message={`Do you really want to delete ${cartItems[indexOfItemToDelete].name} from cart?`}
            onConfirm={confirmDelete} onCancel={cancelDelete} />
        }
        <NavBar logout={logout}/>
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
      </div>
    </>
  )
}
