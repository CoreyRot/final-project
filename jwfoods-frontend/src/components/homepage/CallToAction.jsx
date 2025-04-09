import React from 'react';
import '../../assets/css/cta.css';

function CallToAction() {
  return (
      <div className="container-full">
        <div className="cta__card card border-0 text-white text-center">
          <div className="card-body">
            <h3 className="cta__title mb-3">Need a Custom Service?</h3>
            <p className="cta__subtitle mb-4">
              We can tailor our services to meet your specific requirements.
            </p>
            <a href="#contact" className="btn btn-light btn-lg px-4 rounded-pill">
              <i className="bi bi-chat-dots me-2"></i>Contact Us
            </a>
          </div>
        </div>
      </div>
  );
}

export default CallToAction;
