import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../../css/addOrUpdate.css';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AddOrUpdateProducts() {

  //states to store the value of the product object during creation and modification
  const [productObject, setProductObject] = useState({
    "name": "",
    "image": "",
    "category": "",
    "description": "",
    "price": "",
    "warranty": "",
    "return": "",
    "id": "",
    "slug": "",
    "imageurl": "",
    "seller": ""
  });

  //states to store the error in the product input during creation and modification of products
  const [errorObject, setErrorObject] = useState({
    "name": "",
    "image": "",
    "category": "",
    "description": "",
    "price": "",
    "warranty": "",
    "return": "",
    "id": "",
    "slug": "",
    "imageurl": "",
    "seller": ""
  });
  //ID of the product from link
  const { id } = useParams();
  let products = JSON.parse(localStorage.getItem('products'));

  //usenavigate function to navigate the pages
  const navigate = useNavigate();

  //useEffect to initially execute checkId() to check the Id from link
  useEffect(() => {
    checkId();
  }, []);

  //function to check whether to add or update product 
  //function gets the product properties from local storage incase of update product
  const checkId = () => {
    if (id !== "addProduct") {
      const currentProduct = products.find((product) => product.id === id);
      if (currentProduct === undefined) {
        navigate('/seller')
      }
      setProductObject(currentProduct);
    }
  };

  //function to assign the form values to an object on input
  const handleProductChange = (event) => {
    //select name and value attributes from event.target
    const { name, value } = event.target;
    //if string doesn't contain '.' then the entire name is stored in outerAttribute
    const [outerAttribute, innerAttribute] = name.split(".");
    const tempObject = { ...productObject }
    if (name === outerAttribute) {
      tempObject[name] = value;//to access an attribute directly
    }

    else {
      tempObject[outerAttribute] = {
        ...tempObject[outerAttribute],
        [innerAttribute]: value//to access an attribute inside an attribute
      }
    }
    setProductObject(tempObject);
  }

  const handleProductImageUpload = (event) => {//productImageUpload
    let imageFile = event.target.files[0];
    if (imageFile) {
      imageFile = URL.createObjectURL(imageFile);
      const tempObject = { ...productObject }
      tempObject.imageurl = imageFile;
      setProductObject(tempObject);
    }
  }

  //function to validate the form input from user
  const validateProductForm = () => {
    //create temp object inside function
    let isFormValid = true;
    const tempErrorObject = { ...errorObject };
    if (productObject.name === "") {
      tempErrorObject.name = "*Name can't be empty";
      isFormValid = false;
    }
    else if (productObject.name.length > 30) {
      tempErrorObject.name = "*Name can't be higher than 30 characters in length";
      isFormValid = false;
    }
    else {
      tempErrorObject.name = "";
    }

    if (productObject.category === "") {
      tempErrorObject.category = "*Category can't be empty";
      isFormValid = false;
    }
    else {
      tempErrorObject.category = "";
    }

    if (productObject.description === "") {
      tempErrorObject.description = "*Description can't be empty";
      isFormValid = false;
    }
    else {
      tempErrorObject.description = "";
    }

    if (productObject.warranty === "") {
      tempErrorObject.warranty = "*warranty can't be empty";
      isFormValid = false;
    }
    else {
      tempErrorObject.warranty = "";
    }
    if (productObject.return === "") {
      tempErrorObject.return = "*Please specify return time-period";
      isFormValid = false;
    }
    else {
      tempErrorObject.return = "";
    }
    if ((productObject.imageurl.indexOf(".") === -1) && (productObject.imageurl.indexOf("/") === -1)) {
      tempErrorObject.imageurl = "*Please give proper url";
      isFormValid = false;
    }
    else {
      tempErrorObject.imageurl = "";
    }
    if (Number(productObject.price) < 1 || productObject.price === "") {
      tempErrorObject.price = "*Invalid price";
      isFormValid = false;
    }
    else {
      tempErrorObject.price = "";
    }
    setErrorObject(tempErrorObject);
    return isFormValid;
  }

  //function invoked to take user to seller page after successful submission of details
  const goToSellerPage = () => {
    navigate('/seller');
  }

  //Function to evaluate product details and update local storage on the click of the submit button
  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (id === "addProduct") {
      let sellerID = JSON.parse(localStorage.getItem('authentication')).id;
      const d = new Date();
      const objectToBeAdded = { ...productObject };
      objectToBeAdded.seller = sellerID;
      objectToBeAdded.id = "PID" + d.getTime();
      products = [...products, objectToBeAdded];
      if (validateProductForm()) {
        localStorage.setItem('products', JSON.stringify(products));
        toast.success("Product added");
        setTimeout(goToSellerPage,2000);
      }
    }
    else {
      let replaceIndex = products.findIndex((product) => product.id === productObject.id);
      products.splice(replaceIndex, 1, productObject);
      if (validateProductForm()) {
        localStorage.setItem('products', JSON.stringify(products));
        toast.success("Product modified");
        setTimeout(goToSellerPage,2000)
      }
    }
  }


  return (
    <>
      <div className='add-or-update-form-body'>
      <ToastContainer position='top-center' transition={Zoom} autoClose={2000} closeOnClick={false}/>
        
        <div className="form-container">
          <h1 id="form-title">{id === "addProduct" ? "Add product" : "Update product"}</h1>

          <form id="acform" onSubmit={handleProductSubmit}>

            <div className="newdiv">
              <label htmlFor="name">Product Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={productObject.name}
                onChange={handleProductChange}
              />
            </div>

            <div className='error-message'>{errorObject.name}</div>

            <div className="newdiv">
              <label htmlFor="category">Product Category:</label>
              <input
                type="text"
                id="category"
                name="category"
                value={productObject.category}
                onChange={handleProductChange}
              />
            </div>

            <div className='error-message'>{errorObject.category}</div>

            <div className="newdiv">
              <label htmlFor="description">Product Description:</label>
              <textarea
                id="description"
                name="description"
                value={productObject.description}
                onChange={handleProductChange}
              ></textarea>
            </div>

            <div className='error-message'>{errorObject.description}</div>

            <div className="newdiv">
              <label htmlFor="warranty">Product Warranty:</label>
              <input
                type="text"
                id="warranty"
                name="warranty"
                value={productObject.warranty}
                onChange={handleProductChange}

              />
            </div>

            <div className='error-message'>{errorObject.warranty}</div>

            <div className="newdiv">
              <label htmlFor="return">Return time period:</label>
              <input
                type="text"
                id="return"
                name="return"
                value={productObject.return}
                onChange={handleProductChange}
              />
            </div>

            <div className='error-message'>{errorObject.return}</div>

            <div className="newdiv">
              <label htmlFor="return">To upload image(optional):</label>
              <input
                type="file"
                id="image-upload"
                name='imageUpload'
                accept="image/*"
                onChange={handleProductImageUpload} />
            </div>

            <div className="newdiv">
              <label htmlFor="small-image-url">Image URL:</label>
              <input
                type="text"
                id="small-image-url"
                name="imageurl"
                value={productObject.imageurl}
                onChange={handleProductChange}
              />
            </div>

            <div className='error-message'>{errorObject.imageurl}</div>

            <div className="newdiv">
              <label htmlFor="price">Product price:</label>
              <input
                type="number"
                id="price"
                name="price"
                value={id !== "addProduct" ? Number(productObject.price) : null}
                onChange={handleProductChange}
              />
            </div>

            <div className='error-message'>{errorObject.price}</div>

            <div className="newdiv">
              <button type="submit" >{id === "addProduct" ? "Add" : "Modify"}</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
