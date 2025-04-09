import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [hst, setHst] = useState(0);
  const [total, setTotal] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [creditCard, setCreditCard] = useState('');
  
  // Ontario tax rate
  const HST_RATE = 0.13; // 13% HST in Ontario
  
  // Placeholder information
  const customerInfo = {
    name: 'PlaceHolder',
    email: 'placeholder@gmail.com',
    address: '123 Placeholder Street',
    city: 'Toronto',
    province: 'Ontario',
    postalCode: 'L4J 2Y8'
  };

  // Load cart items and calculate totals
  useEffect(() => {
    const loadCartItems = async () => {
      setLoading(true);
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const cartData = JSON.parse(savedCart);
          setCartItems(cartData);
          
          // Calculate subtotal
          const subtotalAmount = cartData.reduce((total, item) => 
            total + (item.price * item.quantity), 0);
          setSubtotal(subtotalAmount);
          
          // Get the saved delivery price from localStorage
          const savedDelivery = localStorage.getItem('deliveryPrice');
          if (savedDelivery) {
            const deliveryData = JSON.parse(savedDelivery);
            setShippingFee(deliveryData.price);
          } else {
            // If no delivery price was calculated, use default method
            await calculateDefaultShipping(cartData);
          }
        }
      } catch (error) {
        console.error("Error loading cart items:", error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadCartItems();
  }, []);
  
  // Calculate tax and total whenever subtotal or shipping changes
  useEffect(() => {
    const taxableAmount = subtotal + shippingFee;
    const hstAmount = taxableAmount * HST_RATE;
    
    setHst(hstAmount);
    setTotal(taxableAmount + hstAmount);
  }, [subtotal, shippingFee]);

  const calculateDefaultShipping = async (items) => {
    try {
      // Calculate total weight of all items (assuming each item is 0.5kg)
      const totalWeight = items.reduce((total, item) => total + (item.quantity * 0.5), 0);
      
      // Get coefficients from database
      const coeffResponse = await fetch('http://localhost:5000/api/coefficients');
      if (!coeffResponse.ok) {
        throw new Error('Failed to fetch coefficients');
      }
      const coefficients = await coeffResponse.json();
      
      // Use a default distance of 25km
      const distance = 25;
      
      // Calculate shipping using the formula from your delivery calculator
      // (distance coefficient * distance) + (weight coefficient * weight)
      const shipping = (coefficients.distance_coefficient * distance) + 
                       (coefficients.weight_coefficient * totalWeight);
      
      setShippingFee(shipping);
    } catch (error) {
      console.error("Error calculating shipping:", error);
      // Set a default value in case of an error
      setShippingFee(10);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate credit card (1-16 digits)
    if (!/^\d{1,16}$/.test(creditCard)) {
      setError('Please enter a valid credit card number (1-16 digits)');
      return;
    }
    
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      try {
        // Generate a random tracking number (uppercase alphanumeric)
        const trackingNumber = Math.random().toString(36).substring(2, 12).toUpperCase();
        
        // Calculate estimated delivery days (between 2-7 days)
        const deliveryDays = Math.floor(Math.random() * 6) + 2;
        
        // Create order information
        const orderDetails = {
          id: Date.now().toString(), // Use timestamp as unique ID
          items: cartItems,
          subtotal: subtotal,
          shippingFee: shippingFee,
          hst: hst,
          total: total,
          trackingNumber: trackingNumber,
          deliveryDays: deliveryDays,
          orderDate: new Date().toISOString(),
          status: "Processing"
        };
        
        // Store as the last order for confirmation page
        localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
        
        // Add to order history
        const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
        orderHistory.push(orderDetails);
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
        
        // Clear cart and delivery price
        localStorage.setItem('cart', JSON.stringify([]));
        localStorage.removeItem('deliveryPrice');
        window.dispatchEvent(new Event('cartUpdated'));
        window.dispatchEvent(new Event('deliveryPriceUpdated'));
        
        // Navigate to thank you page
        navigate('/confirmation');
      } catch (error) {
        console.error("Error processing order:", error);
        setError("There was an error processing your order. Please try again.");
        setProcessing(false);
      }
    }, 1500);
  };

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
    <section className="checkout py-5">
      <div className="container">
        <h2 className="mb-4">Checkout</h2>
        
        <div className="row">
          <div className="col-lg-8">
            {/* Customer Information (Read-only) */}
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-header bg-white py-3">
                <h3 className="h5 mb-0">Customer Information</h3>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <label className="form-label">Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={customerInfo.name} 
                      readOnly 
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      value={customerInfo.email} 
                      readOnly 
                    />
                  </div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={customerInfo.address} 
                    readOnly 
                  />
                </div>
                
                <div className="row">
                  <div className="col-md-4 mb-3 mb-md-0">
                    <label className="form-label">City</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={customerInfo.city} 
                      readOnly 
                    />
                  </div>
                  <div className="col-md-4 mb-3 mb-md-0">
                    <label className="form-label">Province</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={customerInfo.province} 
                      readOnly 
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Postal Code</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={customerInfo.postalCode} 
                      readOnly 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Information */}
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-header bg-white py-3">
                <h3 className="h5 mb-0">Payment Information</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="creditCard" className="form-label">Credit Card Number</label>
                    <input
                      type="text"
                      className={`form-control ${error && error.includes('credit card') ? 'is-invalid' : ''}`}
                      id="creditCard"
                      value={creditCard}
                      onChange={(e) => setCreditCard(e.target.value)}
                      placeholder="Enter credit card number (1-16 digits)"
                      required
                    />
                    {error && <div className="invalid-feedback">{error}</div>}
                    <div className="form-text">For testing, enter any number between 1-16 digits</div>
                  </div>
                  
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={processing || cartItems.length === 0}
                    >
                      {processing ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Processing your order...
                        </>
                      ) : (
                        `Complete Purchase - $${total.toFixed(2)}`
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          <div className="col-lg-4">
            {/* Order Summary */}
            <div className="card shadow-sm border-0 mb-4 sticky-top" style={{ top: '20px' }}>
              <div className="card-header bg-white py-3">
                <h3 className="h5 mb-0">Order Summary</h3>
              </div>
              <div className="card-body">
                <div className="mb-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="d-flex justify-content-between mb-2">
                      <div>
                        <span>{item.name}</span>
                        <small className="d-block text-muted">Qty: {item.quantity}</small>
                      </div>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <hr className="my-3" />
                
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span>${shippingFee.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>HST (13%)</span>
                  <span>${hst.toFixed(2)}</span>
                </div>
                <hr className="my-2" />
                <div className="d-flex justify-content-between fw-bold mb-0">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;