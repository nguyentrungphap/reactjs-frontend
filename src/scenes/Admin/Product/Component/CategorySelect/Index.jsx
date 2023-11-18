import React, { useEffect, useState } from "react";
import SelectBox from "../SelectBox.jsx/Index";
import categoryApi from "../../../../../Api/categoryApi";

// TODO: life cycle reactjs
// TODO: useEffect?
// TODO: ({
function CategorySelect(props) {
  //props
  const { value, onChange } = props;

  // state
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  // useEffect
  useEffect(() => {
    fetchCategories();
  }, []);

  // hàm để phía trên
  const fetchCategories = async () => {
    const response = await categoryApi.getAll();
    const temp = response.data.data;
    const newCategories = temp.map((category) => ({
      label: category.attributes.categoryName,
      value: category.id,
    }));
    setCategories(newCategories);
    setLoading(false);
  };

  // render để cuối cùng
  const renderCategories = () => {
    if (loading) {
      return <select>loading categories</select>;
    }
    return (
      <SelectBox
        name="category"
        value={value}
        defaultValue={1}
        data={categories}
        onChange={onChange}
      />
    );
  };

  return <div>{renderCategories()}</div>;
}

export default CategorySelect;
