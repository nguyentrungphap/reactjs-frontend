import React from "react";

export default function MainCarousel() {
  return (
    <div
      id="carouselExampleIndicators"
      className={`carousel slide container mt-2`}
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to={0}
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        />
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to={1}
          aria-label="Slide 2"
        />
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to={2}
          aria-label="Slide 3"
        />
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://i.pinimg.com/564x/65/45/ef/6545ef6867f225ebacaed2eb60b4343a.jpg"
            className="d-block w-100"
            height={"350px"}
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://inkythuatso.com/uploads/images/2022/05/hinh-anh-meo-bua-buon-cuoi-nhat-12-09-56-39.jpg"
            className="d-block w-100"
            height={"350px"}
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://st.quantrimang.com/photos/image/2020/06/19/Hinh-Nen-Meo-Ngao-50.jpg"
            className="d-block w-100"
            height={"350px"}
            alt="..."
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
