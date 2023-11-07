import React, { useEffect, useState } from 'react'
import ProductPagination from './ProductPagination';
import ProductShow from './ProductShow';
import { NavLink, json, useNavigate } from 'react-router-dom';

//modifying data in local storage is reflected on screen only after refresh
export default function AssignProducts({ logout }) {

  const [productsList, setProductsList] = useState([]); 
  const [itemCount, setItemCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  let filterKeyword=''
  const navigate=useNavigate();

  //get the products from local storage
  useEffect(() => {
    getProductList();
    getFilterandPageNo();
  }, []);

  //set the no of items based on the productlist length
  useEffect(() => {
    setItemCount(productsList.length);
  }, [productsList]);//why doesn't this work when directly given as useState(productList.length);-because useState(); 
                     //only intializes once
  
  //when filter changes based on filter keyword set itemCount and setCurrent page to 1
  useEffect(() => {
    assignNoOfItems();
  }, [filter]);

  //get the products from local storage, if unavailable set it on local storage from JSON document
  const getProductList =async() => {
    const listOfProducts = JSON.parse(localStorage.getItem('products'));
    if ((listOfProducts!=="undefined") && listOfProducts) 
    {                                  //"undefined"(string)-returned by localStorage.getItem('products')
                                       //sometimes it returned null instead of 'undefined'
      const data=JSON.parse(localStorage.getItem('products'));//JSON.parse() converts a JSON string into a JS object
      setProductsList(data);
    }
    else 
    {
      try{
        const response = await fetch('products.json');
        const data = await response.json();
        console.log(data);
        setProductsList(data ? data : []);
        localStorage.setItem('products',JSON.stringify(data));
      }
      catch(err)
      {
        console.error(err);
      }
    }
  }

  const getFilterandPageNo=()=>{
    let filterWord=localStorage.getItem('filter');
    if(filterWord&&(filterWord!=="undefined")){
      filterWord=JSON.parse(filterWord);
      setFilter(filterWord);
    }
    else{
      localStorage.setItem("filter",JSON.stringify(''));
      setFilter('');
    }

    let pgNo=localStorage.getItem('pgNo');
    if(pgNo&&(pgNo!=="undefined")){
      pgNo=Number(JSON.parse(pgNo));
      console.log(pgNo);
      setCurrentPage(pgNo);
    }
    else{
      localStorage.setItem("pgNo",JSON.stringify(1));
      setCurrentPage(1);
    }

  }

  //if there's a filter keyword filter the products otherwise return all products
  const filterProducts = () => {
    let products = productsList;
    if (filter !== '') {
      products = productsList.filter((products) => (products.name).toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    };
    return products.slice((currentPage - 1) * 10, currentPage * 10).map((productItem) => {
      return <ProductShow key={productItem.id} productItem={productItem} />;
    });
  }

  //get the item no based on filter keyword
  const assignNoOfItems=()=>{
    setItemCount(productsList.filter((products) => 
    (products.name).toLowerCase().indexOf(filter.toLowerCase()) !== -1).length);
  }

  //set the temporary filter keyword
  const setFilterKeyword=(val)=>{
    filterKeyword=val;
  }

  const setFilterKeywordToFilter=()=>{
    setFilter(filterKeyword);
    localStorage.setItem('filter',JSON.stringify(filterKeyword));
    setCurrentPage(1);
    localStorage.setItem("pgNo",JSON.stringify(1));
  }

  //call logout function and go to login page
  const logoutOfSite=()=>{
    logout();
    localStorage.setItem("pgNo",JSON.stringify(1));
    localStorage.setItem("filter",JSON.stringify(''));
    navigate('/');
  }



  let showProduct = filterProducts();
  return (
    <>
      <div className='search-container'>
        <div className='centerdiv'>
          <button id='catalog-logout-button' onClick={logoutOfSite}>Logout</button>{/* //the logout is a function */}
          <input id='search-bar' onChange={(event) => { setFilterKeyword(event.target.value) }} />&nbsp;&nbsp;&nbsp;&nbsp;
          <button id='search-button' onClick={setFilterKeywordToFilter}>Search</button>{/* the temporary filter keyword 
                                                                                              is set as state*/}
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
