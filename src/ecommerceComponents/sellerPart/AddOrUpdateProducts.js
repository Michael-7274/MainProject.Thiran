import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './form.css';
export default function AddOrUpdateProducts() {
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
    "imageurls": {
      "small": ""
    },
    "seller": ""
  });
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
    "imageurls": {
      "small": ""
    },
    "seller": ""
  });

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    checkId();
  }, []);

  useEffect(() => {
    console.log(errorObject);
  }, [errorObject])


  //check whether to add or update product, gets the product properties from local storage incase of update product
  const checkId = () => {
    if (id !== "addProduct") {
      const products = JSON.parse(localStorage.getItem('products'));
      const currentProduct = products.find((product) => product.id === id);
      setProductObject(currentProduct);
    }
  };

  //Assign the form values to an object on input
  const handleChange = (event) => {

    const { name, value } = event.target;
    const [outerAttribute, innerAttribute] = name.split(".");//if string doesn't contain '.' then the entire name 
    //is stored in outerAttribute
    const tempObject = { ...productObject }
    if (name === outerAttribute) {
      tempObject[name] = value;//to access an attribute directly
      setProductObject(tempObject);

    }
    else {
      tempObject[outerAttribute] = {
        ...tempObject[outerAttribute],
        [innerAttribute]: value//to access an attribute inside an attribute
      }
      setProductObject(tempObject);
    }
  }


  //To validate the form input from user
  const validateForm = () => {
    let isFormValid = true;
    const tempErrorObject = { ...errorObject };
    if (productObject.name === "") {
      tempErrorObject.name = "*Name can't be empty";
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
    if (!((productObject.imageurls.small.indexOf("http://") === -1) ^ (productObject.imageurls.small.indexOf("https://") === -1))) {
      tempErrorObject.imageurls.small = "*Please give proper url either in http or https";
      isFormValid = false;
    }
    else {
      tempErrorObject.imageurls.small = "";
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

  //Evaluate product details and update local storage on the click of the submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    if (id === "addProduct") {
      let productList = JSON.parse(localStorage.getItem('products'));
      let sellerID = JSON.parse(localStorage.getItem('authentication')).id;
      const d = new Date();
      const objectToBeAdded = { ...productObject };
      objectToBeAdded.seller = sellerID;
      objectToBeAdded.id = "PID" + d.getTime();
      console.log(objectToBeAdded);
      productList = [...productList, objectToBeAdded];
      if (validateForm()) {
        localStorage.setItem('products', JSON.stringify(productList));
        alert("product added");
        navigate('/seller');
      }

    }
    else {
      let products = JSON.parse(localStorage.getItem('products'));
      let replaceIndex = products.findIndex((product) => product.id === productObject.id);
      console.log(productObject);
      products.splice(replaceIndex, 1, productObject);
      console.log(replaceIndex);
      if (validateForm()) {
        localStorage.setItem('products', JSON.stringify(products));
        alert("product modified");
        navigate('/seller');
      }
    }
  }


  return (
    <>
      <div className="form-container">
        <h1 id="form-title">{id === "addProduct" ? "Add product" : "Update product"}</h1>
        <p>*all fields are required</p>

        <form id="acform" onSubmit={handleSubmit}>

          <div className="newdiv">
            <label htmlFor="name">Product Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={productObject.name}
              onChange={handleChange}

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
              onChange={handleChange}

            />
          </div>

          <div className='error-message'>{errorObject.category}</div>

          <div className="newdiv">
            <label htmlFor="description">Product Description:</label>
            <textarea
              id="description"
              name="description"
              value={productObject.description}
              onChange={handleChange}

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
              onChange={handleChange}

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
              onChange={handleChange}

            />
          </div>

          <div className='error-message'>{errorObject.return}</div>

          <div className="newdiv">
            <label htmlFor="small-image-url">Image URL:</label>
            <input
              type="text"
              id="small-image-url"
              name="imageurls.small"
              value={productObject.imageurls.small}
              onChange={handleChange}
            />
          </div>

          <div className='error-message'>{errorObject.imageurls.small}</div>

          <div className="newdiv">
            <label htmlFor="price">Product price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={id !== "addProduct" ? Number(productObject.price) : null}
              onChange={handleChange}
            />
          </div>

          <div className='error-message'>{errorObject.price}</div>

          <div className="newdiv">
            <button type="submit" >{id === "addProduct" ? "Add" : "Modify"}</button>
          </div>
        </form>
      </div>
    </>
  );
}
