import React from 'react';
import '../../assets/css/hero.css';

function Introduction() {
  return (
    <section className="hero">
      <video
        className="hero__video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="https://videos.pexels.com/video-files/3245641/3245641-uhd_3840_2160_25fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="hero__overlay" />

      <div className="hero__content container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-10">
            <h1 className="hero__title">Welcome to J.W. Foods</h1>
            <p className="hero__subtitle">
              Your trusted partner in premium food delivery across the GTA.
            </p>

            <div className="hero__buttons d-flex justify-content-center gap-3 flex-wrap">
              <button type="button" className="btn btn-primary hero__btn">
                <i className="bi bi-bag-check me-2" />
                Order Now
              </button>
              <button type="button" className="btn btn-outline-light hero__btn">
                <i className="bi bi-info-circle me-2" />
                Learn More
              </button>
            </div>

            <div className="hero__features d-none d-md-flex justify-content-center gap-4 mt-5">
              <div className="hero__badge">
                <i className="bi bi-truck me-2" />
                Fast Delivery
              </div>
              <div className="hero__badge">
                <i className="bi bi-star me-2" />
                Premium Quality
              </div>
              <div className="hero__badge">
                <i className="bi bi-shield-check me-2" />
                Food Safety
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Introduction;
