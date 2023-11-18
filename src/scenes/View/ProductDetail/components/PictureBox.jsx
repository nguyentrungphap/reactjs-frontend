import React from "react";
import AppUrl from "../../../../Api/AppUrl";

export default function PictureBox(props) {
  const { images } = props;
  const imageView = images.map((image, key) => {
    if (key === 0)
      return (
        <div key={key} className="carousel-item active">
          <img
            src={AppUrl.ImageUrl + image.attributes.url}
            class="d-block w-100 "
            alt="..."
            height={"450px"}
          />
        </div>
      );
    else
      return (
        <div key={key} className="carousel-item">
          <img
            src={AppUrl.ImageUrl + image.attributes.url}
            class="d-block w-100"
            alt="..."
            height={"450px"}
          />
        </div>
      );
  });
  return (
    <div id="carouselExample" className="carousel slide">
      <div className="carousel-inner">{imageView}</div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
