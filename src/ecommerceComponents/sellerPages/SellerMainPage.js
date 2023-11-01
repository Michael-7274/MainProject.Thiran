import React, { useEffect, useState } from 'react'
import './seller.css'
import { useNavigate } from 'react-router-dom';
import SellerProductTable from './SellerProductTable';

export default function SellerMainPage({ logout }) {
  //using state get productsList
  const navigate = useNavigate();
  const sellerID = JSON.parse((localStorage.getItem('authentication'))).id;
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    getProductList();
  }, [])  

  let list;

  const getProductList = async () => {//return in async is different from normal function return
    const listOfProducts = JSON.parse(localStorage.getItem('products'));
    if ((listOfProducts !== "undefined") && listOfProducts) {
      console.log("if executed");
      const data = JSON.parse(localStorage.getItem('products'));//JSON.parse() converts a JSON string into a JS object
      setProductsList(data);
    }
    else {
      console.log("else executed");
      try {
        const response = await fetch('products.json');
        const data = await response.json();
        localStorage.setItem('products', JSON.stringify(data));
        setProductsList(data);
      }
      catch (err) {
        console.error(err);
      }
    }
  }

  const getSellerProducts = () => {
    return productsList.filter((product)=>product.seller===sellerID);
  }

  const logoutOfSite = () => {
    logout();
    navigate('/');
  }

  const deleteSellerProduct=(productToBeDeleted)=>{
    const deleteConfirmation=window.confirm("Do you really want to remove "+productToBeDeleted.name+" from your store?");
    if(deleteConfirmation){
      const tempArr=[...productsList];
      const indexOfObjectToBeDeleted=tempArr.findIndex((product)=>product.id===productToBeDeleted.id)
      tempArr.splice(indexOfObjectToBeDeleted,1);
      setProductsList(tempArr);
      localStorage.setItem('products',JSON.stringify(tempArr));
    }
  }

  const sellerProducts = getSellerProducts();


  return (
    <>
      <div id='seller-headline-container'>
        <div className='centerdiv'>
          <div id='seller-title'>SellerMainPage</div>
        </div>
        <button id='seller-logout' onClick={logoutOfSite}>Logout</button>
      </div>
      <div id='product-container'>
        <button id='seller-add-product-button'>Add product +</button>
      </div>
      <div className='centerdiv'>
        <h2>Seller Products</h2>
      </div>
      <div className='centerdiv'>
        <SellerProductTable sellerProducts={sellerProducts} deleteProduct={deleteSellerProduct}/>
      </div>
    </>
  )
}
