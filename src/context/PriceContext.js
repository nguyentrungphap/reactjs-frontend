import React, { useState } from "react";

const PriceContext = React.createContext();

const PriceContextProvider = (props) => {
  const { children } = props;
  const [country, setCountry] = useState("vi-VN");

  const handleSetCountry = (country) => {
    setCountry(country);
  };

  return (
    <PriceContext.Provider
      value={{
        country,
        onSetCountry: handleSetCountry,
      }}
    >
      {children}
    </PriceContext.Provider>
  );
};

export default PriceContext;

export { PriceContextProvider };
