import React from 'react'
import './seller.css'
import { useNavigate } from 'react-router-dom';
export default function SellerMainPage({logout}) {
  const navigate=useNavigate();
  const logoutOfSite=()=>{
    logout();
    navigate('/');
  }
  return (
    <>
      <div id='seller-headline-container'>
        <div className='centerdiv'>
          <div id='seller-title'>SellerMainPage</div>
        </div>
        <button id='seller-logout'onClick={logoutOfSite}>Logout</button>
      </div>
      <div id='product-container'>
        <button id='seller-add-product'>Add product +</button>
      </div>
      <div className='centerdiv'>
        <table id='seller-product-table'>
          <thead>
            <tr><td>ID</td><td>Product</td><td>Price</td><td></td><td></td></tr>
          </thead>
          <tbody>
          <tr><td>1</td><td>ariel</td><td>Rs.200</td><td>Update</td><td>Delete</td></tr>
          </tbody>
        </table>
      </div>
    </>

  )
}
