import React, { useState } from 'react';
import '../../assets/css/products.css';
import FamilyDinnerImg from '../../assets/images/pexels-photo-3184183.jpeg';
import SandwichPlatterImg from '../../assets/images/pexels-rachel-claire-5864300.jpg';
import DessertBoxImg from '../../assets/images/pexels-jordan-besson-2051439001-30217145.jpg';
import SaladBowlImg from '../../assets/images/pexels-janetrangdoan-793759.jpg';
import BreakfastComboImg from '../../assets/images/pexels-vince-31387554.jpg';
import ProteinPackImg from '../../assets/images/pexels-roman-odintsov-4552980.jpg';
import CharcuterieBoardImg from '../../assets/images/pexels-kyleroxas-2122278.jpg';
import KidsMealComboImg from '../../assets/images/pexels-helloaesthe-15707243.jpg';

function Products() {
  const products = [
    { id: 1, name: "Family Dinner Package", price: 45.99, image: FamilyDinnerImg, description: "Complete dinner for a family of four with entrees, sides, and dessert.", category: "Meals" },
    { id: 2, name: "Gourmet Sandwich Platter", price: 32.50, image: SandwichPlatterImg, description: "Assorted sandwiches for gatherings and meetings.", category: "Platters" },
    { id: 3, name: "Premium Dessert Box", price: 24.99, image: DessertBoxImg, description: "Selection of our finest desserts and pastries.", category: "Desserts" },
    { id: 4, name: "Fresh Salad Bowl", price: 18.99, image: SaladBowlImg, description: "Healthy salad with seasonal ingredients and dressing.", category: "Healthy" },
    { id: 5, name: "Breakfast Combo", price: 21.50, image: BreakfastComboImg, description: "Includes eggs, toast, fruit, and a beverage.", category: "Meals" },
    { id: 6, name: "Protein Pack", price: 120.00, image: ProteinPackImg, description: "Our best-selling variety pack of meats.", category: "Meats" },
    { id: 7, name: "Charcuterie Board", price: 27.00, image: CharcuterieBoardImg, description: "An elegant assortment of cured meats, cheeses, fresh fruit, and gourmet crackers — perfect for any occasion.", category: "Platters" },
    { id: 8, name: "Kids Meal Combo", price: 12.99, image: KidsMealComboImg, description: "Perfectly portioned meals for children.", category: "Meals" }
  ];

  const [filter, setFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(8);
  const [message, setMessage] = useState('');
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const filteredProducts = filter === 'all'
    ? products
    : products.filter(product => product.category.toLowerCase() === filter.toLowerCase());

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const categories = ['all', ...new Set(products.map(p => p.category.toLowerCase()))];

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const index = cart.findIndex(item => item.id === product.id);

    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));

    setMessage(`${product.name} added to cart!`);
    setIsMessageVisible(true);
    setTimeout(() => setIsMessageVisible(false), 3000);
  };

  return (
    <div className="container">
      <div className="products__header d-flex justify-content-between align-items-center mb-4">
        <h2 className="products__title m-0">Featured Products</h2>
        <div className="products__filters d-none d-md-flex align-items-center">
          <span className="me-2 text-muted">Filter:</span>
          <div className="btn-group">
            {categories.map((category) => (
              <button
                key={category}
                className={`btn ${filter === category ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {visibleProducts.map((product) => (
          <div className="col" key={product.id}>
            <div className="products__card card h-100 border-0 shadow-sm">
              <div className="position-relative">
                <img src={product.image} className="card-img-top" alt={product.name} />
                <span className="badge bg-primary position-absolute top-0 start-0 m-2 text-uppercase px-3 py-1 rounded-pill small shadow-sm">
                  {product.category}
                </span>
              </div>
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text small">{product.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">${product.price.toFixed(2)}</span>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => addToCart(product)}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <i className="bi bi-cart-plus me-1" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < filteredProducts.length && (
        <div className="text-center mt-4">
          <button
            className="btn btn-outline-primary px-5 rounded-pill"
            onClick={() => setVisibleCount(visibleCount + 3)}
          >
            Load More
          </button>
        </div>
      )}

      {isMessageVisible && (
        <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1000 }}>
          <div className="toast show bg-success text-white shadow-lg" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header bg-success text-white">
              <strong className="me-auto">Added to Cart</strong>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setIsMessageVisible(false)}
                aria-label="Close"
              />
            </div>
            <div className="toast-body">{message}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
