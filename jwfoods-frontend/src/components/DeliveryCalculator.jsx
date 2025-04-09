import React, { useState, useEffect } from 'react';

function DeliveryCalculator() {
  const [distance, setDistance] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEstimate, setShowEstimate] = useState(false);
  const [coefficients, setCoefficients] = useState({
    distance_coefficient: 0.5,
    weight_coefficient: 2.0
  });

  useEffect(() => {
    // Fetch current coefficients on mount
    const fetchCoefficients = async () => {
      try {
        const response = await fetch('https://final-project-0vf0.onrender.com/api/coefficients', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setCoefficients(data);
        }
      } catch (err) {
        console.error("Error fetching coefficients:", err);
        // Continue with default coefficients if fetch fails
      }
    };

    fetchCoefficients();
    
    // Check if we have a stored delivery price
    const storedDelivery = localStorage.getItem('deliveryPrice');
    if (storedDelivery) {
      const deliveryData = JSON.parse(storedDelivery);
      setDistance(deliveryData.distance);
      setWeight(deliveryData.weight);
      setPrice(deliveryData.price);
      setShowEstimate(true);
    }
  }, []);

  const handleCalculate = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!distance || !weight) {
      setError('Please select distance and enter package weight');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('https://final-project-0vf0.onrender.com/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ distance, weight })
      });
      
      if (!response.ok) {
        throw new Error('Failed to calculate delivery price');
      }
      
      const data = await response.json();
      setPrice(data.price);
      setShowEstimate(true);
      setError('');
      
      // Store the delivery price in localStorage
      localStorage.setItem('deliveryPrice', JSON.stringify({
        price: data.price,
        distance,
        weight
      }));
      
      // Dispatch an event to notify other components that delivery price has been updated
      window.dispatchEvent(new Event('deliveryPriceUpdated'));
    } catch (err) {
      console.error("Delivery Calculation Error:", err);
      
      // Fallback to frontend calculation if API fails
      try {
        const distVal = parseFloat(distance);
        const weightVal = parseFloat(weight);
        const estimatedPrice = (distVal * coefficients.distance_coefficient) + 
                              (weightVal * coefficients.weight_coefficient);
        setPrice(estimatedPrice);
        setShowEstimate(true);
        setError('');
        
        // Store the delivery price in localStorage
        localStorage.setItem('deliveryPrice', JSON.stringify({
          price: estimatedPrice,
          distance,
          weight
        }));
        
        // Dispatch an event to notify other components that delivery price has been updated
        window.dispatchEvent(new Event('deliveryPriceUpdated'));
      } catch (calcErr) {
        setError('Error calculating delivery price. Please try again.', calcErr);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setDistance('');
    setWeight('');
    setPrice(null);
    setError('');
    setShowEstimate(false);
    
    // Remove stored delivery price
    localStorage.removeItem('deliveryPrice');
    
    // Dispatch an event to notify other components that delivery price has been removed
    window.dispatchEvent(new Event('deliveryPriceUpdated'));
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-12">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white text-center py-3">
              <h3 className="mb-0">
                <i className="bi bi-truck me-2"></i>
                Delivery Price Calculator
              </h3>
            </div>
            <div className="card-body p-4">
              {!showEstimate ? (
                <>
                  <div className="alert alert-info mb-4">
                    <div className="d-flex">
                      <div className="me-3">
                        <i className="bi bi-info-circle-fill fs-4"></i>
                      </div>
                      <div>
                        <p className="mb-0">Calculate the estimated delivery cost based on distance and package weight.</p>
                      </div>
                    </div>
                  </div>
                  
                  <form onSubmit={handleCalculate}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="form-floating mb-3">
                          <select
                            id="distance"
                            className="form-select"
                            value={distance}
                            onChange={(e) => setDistance(e.target.value)}
                            required
                          >
                            <option value="">Select Distance</option>
                            <option value="5">5 km</option>
                            <option value="10">10 km</option>
                            <option value="25">25 km</option>
                            <option value="50">50 km</option>
                            <option value="100">100 km</option>
                            <option value="150">Over 100 km</option>
                          </select>
                          <label htmlFor="distance">Distance (km)</label>
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="form-floating mb-3">
                          <input
                            type="number"
                            id="weight"
                            className="form-control"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="Enter package weight"
                            min="0.1"
                            step="0.1"
                            required
                          />
                          <label htmlFor="weight">Package Weight (kg)</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="d-grid gap-2 mt-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Calculating...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-calculator me-2"></i>
                            Calculate Delivery Price
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                  
                  {error && (
                    <div className="alert alert-danger mt-3">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        {error}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-3">
                  <div className="mb-4">
                    <span className="display-1 text-success">
                      <i className="bi bi-check-circle"></i>
                    </span>
                  </div>
                  
                  <h3 className="mb-4">Delivery Price Estimate</h3>
                  
                  <div className="card bg-light mb-4 mx-auto" style={{ maxWidth: '300px' }}>
                    <div className="card-body py-4">
                      <div className="display-6 text-primary mb-3">${price.toFixed(2)}</div>
                      <div className="text-muted">Estimated Delivery Cost</div>
                    </div>
                  </div>
                  
                  <div className="row g-3 mb-4 justify-content-center">
                    <div className="col-sm-6">
                      <div className="card h-100 border-0 bg-light">
                        <div className="card-body text-center p-3">
                          <div className="h5 mb-1">Distance</div>
                          <div className="text-primary h4 mb-0">{distance} km</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="card h-100 border-0 bg-light">
                        <div className="card-body text-center p-3">
                          <div className="h5 mb-1">Weight</div>
                          <div className="text-primary h4 mb-0">{weight} kg</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    className="btn btn-outline-primary"
                    onClick={handleReset}
                  >
                    <i className="bi bi-arrow-repeat me-2"></i>
                    Calculate Another Delivery
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="card mt-4 shadow-sm border-0">
            <div className="card-body p-4">
              <h4 className="mb-3">Delivery Information</h4>
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="d-flex">
                    <div className="me-3 text-primary">
                      <i className="bi bi-clock fs-4"></i>
                    </div>
                    <div>
                      <h5 className="h6">Delivery Times</h5>
                      <p className="mb-0 text-muted small">Delivery times vary based on distance. Most deliveries are completed within 24-48 hours.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex">
                    <div className="me-3 text-primary">
                      <i className="bi bi-box-seam fs-4"></i>
                    </div>
                    <div>
                      <h5 className="h6">Package Requirements</h5>
                      <p className="mb-0 text-muted small">Maximum package weight is 50kg. Special handling is required for fragile items.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryCalculator;