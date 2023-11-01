import React, { useEffect, useState } from 'react'
import ProductPagination from './ProductPagination';
import ProductShow from './ProductShow';
import { NavLink } from 'react-router-dom';

//modifying data in local storage is reflected on screen only after refresh
export default function ProductSet({ logout }) {

  const [productsList, setProductsList] = useState([]); 
  const [itemCount, setItemCount] = useState(productsList.length);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [filterKeyword, setFilterKeyword] = useState('');

  useEffect(() => {
    getProductList();
  }, [])

  useEffect(() => {
    assignNoOfItems();
    setCurrentPage(1);
  }, [filter, productsList]);

  const getProductList =async() => {
    const listOfProducts = localStorage.getItem('products');
    if (listOfProducts!=="undefined") 
    {                                  //undefined(string)-returned by localStorage.getItem('products')
                                       //'products' is undefined
      // console.log(listOfProducts);  //the listOfProducts are given as a JSON string
      const data=JSON.parse(localStorage.getItem('products'));//JSON.parse() converts a JSON string into a JS object
      setProductsList(data);
    }
    else {
      try{
        const response = await fetch('products.json');
        const data = await response.json();
        setProductsList(data ? data : []);
        localStorage.setItem('products',JSON.stringify(data));
      }
      catch(err){
        console.error(err);
      }
    }
  }

  const filterProducts = () => {
    let products = productsList;
    // console.log(productsList);
    if (filter !== '') {
      products = productsList.filter((products) => (products.name).toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    };
    return products.slice((currentPage - 1) * 10, currentPage * 10).map((productItem) => {
      return <ProductShow key={productItem.id} productItem={productItem} />;
    });
  }

  const assignNoOfItems=()=>{
    setItemCount(productsList.filter((products) => 
    (products.name).toLowerCase().indexOf(filter.toLowerCase()) !== -1).length);
    setCurrentPage(1);
  }

  let showProduct = filterProducts();
  return (
    <>
      <div className='search-container'>
        <div className='centerdiv'>
          <button id='catalog-logout-button' onClick={logout}>Logout</button>{/* //the logout is a function */}
          <input id='search-bar' onChange={(event) => { setFilterKeyword(event.target.value) }} />&nbsp;&nbsp;&nbsp;&nbsp;
          <button id='search-button' onClick={() => setFilter(filterKeyword)}>Search</button>
          <NavLink to={'/cart'}>
            <button id='cart-button'>CART</button>
          </NavLink>
        </div>
      </div>
      <div className='card-container'>
        {showProduct}
      </div>
      <ProductPagination itemCount={itemCount} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  )
}
