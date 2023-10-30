import React, { useEffect, useState } from 'react'
import ProductPagination from './ProductPagination';
import ProductShow from './ProductShow';
import { NavLink } from 'react-router-dom';

export default function ProductSet() {
  
  // const [productsList, setProductsList] = useState(() => {
  //   const getProductList = JSON.parse(localStorage.getItem('products'));//JSON.parse() converts a JSON string into a JS object
  //   return getProductList?getProductList:[];//modifying data in local storage is reflected on screen only after refresh
  // });
  const getProductList=()=>{
    const listOfProducts=JSON.parse(localStorage.getItem('products'));//JSON.parse() converts a JSON string into a JS object
    return listOfProducts?listOfProducts:[];//modifying data in local storage is reflected on screen only after refresh
  }
  const productsList=getProductList();
  const [itemCount, setItemCount] = useState(productsList.length);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter,setFilter]=useState('');
  const [filterKeyword,setFilterKeyword]=useState();
  useEffect(() => {
    setItemCount(productsList.filter((products)=>(products.name).toLowerCase().indexOf(filter.toLowerCase())!==-1).length);
    setCurrentPage(1);
  }, [filter])
  

  //let filterKeyword='';

  // const setFilterKeyword=(value)=>{
  //   filterKeyword=value;
  // }
  
  const filterProducts = () => {
    let products=productsList;
    if(filter!==''){
      products=productsList.filter((products)=>(products.name).toLowerCase().indexOf(filter.toLowerCase())!==-1);
     };
    //setItemCount(products.length);
    return products.slice((currentPage-1)*10,currentPage*10).map((productItem,index) => {
      return <ProductShow key={productItem.id} productItem={productItem} />;
   });
  }

  let showProduct=filterProducts();
  return (
    <>
      <div className='search-container'>
        <div className='centerdiv'>
          <input id='search-bar' onChange={(event)=>{setFilterKeyword(event.target.value)}}/>&nbsp;&nbsp;&nbsp;&nbsp;
          <button id='search-button' onClick={()=>setFilter(filterKeyword)}>Search</button>
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
