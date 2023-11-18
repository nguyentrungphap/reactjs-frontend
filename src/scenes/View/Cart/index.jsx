import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";
import AppUrl from "../../../Api/AppUrl";
import {
  removeCartItem,
  decreaseQuantity,
  increaseQuantity,
} from "../../../store/modules/carts/cart-slice";
import { selectCartItems } from "../../../store/modules/carts/cart-selecetor";
import { convertPrice } from "../../../utils/price";
import { Link } from "react-router-dom";
import PriceContext from "../../../context/PriceContext";

export default function Cart() {
  const cartItems = useSelector(selectCartItems) || [];
  const { country } = useContext(PriceContext);
  const dispath = useDispatch();

  const totalItems = cartItems.reduce(
    (totalPrice, item) => totalPrice + item.count,
    0
  );
  const totalPrice = cartItems.reduce(
    (totalPrice, item) => totalPrice + item.count * item.attributes.price,
    0
  );

  const contentCart = cartItems.map((item) => (
    <tr>
      <td>
        <img
          width={100}
          src={AppUrl.ImageUrl + item.attributes.image.data[0].attributes.url}
          alt="#su"
        />
      </td>
      <td> {item.attributes.productName}</td> <td> - </td>
      <td>
        <span className="shopBtn">
          <span className="icon-ok" />
        </span>
      </td>
      <td>{convertPrice(item.attributes.price, country)}</td>
      <td className={`row ${styles.qtt}`}>
        <button
          className="col-1 btn btn-primary  mx-1"
          type="button"
          onClick={() => dispath(decreaseQuantity({ id: item.id }))}
        >
          -
        </button>
        <input
          className="col-3 mx-1"
          placeholder={1}
          id="appendedInputButtons"
          size={16}
          type="text"
          Value={item.count}
        />

        <button
          className=" col-1 btn btn-primary  mx-1"
          type="button"
          onClick={() => dispath(increaseQuantity({ id: item.id }))}
        >
          +
        </button>
        <button
          className="col-1 btn btn-mini btn-danger  mx-1"
          type="button"
          onClick={() => dispath(removeCartItem({ id: item.id }))}
        >
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
      <td>{convertPrice(item.attributes.price * item.count, country)}</td>
    </tr>
  ));
  return (
    <div className="container">
      <h1>
        Check Out
        <small className="pull-right"> 2 Items are in the cart </small>
      </h1>
      <hr className="soften" />
      <table className="table table-bordered table-condensed">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th> Ref. </th>
            <th>Avail.</th>
            <th>Unit price</th>
            <th>qtt </th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {contentCart}
          <tr>
            <td colSpan={6} className="alignR">
              Total products:{totalItems}
            </td>
            <td className="label label-primary">
              {convertPrice(totalPrice, country)}
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <Link to="/products" className="shopBtn btn-large">
        <button className="btn btn-primary">Continue Shopping</button>
      </Link>
      <Link href="login.html" className="shopBtn btn-large pull-right">
        <button className="btn btn-primary">Next</button>
      </Link>
    </div>
  );
}
