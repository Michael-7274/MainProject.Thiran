import React, { useEffect, useState } from 'react'
import './seller.css'
import { NavLink, useNavigate } from 'react-router-dom';
import ProductPagination from '../productCatalogPage/ProductPagination';

export default function SellerMainPage({ logout }) {
  //using state get productsList
  const navigate = useNavigate();
  const sellerID = JSON.parse((localStorage.getItem('authentication'))).id;
  const [productsList, setProductsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getProductList();
  }, []);
  // useEffect(() => {
  //   let sellerProductLength = productsList.filter((product) => product.seller === sellerID).length;
  //   if (sellerProductLength !== 0 && sellerProductLength % 10 == 0) {
  //     setCurrentPage(sellerProductLength / 10)
  //   }
  // }, [productsList])

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage])



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
    return productsList.filter((product) => product.seller === sellerID);
  }

  const sellerProducts = getSellerProducts();

  const generateProductRows = () => {
    return sellerProducts.slice((currentPage - 1) * 10, (currentPage * 10)).map((product, i) => {
      return (
        <tr key={product.id}>
          <td>{i + 1}</td>
          <td>{product.name}</td>
          <td>{product.price}</td>
          <td>
            <NavLink to={`/productcreateorupdate/${product.id}`}>
              <button className='product-update'>Update</button>
            </NavLink>
          </td>
          <td>
            <button className='product-delete' onClick={() => { deleteSellerProduct(product) }}>Delete</button>
          </td>
        </tr>
      );
    });
  }

  const deleteSellerProduct = (productToBeDeleted) => {
    const deleteConfirmation = window.confirm("Do you really want to remove " + productToBeDeleted.name + " from your store?");
    if (deleteConfirmation) {
      const tempArr = [...productsList];
      const indexOfObjectToBeDeleted = tempArr.findIndex((product) => product.id === productToBeDeleted.id)
      tempArr.splice(indexOfObjectToBeDeleted, 1);
      setProductsList(tempArr);
      localStorage.setItem('products', JSON.stringify(tempArr));
      let sellerProductLength = JSON
      .parse(localStorage.getItem('products')).filter((product) => product.seller === sellerID).length;
      if (sellerProductLength !== 0 && sellerProductLength % 10 == 0) {
        setCurrentPage(sellerProductLength / 10)
      }
    }
  }

  const logoutOfSite = () => {
    logout();
    navigate('/');
  }

  const productRows = generateProductRows();

  return (
    <>
      <div className='seller-main-page'>

        <div id='seller-headline-container'>
          <div className='centerdiv'>
            <div id='seller-title'>SellerMainPage</div>
          </div>
          <button id='seller-logout' onClick={logoutOfSite}>Logout</button>
        </div>

        <br /><br /><br /><br />

        <div id='product-seller-body'>
          <div id='add-button-container'>
            <NavLink to={`/productcreateorupdate/${'addProduct'}`}>
              <button id='seller-add-product-button'>Add product +</button>
            </NavLink>
          </div>
          <div className='centerdiv'>
            <div className="product-table-container">
              <table className="fl-table">
                <thead>
                  <tr>
                    <th>S.no</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody >
                  {productRows}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <ProductPagination itemCount={sellerProducts.length} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </>
  )
}
