import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CategorySelect from "./CategorySelect/Index";
import { validateCreateProduct } from "../../../../utils/validate";
import productApi from "../../../../Api/productApi";
import UploadImage from "../../../../utils/UploadImage/Index";
import AppUrl from "../../../../Api/AppUrl";
import { useNavigate, useParams } from "react-router-dom";

function AdminProductEdit() {
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const [data, setData] = useState({
    productName: "",
    description: "",
    detail: "",
    category: "",
    price: "",
    image: ["1", "2"],
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

  const handleUpdate = (e) => {
    e.preventDefault();
    var err = validateCreateProduct(data);
    if (err === "") {
      const updateProduct = async (id, data) => {
        const sendData = {
          data: data,
        };
        try {
          const response = await productApi.update(id, sendData);
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
          navigate("/admin/product");
        } catch (error) {
          toast.error("bi loi" + error);
        }
      };
      updateProduct(id, data);
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
  useEffect(() => {
    const fetchData = async (id) => {
      const params = {
        populate: "*",
      };
      const response = await productApi.get(id, params);
      const oldProduct = response.data.data;
      console.log("asdas", oldProduct.attributes.productName);
      setData({
        productName: oldProduct.attributes.productName,
        description: oldProduct.attributes.description,
        category: oldProduct.attributes.category.data.id,
        detail: oldProduct.attributes.detail,
        price: oldProduct.attributes.price,
        image: oldProduct.attributes.image.data.map((img) => img.id),
      });
      /* tạo mảng oldImages chứa id và url của hình ảnh */
      const oldImages = oldProduct.attributes.image.data.map((img) => {
        return {
          id: img.id,
          url: img.attributes.url,
        };
      });
      setImages([...oldImages]);
    };
    fetchData(id);
  }, [id]);
  return (
    <div className="container px-5 my-5">
      <form id="createProduct" onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label" htmlFor="productName">
            Product Name
          </label>
          <input
            name="productName"
            className="form-control"
            id="productName"
            type="text"
            placeholder={data.productName}
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
            placeholder={data.detail}
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
            placeholder={data.description}
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
            placeholder={data.price}
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
            Update
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

export default AdminProductEdit;
