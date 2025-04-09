import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white p-0">
      {/* Main Footer */}
      <div className="container py-5">
        <div className="row g-4">
          {/* Company Info */}
          <div className="col-lg-4 col-md-6">
            <h5 className="mb-4">J. W. Foods</h5>
            <p>Your trusted partner in quality food delivery across the Greater Toronto Area.</p>
            <div className="d-flex gap-3">
              <a href="/" className="text-white" aria-label="Facebook">
                <i className="bi bi-facebook fs-5" />
              </a>
              <a href="/" className="text-white" aria-label="Instagram">
                <i className="bi bi-instagram fs-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h5 className="mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="text-white text-decoration-none">Home</Link></li>
              <li className="mb-2"><Link to="/#products" className="text-white text-decoration-none">Products</Link></li>
              <li className="mb-2"><Link to="/#services" className="text-white text-decoration-none">Services</Link></li>
              <li className="mb-2"><Link to="/#areas" className="text-white text-decoration-none">Areas</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-2 col-md-6 col-6">
            <h5 className="mb-4">Services</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="javascript:void(0)" className="text-white text-decoration-none">Food Delivery</a></li>
              <li className="mb-2"><a href="javascript:void(0)" className="text-white text-decoration-none">Catering</a></li>
              <li className="mb-2"><a href="/#corporate" className="text-white text-decoration-none">Corporate</a></li>
              <li className="mb-2"><a href="javascript:void(0)" className="text-white text-decoration-none">Special Events</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4 col-md-6">
            <h5 className="mb-4">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex">
                <i className="bi bi-geo-alt-fill me-3 text-primary" />
                <span>123 Main Street, Toronto, ON M5V 2K7</span>
              </li>
              <li className="mb-3 d-flex">
                <i className="bi bi-telephone-fill me-3 text-primary" />
                <span>(416) 555-1234</span>
              </li>
              <li className="mb-3 d-flex">
                <i className="bi bi-envelope-fill me-3 text-primary" />
                <span>info@jwfoods.com</span>
              </li>
              <li className="mb-3 d-flex">
                <i className="bi bi-clock-fill me-3 text-primary" />
                <span>Mon-Fri: 9am - 6pm, Sat: 10am - 4pm</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-primary bg-opacity-25 py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-3 mb-lg-0">
              <h5 className="mb-1">Subscribe to Our Newsletter</h5>
              <p className="mb-0">Get the latest updates, promotions, and recipes.</p>
            </div>
            <div className="col-lg-6">
              <form className="d-flex">
                <input
                  type="email"
                  className="form-control me-2"
                  placeholder="Your Email"
                  aria-label="Email"
                />
                <button className="btn btn-light" type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-dark border-top border-secondary py-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-2 mb-md-0">
              <p className="mb-0 small text-center text-md-start">© {currentYear} J. W. Foods. All Rights Reserved.</p>
            </div>
            <div className="col-md-6">
              <ul className="list-inline mb-0 text-center text-md-end">
                <li className="list-inline-item">
                  <a href="/#terms" className="text-white small text-decoration-none">Terms</a>
                </li>
                <li className="list-inline-item mx-2">|</li>
                <li className="list-inline-item">
                  <a href="/#privacy" className="text-white small text-decoration-none">Privacy</a>
                </li>
                <li className="list-inline-item mx-2">|</li>
                <li className="list-inline-item">
                  <a href="/#cookies" className="text-white small text-decoration-none">Cookies</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
