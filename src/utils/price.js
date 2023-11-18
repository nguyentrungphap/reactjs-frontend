export const countryFormats = {
  "vi-VN": {
    style: "currency",
    currency: "VND",
  },
  "en-US": {
    style: "currency",
    currency: "USD",
  },
};

export const convertPrice = (price, country) => {
  if (country === "en-US") {
    price /= 24375;
  }
  const countryConfig = countryFormats[country];
  return new Intl.NumberFormat(country, countryConfig).format(price);
};

export const getProductPrice = (product) => {
  return product?.attributes?.price || 0;
};
