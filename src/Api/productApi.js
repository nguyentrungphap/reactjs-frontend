import { axiosInstance } from "./axiosInstance";

const productApi = {
  getAll(params) {
    const url = "/products";
    return axiosInstance.get(url, { params });
  },
  get(id, params) {
    const url = `/products/${id}`;
    return axiosInstance.get(url, { params });
  },
  add(data) {
    const url = "/products";
    return axiosInstance.post(url, data);
  },
  update(id, data) {
    const url = `/products/${id}`;
    return axiosInstance.put(url, data);
  },
  delete(id) {
    const url = `/products/${id}`;
    return axiosInstance.delete(url);
  },
};
export default productApi;
