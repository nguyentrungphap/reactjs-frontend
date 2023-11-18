import React from "react";
import Product from "../Product";
import styles from "./styles.module.scss";
function ProductBox(props) {
  const { products } = props;
  const myView = products.map((product) => (
    <li className="col-3 my-2 px-1">
      <Product product={product} />
    </li>
  ));

  return (
    <div className="well well-small">
      <h3>Our Products</h3>
      <ul className={` row ${styles.wrapper}`}>{myView}</ul>
    </div>
  );
}

ProductBox.defaultProps = {
  products: [],
};

export default ProductBox;
