import axios from "axios";
import React, { useState } from "react";

function UploadImage(props) {
  const { addImage } = props;
  const [file, setFile] = useState(null);
  console.log({ file });

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    console.log("Selected file:", e.target.files);
  };

  const handleUpload = async (e) => {
    console.log("send file ", file);
    const data = new FormData();
    data.append("files", file);
    console.log("data", data);
    e.target.innerText = "upload....";
    const response = await axios({
      method: "POST",
      url: "http://localhost:1337/api/upload",
      data,
    });
    e.target.innerText = "upload done";
    console.log({ response });
    const id = response.data[0].id;
    const url = response.data[0].url;
    console.log({ id });
    console.log({ url });
    console.log("response", response);
    addImage(id, url);
  };

  return (
    <div>
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
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadImage;
