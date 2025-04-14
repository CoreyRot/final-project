import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login({ setUser }) {  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem('user')) navigate('/dashboard');
  }, [navigate]);

  // Load remembered email
  useEffect(() => {
    const saved = localStorage.getItem('rememberedEmail');
    if (saved) {
      setFormData(prev => ({ ...prev, email: saved }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Both email and password are required.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('https://final-project-0vf0.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      rememberMe
        ? localStorage.setItem('rememberedEmail', formData.email)
        : localStorage.removeItem('rememberedEmail');
      

      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <section className="login py-5">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold">Welcome Back</h2>
                <p className="text-muted">Sign in to your J.W. Foods account</p>
              </div>

              {error && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2" />
                  <div>{error}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                  <label htmlFor="email">Email address</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={() => setRememberMe(prev => !prev)}
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <Link to="/forgot-password" className="text-primary small">
                    Forgot password?
                  </Link>
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={isLoading}
                    aria-label="Sign in"
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right me-2" />Sign In
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center">
                <p className="mb-0">
                  Don’t have an account?{' '}
                  <Link to="/register" className="text-primary fw-bold">Create Account</Link>
                </p>
              </div>

              <hr className="my-4" />
              <div className="text-center">
                <p className="text-muted small mb-0">
                  By continuing, you agree to our{' '}
                  <a href="#terms" className="text-decoration-none">Terms of Service</a> and{' '}
                  <a href="#privacy" className="text-decoration-none">Privacy Policy</a>.
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

export default Login;
