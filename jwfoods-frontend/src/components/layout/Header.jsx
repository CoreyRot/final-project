import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/images/jw_foods_logo_5029eb46-029f-43e1-ac7c-fb888e75e2e4.png';

const navItems = [
  { label: 'Services', id: 'services' },
  { label: 'Products', id: 'products' },
  { label: 'Areas', id: 'areas' },
  { label: 'Corporate', id: 'corporate' },
  { label: 'Contact', id: 'contact' },
];

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));

    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    };

    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const navigateToSection = (id) => {
    if (isHomePage) {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
      setIsNavCollapsed(true);
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <header className="border-bottom">
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-2">
        <div className="container">
          <Link className="navbar-brand m-0 p-0" to="/">
            <img src={logo} alt="JW Foods Logo" height="80" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarContent"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
            onClick={() => setIsNavCollapsed(prev => !prev)}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarContent">
            <ul className="navbar-nav my-4 mb-lg-0 mx-auto d-flex gap-4">
              {navItems.map(({ label, id }) => (
                <li className="nav-item" key={id}>
                  <button
                    className="nav-link text-dark bg-transparent border-0 p-0"
                    onClick={() => navigateToSection(id)}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="d-flex align-items-center">
              <button
                className="btn btn-link text-dark me-3"
                title={user ? 'Dashboard' : 'Login'}
                aria-label={user ? 'Go to Dashboard' : 'Login'}
                onClick={() => navigate(user ? '/dashboard' : '/login')}
              >
                <i className="bi bi-person-fill fs-5" />
                {user && <span className="ms-1 d-none d-sm-inline">{user.firstName}</span>}
              </button>

              <button
                className="btn btn-link text-dark position-relative"
                title="Shopping Cart"
                aria-label={`Shopping Cart with ${cartCount} item${cartCount !== 1 ? 's' : ''}`}
                onClick={() => navigate('/cart')}
              >
                <i className="bi bi-cart-fill fs-5" />
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                    <span className="visually-hidden">items in cart</span>
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
