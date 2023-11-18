import React from "react";
import AppUrl from "../Api/AppUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/modules/carts/cart-slice";
import { toast } from "react-toastify";

export default function Product(props) {
  const { product } = props;
  const dispath = useDispatch();
  const handleAddProduct = () => {
    toast.success("them san pham thanh cong", {
      position: "top-center",
      theme: "dark",
    });
    dispath(addToCart({ item: { ...product, count: 1 } }));
  };

  return (
    <div className="card" style={{ height: "auto" }}>
      <Link to={"/product/" + product.id}>
        <div>
          <img
            src={
              AppUrl.ImageUrl + product.attributes.image.data[0].attributes.url
            }
            alt="..."
            style={{ height: "200px" }}
            className="card-img-top"
          />
        </div>
      </Link>
      <div className="card-body">
        <Link to={"/product/" + product.id}>
          <h5 className="card-title">{product.attributes.productName}</h5>
        </Link>
        <p className="card-text">Price: {product.attributes.price}đ</p>
        <Link
          className="btn btn-primary"
          to="#sư"
          title="add to cart"
          onClick={handleAddProduct}
        >
          Add to cart
        </Link>
      </div>
    </div>
  );
}
