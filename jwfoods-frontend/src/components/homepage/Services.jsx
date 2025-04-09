import React from 'react';
import '../../assets/css/services.css';

function Services() {
  const servicesCards = [
    {
      title: 'Food Delivery',
      description: 'Fast and reliable delivery for everyday grocery needs.',
      icon: 'truck',
    },
    {
      title: 'Catering Services',
      description: 'Perfect for events, meetings, and large gatherings.',
      icon: 'people-fill',
    },
    {
      title: 'Bulk Orders',
      description: 'Ideal for large households or restaurants needing stock.',
      icon: 'box-seam',
    },
    {
      title: 'Express Service',
      description: 'For urgent and same-day deliveries within GTA.',
      icon: 'clock',
    },
    {
      title: 'Corporate Catering',
      description: 'Tailored catering plans for companies and organizations.',
      icon: 'briefcase',
    },
    {
      title: 'Special Orders',
      description: 'Custom meat cuts or meal prep — just the way you like it.',
      icon: 'tools',
    },
    {
      title: 'Frozen Foods',
      description: 'Safe transport of frozen items right to your door.',
      icon: 'snow2',
    },
  ];

  return (
    <div className="container">
      <h2 className="services__title text-center text-white mb-3 fw-bold">Our Services</h2>
      <p className="services__subtitle text-center text-light mb-4">
        Discover premium delivery and catering options that fit your lifestyle.
      </p>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {servicesCards.map(({ title, description, icon }) => (
          <div key={title} className="col">
            <div className="services__card card h-100 border-0 shadow-sm p-4">
              <div className="services__icon mb-3">
                <i className={`bi bi-${icon} fs-3`} />
              </div>
              <h5 className="services__card-title fw-semibold">{title}</h5>
              <p className="services__card-desc small mb-0">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
