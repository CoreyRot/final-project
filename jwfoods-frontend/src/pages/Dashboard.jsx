import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPanel from '../components/admin/AdminPanel';
import '../assets/css/dashboard.css';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(userData));

    const orderHistory = localStorage.getItem('orderHistory');
    if (orderHistory) {
      try {
        const parsedOrders = JSON.parse(orderHistory);
        parsedOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        setOrders(parsedOrders);
      } catch {
        setOrders([]);
      }
    } else {
      const lastOrder = localStorage.getItem('lastOrder');
      if (lastOrder) {
        try {
          const parsedOrder = JSON.parse(lastOrder);
          if (!parsedOrder.id) parsedOrder.id = Date.now().toString();
          setOrders([parsedOrder]);
          localStorage.setItem('orderHistory', JSON.stringify([parsedOrder]));
        } catch {
          setOrders([]);
        }
      } else {
        setOrders([]);
      }
    }

    setLoading(false);
  }, [navigate]);

  const viewOrderDetails = (orderId) => {
    const selectedOrder = orders.find((o) => o.id === orderId);
    if (selectedOrder) {
      localStorage.setItem('lastOrder', JSON.stringify(selectedOrder));
      navigate('/confirmation');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="ms-2">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard container-fluid py-4 bg-light">
      <div className="container">
        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-lg-3">
            <div className="card shadow-sm border-0 mb-4 dashboard__sidebar">
              <div className="card-body text-center py-4">
                <div className="mb-3">
                  <div
                    className="bg-primary text-white d-inline-flex justify-content-center align-items-center rounded-circle"
                    style={{ width: '80px', height: '80px' }}
                  >
                    <i className="bi bi-person-fill fs-1" />
                  </div>
                </div>
                <h4 className="mb-1">{user.firstName} {user.lastName}</h4>
                <p className="text-muted mb-3">{user.email}</p>
                <button
                  className="btn btn-outline-danger rounded-pill w-100 dashboard__logout-btn"
                  onClick={handleLogout}
                  aria-label="Logout"
                >
                  <i className="bi bi-box-arrow-right me-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-9">
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body p-0">
                <ul className="nav nav-pills nav-fill p-2 dashboard__tabs">
                  {['profile', 'orders', 'admin'].map((tab) => (
                    <li className="nav-item px-1" key={tab}>
                      <button
                        className={`nav-link rounded-pill ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                        aria-label={`${tab.charAt(0).toUpperCase() + tab.slice(1)} Tab`}
                      >
                        <i className={`bi me-2 ${tab === 'profile' ? 'bi-person' : tab === 'orders' ? 'bi-box-seam' : 'bi-gear'}`} />
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="card shadow-sm border-0">
                <div className="card-header bg-white py-3 border-0">
                  <h3 className="h5 mb-0">Account Overview</h3>
                </div>
                <div className="card-body">
                  <div className="alert alert-success mb-4" role="alert">
                    <i className="bi bi-check-circle-fill me-2" />
                    You are successfully logged in to your J.W. Foods account.
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="card h-100 bg-light border-0">
                        <div className="card-body">
                          <h4 className="dashboard__card-title mb-3">
                            <i className="bi bi-person-vcard me-2 text-primary" />
                            Personal Information
                          </h4>
                          <p className="mb-1"><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                          <p className="mb-1"><strong>Email:</strong> {user.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="card h-100 bg-light border-0">
                        <div className="card-body">
                          <h4 className="dashboard__card-title mb-3">
                            <i className="bi bi-house-door me-2 text-primary" />
                            Default Address
                          </h4>
                          <p className="mb-1">123 Placeholder Street</p>
                          <p className="mb-1">Toronto, Ontario</p>
                          <p className="mb-1">L4J 2Y8</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="card shadow-sm border-0">
                <div className="card-header bg-white py-3 border-0">
                  <h3 className="h5 mb-0">Order History</h3>
                </div>
                <div className="card-body">
                  {orders.length === 0 ? (
                    <div className="text-center py-5">
                      <i className="bi bi-box-seam text-muted" style={{ fontSize: '3rem' }} />
                      <p className="mt-3 mb-0">You don't have any orders yet.</p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table align-middle">
                        <thead className="table-light">
                          <tr>
                            <th>Order #</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order) => (
                            <tr key={order.id || order.trackingNumber}>
                              <td><span className="fw-medium">{order.trackingNumber || 'N/A'}</span></td>
                              <td>{formatDate(order.orderDate)}</td>
                              <td><span className="badge dashboard__order-badge">{order.status || "Processing"}</span></td>
                              <td>${order.total?.toFixed(2) || '0.00'}</td>
                              <td>
                                <button className="btn btn-sm btn-outline-primary" onClick={() => viewOrderDetails(order.id)} aria-label="View Order Details">
                                  View Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Admin Tab */}
            {activeTab === 'admin' && (
              <div className="card shadow-sm border-0">
                <div className="card-header bg-white py-3 border-0">
                  <h3 className="h5 mb-0">Admin Panel</h3>
                </div>
                <div className="card-body dashboard__admin-wrapper">
                  <AdminPanel />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
