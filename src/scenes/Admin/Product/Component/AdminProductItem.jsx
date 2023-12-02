import React from "react";
import AppUrl from "../../../../Api/AppUrl";
import { Link } from "react-router-dom";

function AdminProductItem(props) {
  const { product, handleDelete, handlePublish } = props;
  const piblishView =
    product.attributes.publishedAt == null ? (
      <input
        type="range"
        min="0"
        max="1"
        value="0"
        style={{ width: "30px" }}
        onClick={handlePublish}
        name={product.id}
      />
    ) : (
      <input
        type="range"
        min="0"
        max="1"
        value="1"
        style={{ width: "30px" }}
        onClick={handlePublish}
        name={product.id}
      />
    );
  console.log();
  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.attributes.productName}</td>
      <td>
        <img
          src={
            AppUrl.ImageUrl + product.attributes.image.data[0].attributes.url
          }
          alt=""
          height={"50px"}
          width={"50px"}
        />
      </td>
      <td>{product.attributes.price}</td>
      <td>{piblishView}</td>
      <td>
        <i class="fa-solid fa-eye"></i>
        <Link to={"/admin/product/edit/" + product.id}>
          <i class="fa-solid fa-pen-to-square"></i>
        </Link>
        <button onClick={handleDelete}>
          <i name={product.id} class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    </tr>
  );
}

export default AdminProductItem;
