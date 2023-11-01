import React from 'react'
import './seller.css'

export default function SellerProductTable({ sellerProducts ,deleteProduct}) {


  const getProductRows = () => {
    return sellerProducts.map((product, i) => {
      return (
        <tr>
          <td>{i+1}</td>
          <td>{product.name}</td>
          <td>{product.price}</td>
          <td>
            <button>Update</button>
            </td>
          <td>
            <button onClick={()=>{deleteProduct(product)}}>Delete</button>
            </td>
        </tr>
      );
    });
  }

  const productRows = getProductRows();

  return (
    <>
      <div className="table-wrapper">
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
          <tbody>
            {productRows}
          </tbody>
        </table>
      </div>

    </>
  )
}
