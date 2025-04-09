import React, { useState, useEffect } from 'react';

function AdminPanel() {
  const [coeff, setCoeff] = useState({
    distance_coefficient: 0.5,
    weight_coefficient: 2.0
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCoefficients = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://final-project-0vf0.onrender.com/api/coefficients');
        if (!response.ok) throw new Error('Failed to fetch coefficients');
        const data = await response.json();
        setCoeff(data);
      } catch {
        setError('Failed to fetch current coefficients');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoefficients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoeff(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    setMessage('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (coeff.distance_coefficient <= 0 || coeff.weight_coefficient <= 0) {
      setError('Coefficients must be positive numbers');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://final-project-0vf0.onrender.com/api/coefficients', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(coeff)
      });

      if (!response.ok) throw new Error('Failed to update coefficients');
      const data = await response.json();
      setMessage(data.message || 'Coefficients updated successfully');
    } catch (err) {
      setError(err.message || 'Error updating coefficients');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin">
      <div className="admin__card card border-0 shadow-sm">
        <div className="admin__header card-header bg-primary text-white text-center">
          <h2 className="admin__title h4 mb-0 py-2">Delivery Calculator Settings</h2>
        </div>

        <div className="admin__body card-body p-4">
          {isLoading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="admin__formula alert alert-info d-flex align-items-start">
                <i className="bi bi-info-circle-fill me-3 fs-5 mt-1" aria-hidden="true" />
                <div>
                  <strong>Calculation:</strong>
                  <p className="mb-0">
                    Price = (Distance × Distance Coefficient) + (Weight × Weight Coefficient)
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label htmlFor="distance_coefficient" className="form-label fw-semibold">
                      Distance Coefficient ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      name="distance_coefficient"
                      id="distance_coefficient"
                      className="form-control"
                      value={coeff.distance_coefficient}
                      onChange={handleChange}
                      required
                    />
                    <small className="text-muted">Cost per km/mile for delivery distance</small>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="weight_coefficient" className="form-label fw-semibold">
                      Weight Coefficient ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      name="weight_coefficient"
                      id="weight_coefficient"
                      className="form-control"
                      value={coeff.weight_coefficient}
                      onChange={handleChange}
                      required
                    />
                    <small className="text-muted">Cost per kg/lb for product weight</small>
                  </div>
                </div>

                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-save me-2" /> Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>

              {message && (
                <div className="alert alert-success mt-4 d-flex align-items-center">
                  <i className="bi bi-check-circle-fill me-2" aria-hidden="true" />
                  {message}
                </div>
              )}

              {error && (
                <div className="alert alert-danger mt-4 d-flex align-items-center">
                  <i className="bi bi-exclamation-triangle-fill me-2" aria-hidden="true" />
                  {error}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
