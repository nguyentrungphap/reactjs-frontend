import React, { useContext, useEffect, useState } from "react";
import PictureBox from "./components/PictureBox";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import productApi from "../../../Api/productApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../store/modules/carts/cart-slice";
import { convertPrice } from "../../../utils/price";
import PriceContext from "../../../context/PriceContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { country } = useContext(PriceContext);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);

  const dispath = useDispatch();
  const params = {
    populate: "*",
  };

  const handleChange = (e) => {
    setQuantity(e.target.value);
    console.log(quantity);
  };
  const imgagebox = loading ? (
    <Loading />
  ) : (
    <PictureBox images={product.attributes.image.data} />
  );
  const view2 = loading ? (
    <Loading />
  ) : (
    <>
      <h1>{product.attributes.productName}</h1>
      <hr className="soft" />
      <form className="form-horizontal qtyFrm">
        <div className="control-group">
          <h3 className="text-primary">
            <span>{convertPrice(product.attributes.price, country)}</span>
          </h3>
          <div className="controls">
            <input
              type="number"
              className="span6"
              placeholder="Qty."
              onChange={handleChange}
            />
          </div>
        </div>
        <p>
          <button
            type="submit"
            className="btn btn-primary mt-2"
            onClick={() =>
              dispath(addToCart({ item: { ...product, count: quantity } }))
            }
          >
            <span className=" icon-shopping-cart" /> Add to cart
          </button>
        </p>
      </form>
    </>
  );
  const view3 = loading ? <Loading /> : <p>{product.attributes.description}</p>;

  useEffect(() => {
    const featchData = async () => {
      Promise.all([productApi.get(id, params)]).then(([response]) => {
        console.log(response);
        setProduct(response.data.data);
        setLoading(false);
      });
    };
    featchData();
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-5">{imgagebox}</div>
        <div className="col-7">{view2}</div>
      </div>
      <hr className="softn clr" />
      <div>
        <h2>Product Details</h2>
        {view3}
      </div>
    </div>
  );
}
