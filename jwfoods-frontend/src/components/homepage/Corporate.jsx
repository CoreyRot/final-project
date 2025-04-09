import React from 'react';
import '../../assets/css/corporate.css';

function Corporate() {
  return (
    <div className="container">
      <div className="row align-items-center gy-4">
        <div className="col-lg-6">
          <div className="corporate__intro border-0 card h-100">
            <div className="card-body p-4">
              <h2 className="corporate__title mb-3">Corporate Information</h2>
              <p className="corporate__text text-muted mb-4">
                JW Foods is committed to serving the Greater Toronto Area with high-quality meats, fresh products, and custom services tailored for both individual customers and corporate partners.
              </p>
              <p className="corporate__text text-muted">
                J&W Foods was co-founded in 1995, inspired by a family legacy in the butcher and grocery business. We offer high-quality meats, seafood, and a meal-prep service for healthy lifestyles.
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="row g-3">
            <div className="col-6">
              <div className="corporate__card corporate__card--hours card h-100 border-0 shadow-sm text-white">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-clock me-2 fs-4"></i>
                    <h5 className="card-title mb-0">Hours</h5>
                  </div>
                  <p className="small mb-1">Mon–Fri: 9am – 6pm</p>
                  <p className="small mb-1">Sat: 10am – 4pm</p>
                  <p className="small">Sun: Closed</p>
                </div>
              </div>
            </div>

            <div className="col-6">
              <div className="corporate__card corporate__card--contact card h-100 border-0 shadow-sm text-white">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-telephone me-2 fs-4"></i>
                    <h5 className="card-title mb-0">Contact</h5>
                  </div>
                  <p className="small mb-1">(416) 555-0199</p>
                  <p className="small">info@jwfoods.com</p>
                </div>
              </div>
            </div>

            <div className="col-6">
              <div className="corporate__card corporate__card--location card h-100 border-0 shadow-sm text-white">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-geo-alt me-2 fs-4"></i>
                    <h5 className="card-title mb-0">Location</h5>
                  </div>
                  <p className="small mb-1">123 Main Street</p>
                  <p className="small">Toronto, ON M1X 1Y2</p>
                </div>
              </div>
            </div>

            <div className="col-6">
              <div className="corporate__card corporate__card--cta card h-100 border-0 shadow-sm text-white">
                <div className="card-body p-3 d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-chat-dots me-2 fs-4"></i>
                    <h5 className="card-title mb-0">Get in Touch</h5>
                  </div>
                  <p className="small mb-3">We're here to help with any questions or custom service requests.</p>
                  <a href="#contact" className="btn btn-light mt-auto rounded-pill">Contact Us</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Corporate;
