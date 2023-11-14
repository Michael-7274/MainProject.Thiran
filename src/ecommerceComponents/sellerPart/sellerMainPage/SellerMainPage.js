import React, { useEffect, useState } from 'react'
import './sellerMain.css'
import { NavLink, useNavigate } from 'react-router-dom';
import ProductPagination from '../../generalComponents/pagination/ProductPagination';
import DeleteModal from '../../generalComponents/confirmationModal/deleteModal/DeleteModal';

export default function SellerMainPage({ logout }) {
  
  //state to store the list of products obtaained from local storage
  //Don't try to save only seller products to it as this makes the product delete complicated
  const [productsList, setProductsList] = useState([]);

  let pageNo = localStorage.getItem('pgNo');
  //state to store current page of the seller site
  const [currentPage, setCurrentPage] = useState(pageNo && pageNo !== "undefined"?JSON.parse(pageNo):1);

  //these states below are made for the use of Delete modal
  //productToBeDeleted- stores an object which contains the product to be deleted
  const [productToBeDeleted, setProductToBeDeleted] = useState();
  //deleteIsVisible- to control appearance the Delete Modal
  const [deleteIsVisible, setDeleteModalIsVisible] = useState();

  //useNavigate to navigate to other pages
  const navigate = useNavigate();
  //get the Id of the seller from local storage
  const sellerID = JSON.parse((localStorage.getItem('authentication'))).id;

  //useEffect to automatically invoke getProductList() and getPageNo()
  useEffect(() => {
    getProductList();
  }, []);

  //function to get the product array from local storage/JSON and store it in state
  const getProductList = async () => {
    //return in async is different from normal function return ,here it returns a promise
    const listOfProducts =localStorage.getItem('products');
    if ((listOfProducts !== "undefined") && listOfProducts) {
      const data = JSON.parse(listOfProducts);//JSON.parse() converts a JSON string into a JS object
      setProductsList(data);
    }
    else {
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

  //checks if there are products in the page after delete
  //if no then switches page
  const changePageOnDelete = () => {
    //calling getSellerProducts().length here instead of using JSON.parse to calculate it doesn't give expected result
    //don't call using useEffect(()=>{changePageOnDelete();},[productList]) because when the page is loaded if
    //the no.of.seller.products%10 is equal to 0, then the last page is automatically selected
    let sellerProductLength = JSON
      .parse(localStorage.getItem('products')).filter((product) => product.seller === sellerID).length;
    if (sellerProductLength !== 0 && sellerProductLength % 10 === 0) {
      setCurrentPage(sellerProductLength / 10);
      localStorage.setItem("pgNo", JSON.stringify(sellerProductLength / 10));
    }
  }

  //function executed when delete is confirmed in Delete Modal
  const onDeleteConfirm = () => {
    const tempArr = [...productsList];
    const indexOfObjectToBeDeleted = tempArr.findIndex((product) => product.id === productToBeDeleted.id)
    tempArr.splice(indexOfObjectToBeDeleted, 1);
    setProductsList(tempArr);
    localStorage.setItem('products', JSON.stringify(tempArr));
    setDeleteModalIsVisible(false);
    changePageOnDelete();
  }

  //function executed when delete is canceled in Delete Modal
  const onDeleteCancel = () => {
    setDeleteModalIsVisible(false);
  }

  //function to invoke the Delete Modal
  const deleteSellerProduct = (product) => {
    setDeleteModalIsVisible(true);
    setProductToBeDeleted(product);
  }

  //function to call logout function and navigate to login page
  const logoutOfSite = () => {
    localStorage.setItem("pgNo", JSON.stringify(1));        
    logout();
    navigate('/');    
  }

  //store the generated table rows array in productRows
  const productRows = generateProductRows();

  return (
    <>
      <div className='full-seller-main-page'>
        <div className='seller-table'>

          <div id='seller-headline-container'>
            <div className='centerdiv'>
              <div id='seller-title'>SellerMainPage</div>
            </div>
            <button id='seller-logout' onClick={logoutOfSite}>Logout</button>
          </div>
          {deleteIsVisible && <DeleteModal
            message={"Do you really want to remove " + productToBeDeleted.name + " from your store?"}
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
      </div>

    </>
  )
}
