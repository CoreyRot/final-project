import React from 'react';
import '../../assets/css/areas.css';

function Areas() {
  return (
      <div className="container">
        <h2 className="areas__title text-center mb-4">Areas of Operation</h2>

        <div className="card border-0 areas__card">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h3 className="areas__subtitle mb-3">Greater Toronto Area</h3>
                <p className="lead text-muted mb-3">
                  We proudly serve the GTA and surrounding regions.
                </p>
                <p className="text-muted">
                  Our fleet ensures your orders arrive fresh and on time. We're
                  constantly expanding to reach more customers across Ontario.
                </p>

                <div className="d-flex flex-wrap mt-4">
                  <div className="me-4 mb-3 d-flex align-items-center">
                    <i className="bi bi-truck text-primary me-2 fs-5" />
                    <span>Fast Delivery</span>
                  </div>
                  <div className="me-4 mb-3 d-flex align-items-center">
                    <i className="bi bi-geo-alt text-primary me-2 fs-5" />
                    <span>Wide Coverage</span>
                  </div>
                  <div className="mb-3 d-flex align-items-center">
                    <i className="bi bi-clock text-primary me-2 fs-5" />
                    <span>On-Time Service</span>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mt-4 mt-md-0">
                <div className="areas__map rounded overflow-hidden shadow-sm">
                  <iframe
                    title="JW Foods Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115694.51458641773!2d-79.5181419!3d43.7181555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d80d313c71%3A0x5037b28c7231790!2sToronto%2C%20ON!5e0!3m2!1sen!2sca!4v1711490027962!5m2!1sen!2sca"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Areas;
