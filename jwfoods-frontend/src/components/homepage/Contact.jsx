import React, { useState } from 'react';
import '../../assets/css/contact.css';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000); // Placeholder for real processing
  };

  return (
    <div className="containerfull">
      <div className="contact__wrapper">
        <div className="contact__card">
          {/* Info Panel */}
          <div className="contact__info">
            <div className="contact__info-block">
              <i className="bi bi-geo-alt-fill" aria-hidden="true" />
              <div>
                <h6>Location</h6>
                <p>123 Main Street, Toronto</p>
              </div>
            </div>
            <div className="contact__info-block">
              <i className="bi bi-telephone-fill" aria-hidden="true" />
              <div>
                <h6>Phone</h6>
                <p>(416) 555-1234</p>
              </div>
            </div>
            <div className="contact__info-block">
              <i className="bi bi-clock-fill" aria-hidden="true" />
              <div>
                <h6>Hours</h6>
                <p>Mon–Fri: 9am – 6pm</p>
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <div className="contact__form">
            <h2>Contact Form</h2>
            {submitted ? (
              <p className="contact__thank-you">Thank you! We'll get back to you shortly.</p>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="message"
                  placeholder="Comment or message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <button type="submit">Submit</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
