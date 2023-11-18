import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PriceContext from "../../../context/PriceContext";
import { convertPrice } from "../../../utils/price";
import cx from "classnames";

const LIST_COUNTRY = [
  { value: "vi-VN", icon: "VN" },
  { value: "en-US", icon: "USD" },
];

const LIST_LANGUAGE = [
  {
    value: "en",
    icon: "EN",
  },
  {
    value: "vn",
    icon: "VN",
  },
];

export default function NavBar() {
  const { t } = useTranslation();
  const { country } = useContext(PriceContext);
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce(
    (totalPrice, item) => totalPrice + item.count,
    0
  );
  const totalPrice = cartItems.reduce(
    (totalPrice, item) => totalPrice + item.count * item.attributes.price,
    0
  );

  const { country: defaultCountry, onSetCountry } = useContext(PriceContext);
  const { i18n } = useTranslation();
  const renderListCountry = () => {
    return LIST_COUNTRY.map((country) => {
      return (
        <span
          key={country.value}
          onClick={() => onSetCountry(country.value)}
          className={cx("btn btn-mini", {
            "btn-warning": country.value === defaultCountry,
          })}
        >
          {country.icon}
        </span>
      );
    });
  };

  const renderListLanguage = () => {
    return LIST_LANGUAGE.map((language) => {
      return (
        <li
          key={language.value}
          onClick={() => i18n.changeLanguage(language.value)}
          className={cx("btn btn-mini", {
            "btn-warning": language.value === i18n.language,
          })}
        >
          {language.icon}
        </li>
      );
    });
  };

  return (
    <nav
      class="navbar navbar-expand-lg bg-body-tertiary mb-3"
      data-bs-theme="dark"
    >
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          Navbar
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/">
                {t("Home")}
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/products">
                {t("Product")}
              </Link>
            </li>
            <li class="nav-item">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {t("Currency exchange")}
                </button>
                <ul className="dropdown-menu">
                  <li className="dropdown-item">{renderListCountry()}</li>
                </ul>
              </div>
            </li>
            <li class="nav-item">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {t("language")}
                </button>
                <ul className="dropdown-menu">
                  <li className="dropdown-item">{renderListLanguage()}</li>
                </ul>
              </div>
            </li>
            <li class="nav-item">
              <Link to="/cart">
                <span className="icon-shopping-cart" /> {totalItems} Item(s)
                <span className="badge badge-warning">
                  [{convertPrice(totalPrice, country)}]
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
