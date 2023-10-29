import React, { useEffect, useState } from 'react'
import ProductPagination from './ProductPagination';
import ProductShow from './ProductShow';

export default function ProductSet() {
  const [productsList, setProductsList] = useState(() => {
    const getProductList = JSON.parse(localStorage.getItem('products'));//JSON.parse() converts a JSON string into a JS object
    return getProductList?getProductList:[];//modifying data in local storage is reflected on screen only after refresh
  });
  const [itemCount, setItemCount] = useState(productsList.length);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter,setFilter]=useState('');
  const [filterKeyword,setFilterKeyword]=useState();
  useEffect(() => {
    setItemCount(productsList.filter((products)=>(products.name).toLowerCase().indexOf(filter.toLowerCase())!==-1).length);
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
      return <ProductShow key={productItem.id} productItem={productItem} />
   });
  }

  let showProduct=filterProducts();
  return (
    <>
      <div id='search-container'>
        <div className='centerdiv'>
          <input id='search-bar' onChange={(event)=>{setFilterKeyword(event.target.value)}}/>&nbsp;&nbsp;&nbsp;&nbsp;
          <button id='search-button' onClick={()=>setFilter(filterKeyword)}>Search</button>
        </div>
      </div>
      <div id='product-container'>
        {showProduct}
      </div>
      <ProductPagination itemCount={itemCount} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>

  )
}
