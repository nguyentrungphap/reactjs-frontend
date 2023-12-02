import React from "react";
import AdminProductItem from "./AdminProductItem";
import { useState } from "react";
import Loading from "../../../../components/Loading";
import { useEffect } from "react";
import productApi from "../../../../Api/productApi";
import { Link, useParams } from "react-router-dom";
import Pagination from "../../../../components/Paginate.jsx";
import { toast } from "react-toastify";
import CategorySelect from "./CategorySelect/Index.jsx";
function AdminProductBox() {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const { pageNum } = useParams();
  const [loadData, setLoadData] = useState(1);
  const [viewOption, setViewOption] = useState("preview");
  // -----------------------------
  const params = {
    populate: "*",
    pagination: {
      page: pageNum ? pageNum : 1,
      pageSize: 12,
    },
    publicationState: viewOption,
  };
  // -----------------------------------
  console.log({ products });
  const handleSelect = (e) => {
    setViewOption(e.target.value);
  };

  const handleDelete = (e) => {
    const deleteProductId = e.target.getAttribute("name");

    const deleteProduct = async (id) => {
      try {
        await productApi.delete(id);
        toast.success("Xóa sản phẩm thành công", {
          position: "top-center",
          theme: "dark",
        });
        setLoadData(loadData + 1); // Assuming loadData is part of your state
      } catch (error) {
        toast.error("Có lỗi xảy ra khi xóa sản phẩm", {
          position: "top-center",
          theme: "dark",
        });
      } finally {
        window.scroll(0, 0);
      }
    };

    deleteProduct(deleteProductId);
  };
  const handlePublish = (e) => {
    const data = {
      data: {
        publishedAt: e.target.value === 0 ? Date.now() : null,
      },
    };
    const togglePublish = async (e) => {
      await productApi.update(e.target.getAttribute("name"), data);
      setLoadData(loadData + 1);
    };
    togglePublish(e);
  };

  // ---------------------------------------------
  const viewProductBox = loading ? (
    <Loading />
  ) : (
    products.map((product) => (
      <AdminProductItem
        key={product.id}
        product={product}
        handleDelete={handleDelete}
        handlePublish={handlePublish}
      />
    ))
  );
  useEffect(() => {
    const featchData = async () => {
      Promise.all([productApi.getAll(params)]).then(([response]) => {
        setProducts(response.data.data);
        setTotalPage(response.data.meta.pagination.pageCount);
        setLoading(false);
      });
    };
    featchData();
  }, [pageNum, loadData, viewOption]);
  return (
    <>
      <button type="button" class="btn btn-primary">
        <Link className="text-light" to="/admin/product/add">
          create
        </Link>
      </button>

      <select onChange={handleSelect}>
        <option value="preview">Preview</option>
        <option value="live">Live</option>
      </select>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Product name</th>
            <th scope="col">Image</th>
            <th scope="col">Price</th>
            <th scope="col">Publish</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>{viewProductBox}</tbody>
      </table>
      <Pagination
        totalPage={totalPage}
        currentPage={pageNum ? pageNum : 1}
        basePath="http://localhost:3000/admin/product/page/"
      />

      <CategorySelect />
    </>
  );
}

export default AdminProductBox;
