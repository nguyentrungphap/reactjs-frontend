import React from "react";
import { getProductPrice } from "../../../../../utils/price";
import RangePrice from "../../../../../components/RangePrice";
import styles from "./styles.module.scss";

const Filter = (props) => {
  const {
    maxPrice,
    minPrice,
    onFilterByName,
    onFilterByMaxPrice,
    onFilterByMinPrice,
  } = props;

  const handleChangeRange = (values) => {
    onFilterByMaxPrice(values[1]);
    onFilterByMinPrice(values[0]);
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="name"
        onChange={onFilterByName}
        className={styles.filterName}
      />
      <RangePrice
        values={[minPrice, maxPrice]}
        min={10000}
        max={200000}
        onChange={handleChangeRange}
      />

      <div className="row mt-2 container">
        <input
          type="text"
          value={minPrice}
          placeholder="Min price"
          onChange={onFilterByMinPrice}
          className="ml-3 col-5"
        />
        <div className="col-2"></div>

        <input
          type="text"
          value={maxPrice}
          placeholder="Max price"
          onChange={onFilterByMaxPrice}
          className={`styles.filterMax col-5`}
        />
      </div>
    </div>
  );
};

export default Filter;
