import React, { useEffect, useState } from "react";
import { Range } from "react-range";

const RangePrice = (props) => {
  const { step = 100, min = 0, max = 1000, onChange } = props;
  const [values, setValues] = useState([min, max]);
  useEffect(() => {
    setValues(props.values);
  }, [props.values]);
  if(!min || !max) return null
  return (
    <Range
      step={step}
      min={min}
      max={max || 100}
      values={values}
      onChange={(values) => onChange(values)}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "6px",
            width: "100%",
            backgroundColor: "#ccc",
          }}
        >
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "15px",
            width: "15px",
            backgroundColor: "#999",
            borderRadius:"50px"
          }}
        />
      )}
    />
  );
};

export default RangePrice;
