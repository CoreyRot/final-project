import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function OrderConfirmation() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orderData = localStorage.getItem('lastOrder');
    if (orderData) {
      setOrder(JSON.parse(orderData));
    }
  }, []);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const getEstimatedDeliveryDate = () => {
    if (!order) return '';
    const deliveryDate = new Date(order.orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + order.deliveryDays);
    return formatDate(deliveryDate);
  };

  if (!order) {
    return (
      <div className="container my-5 text-center">
        <div className="alert alert-warning">
          No order information found.{' '}
          <Link to="/" className="alert-link">Return to homepage</Link>
        </div>
      </div>
    );
  }

  const deliveryAddress = '123 Placeholder Street';

  return (
    <section className="order-confimration py-5">
      <div className="container">
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body text-center py-5">
            <div className="mb-4">
              <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '5rem' }} />
            </div>
            <h1 className="display-5 mb-3">Thank You for Your Order!</h1>
            <p className="lead mb-4">Your order has been received and is being processed.</p>

            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="card bg-light mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <h4 className="h5">Order Details</h4>
                        <p className="mb-1">Tracking Number: <strong>{order.trackingNumber}</strong></p>
                        <p className="mb-1">Order Date: {formatDate(order.orderDate)}</p>
                        <p className="mb-0">Total Amount: <strong>${order.total?.toFixed(2)}</strong></p>
                      </div>
                      <div className="col-md-6">
                        <h4 className="h5">Delivery Information</h4>
                        <p className="mb-1">Estimated Delivery: <strong>{getEstimatedDeliveryDate()}</strong></p>
                        <p className="mb-1">Delivery Fee: ${order.shippingFee?.toFixed(2)}</p>
                        <p className="mb-0">Delivery Address: {deliveryAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="card mb-4">
                  <div className="card-header">
                    <h3 className="h5 mb-0">Order Items</h3>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Item</th>
                            <th className="text-center">Quantity</th>
                            <th className="text-end">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item) => (
                            <tr key={item.id}>
                              <td>{item.name}</td>
                              <td className="text-center">{item.quantity}</td>
                              <td className="text-end">
                                ${ (item.price * item.quantity).toFixed(2) }
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="table-light">
                          <tr>
                            <td colSpan="2" className="text-end"><strong>Subtotal:</strong></td>
                            <td className="text-end">${order.subtotal?.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <td colSpan="2" className="text-end"><strong>Shipping:</strong></td>
                            <td className="text-end">${order.shippingFee?.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <td colSpan="2" className="text-end"><strong>HST (13%):</strong></td>
                            <td className="text-end">${order.hst?.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <td colSpan="2" className="text-end"><strong>Total:</strong></td>
                            <td className="text-end">${order.total?.toFixed(2)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <Link to="/" className="btn btn-outline-primary btn-lg">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderConfirmation;
