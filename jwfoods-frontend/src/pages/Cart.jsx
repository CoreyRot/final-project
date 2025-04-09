import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DeliveryCalculator from '../components/DeliveryCalculator';

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingItemId, setRemovingItemId] = useState(null);
  const [deliveryPrice, setDeliveryPrice] = useState(0);

  useEffect(() => {
    const loadCartItems = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) setCartItems(JSON.parse(savedCart));
      } catch {
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    const loadDeliveryPrice = () => {
      try {
        const savedDelivery = localStorage.getItem('deliveryPrice');
        if (savedDelivery) {
          const deliveryData = JSON.parse(savedDelivery);
          setDeliveryPrice(deliveryData.price);
        } else {
          setDeliveryPrice(0);
        }
      } catch {
        setDeliveryPrice(0);
      }
    };

    loadCartItems();
    loadDeliveryPrice();

    const handleCartUpdate = () => loadCartItems();
    const handleDeliveryUpdate = () => loadDeliveryPrice();

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('deliveryPriceUpdated', handleDeliveryUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('deliveryPriceUpdated', handleDeliveryUpdate);
    };
  }, []);

  const removeItem = (id) => {
    setRemovingItemId(id);
    setTimeout(() => {
      const updatedCart = cartItems.filter(item => item.id !== id);
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      window.dispatchEvent(new Event('cartUpdated'));
      setRemovingItemId(null);
    }, 300);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCartItems([]);
      localStorage.setItem('cart', JSON.stringify([]));
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  const handleCheckout = () => navigate('/checkout');

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const calculateTotal = () => calculateSubtotal() + deliveryPrice;

  if (loading) {
    return (
      <div className="container my-5">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="cart py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Your Shopping Cart</h2>
          {cartItems.length > 0 && (
            <span className="badge bg-primary rounded-pill fs-6">
              {cartItems.reduce((total, item) => total + item.quantity, 0)} Items
            </span>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body text-center py-5">
              <i className="bi bi-cart text-muted" style={{ fontSize: '5rem' }} />
              <h3 className="h4 mb-3">Your cart is empty</h3>
              <p className="text-muted mb-4">Looks like you haven't added anything yet.</p>
              <Link to="/" className="btn btn-primary">
                <i className="bi bi-shop me-2"></i> Browse Products
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Table View */}
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Product</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-center">Total</th>
                        <th className="text-end">
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={clearCart}
                            title="Clear Cart"
                          >
                            <i className="bi bi-trash me-1" />
                            Clear
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.id} className={removingItemId === item.id ? 'animate__animated animate__fadeOut' : ''}>
                          <td>
                            <strong>{item.name}</strong>
                            <div className="text-muted small">{item.description}</div>
                          </td>
                          <td className="text-center">${item.price.toFixed(2)}</td>
                          <td className="text-center">
                            <div className="input-group input-group-sm justify-content-center" style={{ maxWidth: '120px' }}>
                              <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                              <input
                                type="number"
                                className="form-control text-center"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                min="1"
                              />
                              <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                            </div>
                          </td>
                          <td className="text-center fw-bold">${(item.price * item.quantity).toFixed(2)}</td>
                          <td className="text-end">
                            <button className="btn btn-sm btn-outline-danger" onClick={() => removeItem(item.id)}>
                              <i className="bi bi-trash" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Delivery & Summary */}
            <div className="row">
              <div className="col-md-7 mb-4">
                <div className="card shadow-sm border-0">
                  <div className="card-header bg-white py-3">
                    <h3 className="h5 mb-0">Calculate Delivery Cost</h3>
                  </div>
                  <div className="card-body">
                    <DeliveryCalculator />
                  </div>
                </div>
              </div>
              <div className="col-md-5 mb-4">
                <div className="card shadow-sm border-0">
                  <div className="card-header bg-white py-3">
                    <h3 className="h5 mb-0">Order Summary</h3>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal</span>
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Estimated Delivery</span>
                      <span>{deliveryPrice > 0 ? `$${deliveryPrice.toFixed(2)}` : 'Calculate above'}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mb-4 fw-bold">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                    <div className="d-grid">
                      <button className="btn btn-primary btn-lg" onClick={handleCheckout}>
                        <i className="bi bi-credit-card me-2" /> Proceed to Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Cart;
