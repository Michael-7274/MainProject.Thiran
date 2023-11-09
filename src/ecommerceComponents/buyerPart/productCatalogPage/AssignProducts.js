import React, { useEffect, useState } from 'react'
import ProductPagination from '../../generalComponents/pagination/ProductPagination';
import ProductShow from './ProductShow';
import './catalog.css'
import NavBar from '../../generalComponents/navBar/NavBar';

//modifying data in local storage is reflected on screen only after refresh
export default function AssignProducts() {

  const [productsList, setProductsList] = useState([]);
  const [itemCount, setItemCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');

  //invoke getProductList() and getFilter and getPageNo
  useEffect(() => {
    getProductList();
    getFilter();
    getPageNo()
  }, []);

  //set the no of items based on the productlist length (initially)
  useEffect(() => {
    setItemCount(productsList.length);
  }, [productsList]);//why doesn't this work when directly given as useState(productList.length);-because useState(); 
  //only intializes once but useeffect is executed every time the page is visited

  //when filter changes invoke assignNoOfItems
  useEffect(() => {
    assignNoOfItems();
  }, [filter]);

  //function to get the products from local storage
  //if unavailable then the product array is set in local storage using json data
  const getProductList = async () => {
    const listOfProducts = JSON.parse(localStorage.getItem('products'));
    if ((listOfProducts !== "undefined") && listOfProducts) {
      //"undefined"(string)-returned by localStorage.getItem('products')
      //sometimes it returned null instead of 'undefined'
      const data = JSON.parse(localStorage.getItem('products'));//JSON.parse() converts a JSON string into a JS object
      setProductsList(data);
    }
    else {
      try {
        const response = await fetch('products.json');
        const data = await response.json();
        console.log(data);
        setProductsList(data ? data : []);
        localStorage.setItem('products', JSON.stringify(data));
      }
      catch (err) {
        console.error(err);
      }
    }
  }

  //function to get filter word and pg no from localstorage, if unavailable set new value in local storage
  const getFilter= () => {
    let filterWord = localStorage.getItem('filter');
    if (filterWord && (filterWord !== "undefined")) {
      filterWord = JSON.parse(filterWord);
      setFilter(filterWord);
    }
    else {
      localStorage.setItem("filter", JSON.stringify(''));
      setFilter('');
    }
  }

  //function to get pg no from local storage, if unavailable set new initial value inlocal storage
  const getPageNo=()=>{
    let pgNo = localStorage.getItem('pgNo');
    if (pgNo && (pgNo !== "undefined")) {
      pgNo = Number(JSON.parse(pgNo));
      console.log(pgNo);
      setCurrentPage(pgNo);
    }
    else {
      localStorage.setItem("pgNo", JSON.stringify(1));
      setCurrentPage(1);
    }
  }

  //function to filter the products
  const filterProducts = () => {
    //causes rerender error if setCurrentPage() is used inside filterProducts()
    let products = productsList;
    if (filter !== '') {
      products = products.filter((product) => (product.name).toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    };

    if (products.length === 0) {
      return (<h1>Product Unavailable</h1>);
    }

    //return all the products if there's no filter word
    return products.slice((currentPage - 1) * 10, currentPage * 10).map((productItem) => {
      return <ProductShow key={productItem.id} productItem={productItem} />;
    });
  }

  //function to set itemCount based on filter keyword  
  const assignNoOfItems = () => {
    setItemCount(productsList.filter((products) =>
      (products.name).toLowerCase().indexOf(filter.toLowerCase()) !== -1).length);
  }

  let showProduct = filterProducts();
  return (
    <>
      <NavBar />
      <div className='card-container'>
        {showProduct}
      </div>
      <ProductPagination itemCount={itemCount} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  )
}