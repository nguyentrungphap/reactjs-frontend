import React, { useState } from "react";
import { toast } from "react-toastify";
import CategorySelect from "./CategorySelect/Index";
import { validateCreateProduct } from "../../../../utils/validate";
import productApi from "../../../../Api/productApi";

function AdminProductAdd() {
  const [data, setData] = useState({
    productName: "",
    description: "",
    detail: "",
    category: "",
    price: "",
    image: ["1", "2"],
  });

  // TODO: e.preventDefault();
  // try, catch
  const handleSubmit = (e) => {
    e.preventDefault();
    var err = validateCreateProduct(data);
    if (err === "") {
      const addProduct = async (data) => {
        const sendData = {
          data: data,
        };
        console.log({ sendData });
        try {
          const response = await productApi.add(sendData);
          console.log(response);
          if (response.status === "200") toast.success("thanh cong");
          document.getElementById("createProduct").reset();
          setData({
            productName: "",
            description: "",
            category: "",
            price: "",
            image: ["1", "2"],
          });
        } catch (error) {
          toast.error("bi loi" + error);
        }
      };
      addProduct(data);
    } else {
      toast.error(err);
      return false;
    }
  };

  // TODO: e la gi
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setData({
        ...data,
        image: e.target.files,
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };
  console.log({ data, env: process.env });
  return (
    <div className="container px-5 my-5">
      <form id="createProduct" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="productName">
            Product Name
          </label>
          <input
            name="productName"
            className="form-control"
            id="productName"
            type="text"
            placeholder="Product Name"
            data-sb-validations="required"
            onChange={handleChange}
          />
          <div
            className="invalid-feedback"
            data-sb-feedback="productName:required"
          >
            Product Name is required.
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="detail">
            detail
          </label>
          <textarea
            className="form-control"
            id="descriptdetailion"
            type="text"
            name="detail"
            placeholder="detail"
            style={{ height: "10rem" }}
            data-sb-validations="required"
            defaultValue={""}
            onChange={handleChange}
          />
          <div className="invalid-feedback" data-sb-feedback="detail:required">
            detail is required.
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="description">
            description
          </label>
          <textarea
            className="form-control"
            id="description"
            type="text"
            name="description"
            placeholder="description"
            style={{ height: "10rem" }}
            data-sb-validations="required"
            defaultValue={""}
            onChange={handleChange}
          />
          <div
            className="invalid-feedback"
            data-sb-feedback="description:required"
          >
            description is required.
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="image">
            Image
          </label>
          <input
            className="form-control"
            id="image"
            name="image"
            type="file"
            multiple
            onChange={handleChange}
            data-sb-validations="required"
          />
          <div className="invalid-feedback" data-sb-feedback="image:required">
            Image is required.
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="price">
            price
          </label>
          <input
            className="form-control"
            id="price"
            type="number"
            name="price"
            placeholder="price"
            data-sb-validations="required"
            onChange={handleChange}
          />
          <div className="invalid-feedback" data-sb-feedback="price:required">
            price is required.
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="category">
            category
          </label>
          <CategorySelect value={data.category} onChange={handleChange} />
        </div>
        <div className="d-grid">
          <button
            className="btn btn-primary btn-lg"
            id="submitButton"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminProductAdd;
