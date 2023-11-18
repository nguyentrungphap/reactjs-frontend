import React, { useEffect, useState } from "react";

// API
import categoryApi from "../../../Api/categoryApi.js";
import productApi from "../../../Api/productApi.js";

// Component
import CategoryMenu from "./components/CategoryMenu/Index.jsx";
import Loading from "../../../components/Loading/index.jsx";
import { useParams } from "react-router-dom";
import Pagination from "../../../components/Paginate.jsx/index.jsx";
import Filter from "./components/Filter/Index.jsx";
import { maxBy, minBy } from "lodash";
import ProductBox from "../../../components/ProductBox/Index.jsx";
export default function ProductList() {
  const { pageNum } = useParams();

  const [categories, setCategories] = useState({});
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const [filterKey, setFilterKey] = useState("");
  const [maxPrice, setMaxPrice] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [category, setCategory] = useState(null);

  const productHasMaximumPrice = maxBy(products, (product) => {
    return product.attributes.price;
  });
  const productHasMinimumPrice = minBy(products, (product) => {
    return product.attributes.price;
  });

  const handleFilterByName = (e) => {
    setFilterKey(e.target.value);
  };

  const handleFilterByMaxPrice = (value) => {
    setMaxPrice(value);
  };

  const handleFilterByMinPrice = (value) => {
    setMinPrice(value);
  };

  const handleFilterByCategory = (e) => {
    setCategory(e.target.innerText);
  };

  const params = {
    populate: "*",
    pagination: {
      page: pageNum ? pageNum : 1,
      pageSize: 12,
    },
    filters: {
      productName: {
        $contains: filterKey ? filterKey : null,
      },
      price: {
        $lt: maxPrice ? maxPrice : null,
        $gte: minPrice ? minPrice : null,
      },

      category: {
        categoryName: {
          $eq: category ? category : null,
        },
      },
    },
  };

  const myView1 = loading ? (
    <Loading />
  ) : (
    <>
      <CategoryMenu
        categories={categories}
        handleFilterByCategory={handleFilterByCategory}
      />
      <Filter
        maxPrice={maxPrice}
        minPrice={minPrice}
        productHasMaximumPrice={productHasMaximumPrice}
        productHasMinimumPrice={productHasMinimumPrice}
        onFilterByName={handleFilterByName}
        onFilterByMaxPrice={handleFilterByMaxPrice}
        onFilterByMinPrice={handleFilterByMinPrice}
      />
    </>
  );

  const myView2 = loading ? <Loading /> : <ProductBox products={products} />;

  const fetchData = async () => {
    Promise.all([categoryApi.getAll(), productApi.getAll(params)]).then(
      ([response1, response2]) => {
        setCategories(response1.data.data);
        setProducts(response2.data.data);
        setTotalPage(response2.data.meta.pagination.pageCount);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, [pageNum, filterKey, maxPrice, category, minPrice]);

  return (
    <div className="row">
      <div id="sidebar" className="col-3">
        {myView1}
      </div>
      <div className="col-9">{myView2}</div>
      <Pagination
        totalPage={totalPage}
        currentPage={pageNum ? pageNum : 1}
        basePath="http://localhost:3000/products/page/"
      />
    </div>
  );
}
