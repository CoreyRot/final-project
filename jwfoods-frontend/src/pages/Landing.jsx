import React from 'react';
import Introduction from '../components/homepage/Introduction';
import Services from '../components/homepage/Services';
import Products from '../components/homepage/Products';
import CallToAction from '../components/homepage/CallToAction';
import Areas from '../components/homepage/Areas';
import Corporate from '../components/homepage/Corporate';
import Contact from '../components/homepage/Contact';

function Home() {
  return (
    <>
      <Introduction />

      <section id="services" className="py-5">
        <Services />
      </section>

      <section id="products" className="py-5">
        <Products />
      </section>

      <section id="cta" className="py-5">
        <CallToAction />
      </section>

      <section id="areas" className="py-5">
        <Areas />
      </section>

      <section id="corporate" className="py-5">
        <Corporate />
      </section>

      <section id="contact" className="pt-5">
        <Contact />
      </section>
    </>
  );
}

export default Home;
