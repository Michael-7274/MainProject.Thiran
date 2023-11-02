import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
        "full": "",
        "thumb": ""
    },
    "seller": ""
  });

  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductObject({
      ...productObject,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productObject);

    // Add code here to save productObject to localStorage or send it to a server

    // Reset the form if needed
    setProductObject({
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
          "full": "",
          "thumb": ""
      },
      "seller": ""
    });
  };

  useEffect(() => {
    checkId();
  }, [id]);

  const checkId = () => {
    if(id !== "addProduct") {
      const products = JSON.parse(localStorage.getItem('products'));
      const currentProduct = products.find((product) => product.id === id);
      setProductObject(currentProduct);
    }
  };

  let price = Number(productObject.price.replace(/[^0-9]/g, ''));

  return (
    <div className="form-container">
      <h1>{id === "addProduct" ? "Add product" : "Update product"}</h1>
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
            required
          />
        </div>

        <div className="newdiv">
          <label htmlFor="category">Product Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={productObject.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="newdiv">
          <label htmlFor="description">Product Description:</label>
          <textarea
            id="description"
            name="description"
            value={productObject.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="newdiv">
          <label htmlFor="warranty">Product Warranty:</label>
          <input
            type="text"
            id="warranty"
            name="warranty"
            value={productObject.warranty}
            onChange={handleChange}
            required
          />
        </div>

        <div className="newdiv">
          <label htmlFor="return">Return time period:</label>
          <input
            type="text"
            id="return"
            name="return"
            value={productObject.return}
            onChange={handleChange}
            required
          />
        </div>

        <div className="newdiv">
          <label htmlFor="image-url">Full Size Image URL:</label>
          <input
            type="text"
            id="image-url"
            name="imageurls.full"
            value={productObject.imageurls.full}
            onChange={handleChange}
            required
          />
        </div>

        <div className="newdiv">
          <label htmlFor="thumbnail-url">Thumbnail URL:</label>
          <input
            type="text"
            id="thumbnail-url"
            name="imageurls.thumb"
            value={productObject.imageurls.thumb}
            onChange={handleChange}
            required
          />
        </div>

        <div className="newdiv">
          <label htmlFor="price">Product price:</label>
          <input
            type="number"
            id="price"
            min={0}
            max={999999999999}
            name="price"
            value={price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="newdiv">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
