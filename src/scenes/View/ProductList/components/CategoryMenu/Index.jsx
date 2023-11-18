import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
export default function CategoryMenu(props) {
  const { categories, handleFilterByCategory } = props;

  const myView = categories.map((category) => (
    <li key={category.id}>
      <Link
        className={styles.element}
        to="/products"
        onClick={handleFilterByCategory}
      >
        {category.attributes.categoryName}
      </Link>
    </li>
  ));

  return <ul className={styles.wrapper}>{myView}</ul>;
}
