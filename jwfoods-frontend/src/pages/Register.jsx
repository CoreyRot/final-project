import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Live validation
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    }

    if (name === 'password') calculatePasswordStrength(value);
    if (name === 'confirmEmail' || name === 'email') {
      if (formData.confirmEmail && formData.email !== formData.confirmEmail) {
        setValidationErrors((prev) => ({ ...prev, confirmEmail: 'Emails do not match' }));
      } else {
        setValidationErrors((prev) => ({ ...prev, confirmEmail: '' }));
      }
    }
  };

  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    setPasswordStrength(score);
  };

  const validateForm = () => {
    const errors = {};
    if (formData.email !== formData.confirmEmail) errors.confirmEmail = 'Emails do not match';
    if (formData.password.length < 8) errors.password = 'Password must be at least 8 characters';
    ['firstName', 'lastName', 'email'].forEach(field => {
      if (!formData[field]) errors[field] = 'This field is required';
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch('https://final-project-0vf0.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Registration failed');

      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthLabel = () => {
    if (passwordStrength === 0) return 'Too short';
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  const getStrengthClass = () => {
    if (passwordStrength <= 2) return 'bg-danger';
    if (passwordStrength === 3) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <section className="register py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold">Create Your Account</h2>
                  <p className="text-muted">Join J.W. Foods and enjoy exclusive benefits</p>
                </div>

                {error && (
                  <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2" />
                    <div>{error}</div>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    {['firstName', 'lastName'].map((field) => (
                      <div className="col-md-6" key={field}>
                        <div className="form-floating">
                          <input
                            type="text"
                            id={field}
                            name={field}
                            className={`form-control ${validationErrors[field] ? 'is-invalid' : ''}`}
                            placeholder={field}
                            value={formData[field]}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor={field}>{field === 'firstName' ? 'First Name' : 'Last Name'}</label>
                          {validationErrors[field] && <div className="invalid-feedback">{validationErrors[field]}</div>}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="row g-3 mt-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="email">Email</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="email"
                          id="confirmEmail"
                          name="confirmEmail"
                          className={`form-control ${validationErrors.confirmEmail ? 'is-invalid' : ''}`}
                          placeholder="Confirm Email"
                          value={formData.confirmEmail}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="confirmEmail">Confirm Email</label>
                        {validationErrors.confirmEmail && <div className="invalid-feedback">{validationErrors.confirmEmail}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="form-floating mt-3">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className={`form-control ${validationErrors.password ? 'is-invalid' : ''}`}
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="password">Password</label>
                    {validationErrors.password && <div className="invalid-feedback">{validationErrors.password}</div>}
                  </div>

                  {formData.password && (
                    <div className="mt-2 mb-3">
                      <small className="text-muted d-flex justify-content-between">
                        <span>Password Strength</span>
                        <span className="fw-semibold">{getStrengthLabel()}</span>
                      </small>
                      <div className="progress" style={{ height: '6px' }}>
                        <div
                          className={`progress-bar ${getStrengthClass()}`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="form-check mb-4 mt-3">
                    <input className="form-check-input" type="checkbox" id="termsCheck" required />
                    <label className="form-check-label" htmlFor="termsCheck">
                      I agree to the <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>
                    </label>
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-person-plus me-2" /> Create Account
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Already have an account? <Link to="/login" className="text-primary fw-bold">Sign In</Link>
                  </p>
                </div>

                <hr className="my-4" />
                <div className="text-center">
                  <p className="text-muted small mb-0">
                    By registering, you agree to our <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
