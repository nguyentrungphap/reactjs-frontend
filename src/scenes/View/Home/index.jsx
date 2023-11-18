import React from "react";
import MainCarousel from "./components/MainCarousel";
import styles from "./styles.module.scss";
import ProductBox from "../../../components/ProductBox/Index";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <MainCarousel />
      <ProductBox />
    </div>
  );
}
