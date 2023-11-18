import React from "react";

function SelectBox(props) {
  const { name, data, value, defaultValue, onChange } = props;

  const View = data.map((dataItem) => {
    if (defaultValue === dataItem.value) {
      return (
        <option value={dataItem.value} selected>
          {dataItem.label}
        </option>
      );
    }
    return <option value={dataItem.value}>{dataItem.label}</option>;
  });

  return (
    <select
      name={name}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
    >
      {View}
    </select>
  );
}

export default SelectBox;
