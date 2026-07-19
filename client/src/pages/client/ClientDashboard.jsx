import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ClientDashboard() {
  const { user, loading } = useAuth();
  const [applications, setApplications] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (user) {
      Promise.all([
        api.get('/client/applications'),
        api.get('/client/bookings')
      ]).then(([appRes, bookRes]) => {
        setApplications(appRes.data.data?.applications || []);
        setBookings(bookRes.data.data?.bookings || []);
      }).catch(err => {
        console.error('Failed to fetch client data', err);
      }).finally(() => {
        setFetching(false);
      });
    }
  }, [user]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (application) => {
    try {
      const res = await loadRazorpayScript();
      if (!res) {
        alert('Razorpay SDK failed to load. Please check your connection.');
        return;
      }

      const { data } = await api.post('/payments/create-order', { applicationId: application._id });
      const { orderId, amount, currency, keyId } = data.data;

      const options = {
        key: keyId,
        amount: amount.toString(),
        currency: currency,
        name: 'CARD Technocrats',
        description: `Payment for ${application.serviceTitle}`,
        order_id: orderId,
        handler: async function (response) {
          try {
            await api.post('/payments/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            alert('Payment successful! Your application is now marked as Paid.');
            window.location.reload();
          } catch (err) {
            alert('Payment verification failed.');
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: '#3B82F6',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        alert(`Payment Failed: ${response.error.description}`);
      });
      rzp1.open();
    } catch (err) {
      alert(err.response?.data?.message || 'Error initiating payment');
    }
  };

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <>
      <Helmet>
        <title>My Dashboard | CARD Technocrats & Engineers</title>
      </Helmet>

      <main className="bg-dark-950 min-h-screen pt-28 pb-16 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="mb-8">
            <h1 className="text-3xl font-black mb-2">Welcome back, {user.name}</h1>
            <p className="text-gray-400">Manage your applications and bookings from your secure portal.</p>
          </div>

          {fetching ? (
            <div className="text-center py-20 text-gray-500">Loading your data...</div>
          ) : (
            <div className="space-y-12">
              
              {/* Applications Section */}
              <section>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  My Service Applications
                </h2>
                
                {applications.length === 0 ? (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center text-gray-400">
                    You haven't submitted any service applications yet.
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {applications.map(app => (
                      <div key={app._id} className="flex flex-col gap-2">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="text-xs text-blue-400 font-mono mb-1">{app._id}</div>
                          <h3 className="font-bold text-lg">{app.serviceTitle}</h3>
                          <div className="text-sm text-gray-400 mt-1">Applied on {new Date(app.createdAt).toLocaleDateString()}</div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                            app.status === 'Approved' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                            app.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                            app.status === 'Reviewing' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                            'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                      </div>
                      
                      {/* Payment Banner if applicable */}
                      {app.paymentStatus === 'Pending' && app.amountDue > 0 && (
                        <div className="mt-2 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-center justify-between">
                          <div>
                            <div className="text-sm text-blue-400 font-bold">Payment Required</div>
                            <div className="text-xs text-gray-400">An admin has generated an invoice for ₹{app.amountDue}.</div>
                          </div>
                          <button
                            onClick={() => handlePayment(app)}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors shadow-lg shadow-blue-500/25"
                          >
                            Pay ₹{app.amountDue}
                          </button>
                        </div>
                      )}
                      {app.paymentStatus === 'Completed' && (
                        <div className="mt-2 bg-green-500/10 border border-green-500/20 rounded-xl p-3 flex items-center justify-between">
                          <div className="text-sm text-green-400 font-bold flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            Payment Completed
                          </div>
                        </div>
                      )}
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Bookings Section */}
              <section>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  My Bookings
                </h2>
                
                {bookings.length === 0 ? (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center text-gray-400">
                    You haven't made any bookings yet.
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {bookings.map(book => (
                      <div key={book._id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="text-xs text-purple-400 font-mono mb-1">{book.bookingType}</div>
                          <h3 className="font-bold text-lg">{book.serviceTitle || book.packageTitle}</h3>
                          <div className="text-sm text-gray-400 mt-1">Booked on {new Date(book.createdAt).toLocaleDateString()}</div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                            book.status === 'Confirmed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                            book.status === 'Cancelled' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                            'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                          }`}>
                            {book.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
