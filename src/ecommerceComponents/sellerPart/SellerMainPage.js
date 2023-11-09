import React, { useEffect, useState } from 'react'
import './seller.css'
import { NavLink, useNavigate } from 'react-router-dom';
import ProductPagination from '../generalComponents/pagination/ProductPagination';
import DeleteModal from '../generalComponents/confirmationModal/deleteModal/DeleteModal';

export default function SellerMainPage({ logout }) {

  const [productsList, setProductsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [productToBeDeleted, setProductToBeDeleted] = useState();
  const [deleteIsVisible, setDeleteModalIsVisible] = useState();

  const navigate = useNavigate();
  const sellerID = JSON.parse((localStorage.getItem('authentication'))).id;

  useEffect(() => {
    getProductList();
    getPageNo();
  }, []);

  //get the product array from the user
  const getProductList = async () => {//return in async is different from normal function return ,here it returns a promise
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

  const getPageNo = () => {
    let pageNo = localStorage.getItem('pgNo');
    if (pageNo && pageNo !== "undefined") {
      pageNo = JSON.parse(pageNo);
      setCurrentPage(Number(pageNo));
    }
    else {
      localStorage.setItem("pgNo", JSON.stringify(1));
    }
  }

  //filter the particular seller products from the list of products
  const getSellerProducts = () => {
    return productsList.filter((product) => product.seller === sellerID);
  }

  const sellerProducts = getSellerProducts();

  //map the seller products to produce product table
  const generateProductRows = () => {
    return sellerProducts.slice((currentPage - 1) * 10, (currentPage * 10)).map((product, i) => {
      return (
        <tr key={product.id}>
          <td>{i + 1 + ((currentPage - 1) * 10)}</td>
          <td>{product.name}</td>
          <td>Rs.{product.price}</td>
          <td>
            <NavLink to={`/productcreateorupdate/${product.id}`}>
              <button className='product-update-button'>Update</button>
            </NavLink>
          </td>
          <td>
            <button className='product-delete-button' onClick={() => { deleteSellerProduct(product) }}>Delete</button>
          </td>
        </tr>
      );
    });
  }

  const changePageOnDelete = () => {
    let sellerProductLength = JSON
      .parse(localStorage.getItem('products')).filter((product) => product.seller === sellerID).length;
    if (sellerProductLength !== 0 && sellerProductLength % 10 === 0) {
      setCurrentPage(sellerProductLength / 10);
      localStorage.setItem("pgNo", JSON.stringify(sellerProductLength / 10));
    }
  }

  //delete the seller product from local storage and update the state productsList
  const deleteSellerProduct = (product) => {
    setDeleteModalIsVisible(true);
    setProductToBeDeleted(product);
  }

  const onDeleteConfirm = () => {
    const tempArr = [...productsList];
    const indexOfObjectToBeDeleted = tempArr.findIndex((product) => product.id === productToBeDeleted.id)
    tempArr.splice(indexOfObjectToBeDeleted, 1);
    setProductsList(tempArr);
    localStorage.setItem('products', JSON.stringify(tempArr));
    setDeleteModalIsVisible(false);
    changePageOnDelete();
  }

  const onDeleteCancel = () => {
    setDeleteModalIsVisible(false);
  }

  //call logout function and navigate to login page
  const logoutOfSite = () => {
    logout();
    localStorage.setItem("pgNo", JSON.stringify(1));
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
        {deleteIsVisible && <DeleteModal message={"Do you really want to remove " + productToBeDeleted.name + " from your store?"}
          onConfirm={onDeleteConfirm} onCancel={onDeleteCancel} />}

        <br /><br /><br /><br />

        <div id='product-seller-body'>
          <div id='add-button-container'>
            <NavLink to={`/productcreateorupdate/${'addProduct'}`}>
              <button id='seller-add-product-button'>Add product +</button>
            </NavLink>
          </div><br />

          <table className="product-table">
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

      <div className='pagination'>
        <ProductPagination itemCount={sellerProducts.length} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>


    </>
  )
}
