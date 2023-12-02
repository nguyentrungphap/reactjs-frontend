import React, { useState } from "react";
import { toast } from "react-toastify";
import CategorySelect from "./CategorySelect/Index";
import { validateCreateProduct } from "../../../../utils/validate";
import productApi from "../../../../Api/productApi";
import UploadImage from "../../../../utils/UploadImage/Index";
import AppUrl from "../../../../Api/AppUrl";
import { useNavigate } from "react-router-dom";

function AdminProductAdd() {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const [data, setData] = useState({
    productName: "",
    description: "",
    detail: "",
    category: "",
    price: "",
    image: [],
  });

  const addImage = (id, url) => {
    setData({
      ...data,
      image: [...data.image, id],
    });
    setImages([
      ...images,
      {
        id: id,
        url: url,
      },
    ]);
  };

  const handleSubmit = (e) => {
    console.log({ data });
    e.preventDefault();
    var err = validateCreateProduct(data);
    if (err === "") {
      const addProduct = async (data) => {
        console.log({ setData });
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
            image: [],
          });
          navigate("/admin/product");
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

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleRemove = (e) => {
    const id = e.target.name;
    console.log("asdas", e.target.name);
    setData({
      ...data,
      image: data.image.filter((img) => {
        return img != id;
      }),
    });
    setImages(
      images.filter((img) => {
        return img.id != id;
      })
    );
  };
  const imageUpload =
    images.length === 0
      ? "ko co hinh"
      : images.map((img) => {
          return (
            <div>
              <img src={AppUrl.ImageUrl + img.url} alt="img" name={img.id} />
              <button name={img.id} onClick={handleRemove}>
                remove
              </button>
            </div>
          );
        });

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
            id="description"
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
      <div className="img-upload">
        <UploadImage addImage={addImage} />
        {imageUpload}
      </div>
    </div>
  );
}

export default AdminProductAdd;
