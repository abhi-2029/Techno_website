/**
 * CARD Technocrats & Engineers LLP - Public Page Component
 * 
 * Senior Developer Notes:
 * - Auxiliary travel booking portal whitelisting flights and train ticket bookings.
 * - Glassmorphic forms, tab toggles, search results generator, and passenger details collector.
 * - Simulates a Razorpay-style payment gateway checkout and IRCTC auto-allocation.
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useCreateBooking } from '../hooks/useBookings';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';
import {
  CalendarDaysIcon,
  PaperAirplaneIcon,
  TicketIcon,
  UserIcon,
  MapPinIcon,
  CheckCircleIcon,
  CreditCardIcon,
  QrCodeIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';

const FLIGHT_OPTIONS = [
  { carrier: 'IndiGo (6E-452)', time: '08:30 AM - 10:15 AM', duration: '1h 45m', price: 4200, seatsLeft: 4, classCode: 'Economy' },
  { carrier: 'Air India (AI-805)', time: '11:15 AM - 01:05 PM', duration: '1h 50m', price: 5600, seatsLeft: 2, classCode: 'Economy' },
  { carrier: 'Akasa Air (QP-112)', time: '04:20 PM - 06:10 PM', duration: '1h 50m', price: 3950, seatsLeft: 12, classCode: 'Economy' },
  { carrier: 'Vistara (UK-981)', time: '07:45 PM - 09:30 PM', duration: '1h 45m', price: 6100, seatsLeft: 1, classCode: 'Business' }
];

const TRAIN_OPTIONS = [
  { carrier: 'Rajdhani Express (12423)', time: '04:10 PM - 09:55 AM', duration: '17h 45m', price: 2850, availability: 'AVAILABLE-0024', probability: '98% Confirm Chance', status: 'available' },
  { carrier: 'Shatabdi Express (12004)', time: '06:15 AM - 12:40 PM', duration: '6h 25m', price: 1420, availability: 'AVAILABLE-0003', probability: '99% Confirm Chance', status: 'available' },
  { carrier: 'Vande Bharat (22436)', time: '03:00 PM - 11:00 PM', duration: '8h 00m', price: 1850, availability: 'WL-12', probability: '82% Confirm Chance', status: 'waitlist' },
  { carrier: 'Garib Rath (12204)', time: '11:35 PM - 07:15 PM', duration: '19h 40m', price: 980, availability: 'WL-45', probability: '45% Confirm Chance', status: 'low' }
];

export default function TravelBooking() {
  const [bookingType, setBookingType] = useState('Flight');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [travelClass, setTravelClass] = useState('Economy');
  const [passengerCount, setPassengerCount] = useState(1);
  
  // Search state
  const [searched, setSearched] = useState(false);
  const [selectedCarrier, setSelectedCarrier] = useState(null);
  
  // Booking Form
  const [passengers, setPassengers] = useState([{ name: '', age: '', identityNumber: '' }]);
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [successBooking, setSuccessBooking] = useState(null);

  // Payment Simulation States
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // UPI, Card, NetBanking
  const [paymentStep, setPaymentStep] = useState(1); // 1 = Details, 2 = Processing
  const [processingMessage, setProcessingMessage] = useState('');

  // Randomized Seat allocations for confirmed ticket screen
  const [allocatedSeats, setAllocatedSeats] = useState([]);

  const createBookingMutation = useCreateBooking();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!from || !to || !departureDate) {
      toast.error('Please fill in departure, destination, and travel date.');
      return;
    }
    if (from.toLowerCase() === to.toLowerCase()) {
      toast.error('Departure and Destination cities cannot be the same.');
      return;
    }
    setSearched(true);
    setSelectedCarrier(null);
  };

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const handleAddPassenger = () => {
    if (passengers.length >= passengerCount) {
      toast.error(`You have selected ${passengerCount} passenger(s) in your search query.`);
      return;
    }
    setPassengers([...passengers, { name: '', age: '', identityNumber: '' }]);
  };

  const handleRemovePassenger = (index) => {
    setPassengers(passengers.filter((_, idx) => idx !== index));
  };

  // Triggers the payment modal popup
  const handleProceedToPayment = () => {
    for (let i = 0; i < passengers.length; i++) {
      if (!passengers[i].name || !passengers[i].age) {
        toast.error(`Please complete name and age details for Passenger ${i + 1}`);
        return;
      }
    }
    if (!contactEmail || !contactPhone) {
      toast.error('Please provide contact details.');
      return;
    }
    setPaymentStep(1);
    setShowPaymentModal(true);
  };

  // Simulates automatic seat booking, Razorpay payment processing, and IRCTC confirmation
  const handleSimulatePayment = () => {
    setPaymentStep(2);
    setProcessingMessage('Initiating secure token transaction...');

    setTimeout(() => {
      setProcessingMessage('Processing bank payment clearance...');
    }, 1000);

    setTimeout(() => {
      setProcessingMessage('Contacting carrier system for seat allocation...');
    }, 2000);

    setTimeout(() => {
      setProcessingMessage('Generating confirmed digital ticket PDF...');
    }, 3000);

    setTimeout(() => {
      // Execute the backend registration with status set to Confirmed
      const payload = {
        bookingType,
        from,
        to,
        departureDate,
        travelClass,
        carrierName: selectedCarrier.carrier,
        price: selectedCarrier.price * passengers.length,
        passengers: passengers.map(p => ({ ...p, age: Number(p.age) })),
        contactEmail,
        contactPhone,
        status: 'Confirmed',
        ticketUrl: '/downloads/CARD_Advisory_Brochure.pdf' // Attach a mock ticket link
      };

      createBookingMutation.mutate(payload, {
        onSuccess: (data) => {
          // Generate randomized seat locations
          const seats = passengers.map((_, idx) => {
            if (bookingType === 'Flight') {
              const rows = ['10', '12', '14', '18', '22'];
              const cols = ['A', 'B', 'C', 'D', 'F'];
              return `${rows[Math.floor(Math.random() * rows.length)]}${cols[Math.floor(Math.random() * cols.length)]}`;
            } else {
              const coaches = ['S1', 'S2', 'B1', 'B2', 'A1'];
              return `${coaches[Math.floor(Math.random() * coaches.length)]} / Seat ${Math.floor(Math.random() * 64) + 1}`;
            }
          });
          setAllocatedSeats(seats);
          setSuccessBooking(data?.data?.booking || data?.booking);
          setShowPaymentModal(false);
          toast.success('Ticket booked and confirmed instantly!');
        },
        onError: (err) => {
          setShowPaymentModal(false);
          toast.error(err.response?.data?.message || 'Failed to request ticket booking. Please try again.');
        }
      });
    }, 4000);
  };

  const carriers = bookingType === 'Flight' ? FLIGHT_OPTIONS : TRAIN_OPTIONS;

  return (
    <>
      <Helmet>
        <title>Flight & Railway Ticket Booking | CARD Technocrats</title>
      </Helmet>

      <main className="bg-[#030712] text-white pt-28 pb-16 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl space-y-10">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Corporate Travel Services
            </span>
            <h1 className="text-4xl font-black text-white">Flight & Train Booking Hub</h1>
            <p className="text-xs text-gray-400 max-w-lg mx-auto">
              Auto-allocation booking counter with instant IRCTC & Airline GDS ticket confirmations.
            </p>
          </div>

          {/* Success screen */}
          {successBooking ? (
            <Card className="p-8 border border-emerald-500/20 bg-emerald-500/[0.01] backdrop-blur-xl text-center space-y-6 max-w-lg mx-auto">
              <CheckCircleIcon className="w-16 h-16 text-emerald-500 mx-auto" />
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Ticket Confirmed
                </span>
                <h3 className="text-2xl font-black text-white">Happy Journey!</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Your ticket has been booked on **{successBooking.carrierName}** from **{successBooking.from}** to **{successBooking.to}**.
                </p>
                
                {/* Confirmed seat grid */}
                <div className="p-4 bg-white/5 border border-white/5 rounded-2xl text-xs space-y-3.5 text-left font-mono max-w-sm mx-auto">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">Booking Reference:</span>
                    <span className="text-blue-400 font-bold">{successBooking._id.slice(-8).toUpperCase()}</span>
                  </div>
                  
                  {successBooking.passengers.map((p, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <div>
                        <div className="font-bold text-white">{p.name} ({p.age})</div>
                        <span className="text-[9px] text-gray-500">ID: {p.identityNumber || 'N/A'}</span>
                      </div>
                      <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20">
                        {allocatedSeats[idx] || 'Seat Allocated'}
                      </span>
                    </div>
                  ))}

                  <div className="flex justify-between border-t border-white/5 pt-2.5">
                    <span className="text-gray-500">Amount Paid:</span>
                    <span className="text-emerald-400 font-bold">₹{successBooking.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center gap-3">
                <Button variant="primary" onClick={() => { setSuccessBooking(null); setSearched(false); setSelectedCarrier(null); }}>
                  Book Another Ticket
                </Button>
                <a href={successBooking.ticketUrl} download className="block">
                  <Button variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
                    Download Ticket PDF
                  </Button>
                </a>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Search Panel */}
              <div className="lg:col-span-1 space-y-6">
                
                {/* Tabs */}
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                  <button
                    onClick={() => { setBookingType('Flight'); setTravelClass('Economy'); setSearched(false); }}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${bookingType === 'Flight' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                  >
                    <PaperAirplaneIcon className="w-3.5 h-3.5 rotate-45" /> Flights
                  </button>
                  <button
                    onClick={() => { setBookingType('Train'); setTravelClass('3AC'); setSearched(false); }}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${bookingType === 'Train' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                  >
                    <TicketIcon className="w-3.5 h-3.5" /> Railways
                  </button>
                </div>

                {/* Form */}
                <Card className="p-6 bg-white/[0.01] border border-white/10 backdrop-blur-xl">
                  <form onSubmit={handleSearch} className="space-y-4">
                    <Input
                      label="From (City)"
                      placeholder="e.g. New Delhi"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                    />
                    <Input
                      label="To (City)"
                      placeholder="e.g. Patna"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                    />
                    <Input
                      label="Travel Date"
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase">Class</label>
                        <select
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                          value={travelClass}
                          onChange={(e) => setTravelClass(e.target.value)}
                        >
                          {bookingType === 'Flight' ? (
                            <>
                              <option value="Economy" className="bg-dark-900">Economy</option>
                              <option value="Premium Economy" className="bg-dark-900">Premium Econ</option>
                              <option value="Business" className="bg-dark-900">Business</option>
                            </>
                          ) : (
                            <>
                              <option value="Sleeper" className="bg-dark-900">Sleeper (SL)</option>
                              <option value="3AC" className="bg-dark-900">AC 3 Tier (3AC)</option>
                              <option value="2AC" className="bg-dark-900">AC 2 Tier (2AC)</option>
                              <option value="1AC" className="bg-dark-900">AC First Class (1AC)</option>
                            </>
                          )}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase">Passengers</label>
                        <select
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                          value={passengerCount}
                          onChange={(e) => setPassengerCount(Number(e.target.value))}
                        >
                          <option value="1" className="bg-dark-900">1 Traveler</option>
                          <option value="2" className="bg-dark-900">2 Travelers</option>
                          <option value="3" className="bg-dark-900">3 Travelers</option>
                          <option value="4" className="bg-dark-900">4 Travelers</option>
                        </select>
                      </div>
                    </div>

                    <Button type="submit" variant="primary" className="w-full justify-center py-3 bg-gradient-to-r from-blue-600 to-cyan-500 font-bold">
                      Search Available Options
                    </Button>
                  </form>
                </Card>
              </div>

              {/* Options & Booking Area */}
              <div className="lg:col-span-2 space-y-6">
                {!searched ? (
                  <div className="h-[300px] border border-white/5 rounded-2xl flex flex-col items-center justify-center text-center p-6 bg-white/[0.01]">
                    <MapPinIcon className="w-10 h-10 text-gray-600 mb-2" />
                    <h3 className="text-sm font-bold text-gray-400">Search for Route</h3>
                    <p className="text-xs text-gray-500 max-w-xs mt-1">Specify your origin, destination, and travel dates on the left to review fares and book seats.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                      Available {bookingType} options from <span className="text-blue-400 capitalize">{from}</span> to <span className="text-blue-400 capitalize">{to}</span>
                    </h3>
                    
                    {/* Carrier Options List */}
                    <div className="space-y-3">
                      {carriers.map((opt, idx) => (
                        <Card
                          key={idx}
                          className={`p-4 bg-white/5 border transition-all flex items-center justify-between cursor-pointer ${selectedCarrier?.carrier === opt.carrier ? 'border-blue-500 bg-blue-500/5 shadow-lg shadow-blue-500/5' : 'border-white/10 hover:border-white/20'}`}
                          onClick={() => { setSelectedCarrier(opt); setPassengers([{ name: '', age: '', identityNumber: '' }]); }}
                        >
                          <div className="space-y-1">
                            <span className="text-xs font-bold text-white">{opt.carrier}</span>
                            <div className="text-[10px] text-gray-400 font-mono mt-0.5">{opt.time} | Duration: {opt.duration}</div>
                            
                            {bookingType === 'Flight' ? (
                              <div className="mt-1 flex items-center gap-1.5">
                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${opt.seatsLeft <= 3 ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                                  {opt.seatsLeft} Seats Left
                                </span>
                                <span className="text-[9px] text-gray-500 font-bold uppercase font-mono">{opt.classCode}</span>
                              </div>
                            ) : (
                              <div className="mt-2 flex items-center gap-2">
                                <div className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border ${
                                  opt.status === 'available' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                  opt.status === 'waitlist' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                  'bg-red-500/10 text-red-400 border-red-500/20'
                                }`}>
                                  {opt.availability}
                                </div>
                                <div className="text-[9px] font-semibold text-gray-400">
                                  Chance: <span className={opt.status === 'available' ? 'text-emerald-400' : opt.status === 'waitlist' ? 'text-amber-400' : 'text-red-400'}>{opt.probability}</span>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="text-xs text-gray-400">Per Passenger</div>
                              <span className="text-sm font-black text-emerald-400">₹{opt.price.toLocaleString()}</span>
                            </div>
                            <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedCarrier?.carrier === opt.carrier ? 'border-blue-500 bg-blue-500' : 'border-white/20'}`}>
                              {selectedCarrier?.carrier === opt.carrier && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </span>
                          </div>
                        </Card>
                      ))}
                    </div>

                    {/* Booking Form (appears when option selected) */}
                    {selectedCarrier && (
                      <Card className="p-6 bg-white/[0.02] border border-white/10 space-y-6">
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest border-b border-white/10 pb-2">
                          Traveler Details ({passengers.length} of {passengerCount})
                        </h4>
                        
                        <div className="space-y-4">
                          {passengers.map((p, idx) => (
                            <div key={idx} className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-3 relative">
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-blue-400">Passenger #{idx + 1}</span>
                                {idx > 0 && (
                                  <button type="button" onClick={() => handleRemovePassenger(idx)} className="text-[10px] font-bold text-red-400 hover:text-red-300">
                                    Remove
                                  </button>
                                )}
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <Input
                                  label="Full Name"
                                  placeholder="As in ID"
                                  value={p.name}
                                  onChange={(e) => handlePassengerChange(idx, 'name', e.target.value)}
                                />
                                <Input
                                  label="Age"
                                  type="number"
                                  placeholder="Age"
                                  value={p.age}
                                  onChange={(e) => handlePassengerChange(idx, 'age', e.target.value)}
                                />
                                <Input
                                  label="Aadhaar / Gov ID (Optional)"
                                  placeholder="ID Number"
                                  value={p.identityNumber}
                                  onChange={(e) => handlePassengerChange(idx, 'identityNumber', e.target.value)}
                                />
                              </div>
                            </div>
                          ))}

                          {passengers.length < passengerCount && (
                            <button
                              type="button"
                              onClick={handleAddPassenger}
                              className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 cursor-pointer"
                            >
                              + Add Next Passenger
                            </button>
                          )}
                        </div>

                        {/* Contact info */}
                        <div className="border-t border-white/10 pt-4 space-y-4">
                          <h4 className="text-xs font-bold text-white uppercase tracking-widest">Contact Information</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                              label="Contact Email"
                              type="email"
                              placeholder="email@example.com"
                              value={contactEmail}
                              onChange={(e) => setContactEmail(e.target.value)}
                            />
                            <Input
                              label="Contact Phone"
                              placeholder="Mobile number"
                              value={contactPhone}
                              onChange={(e) => setContactPhone(e.target.value)}
                            />
                          </div>
                        </div>

                        {/* Estimate & Submit */}
                        <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-gray-500 uppercase font-bold">Estimated Cost</span>
                            <h3 className="text-xl font-black text-emerald-400">₹{(selectedCarrier.price * passengers.length).toLocaleString()}</h3>
                          </div>
                          <Button
                            variant="primary"
                            onClick={handleProceedToPayment}
                            className="bg-gradient-to-r from-blue-600 to-cyan-500 font-bold px-6"
                          >
                            Proceed to Payment
                          </Button>
                        </div>
                      </Card>
                    )}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Glassmorphic Razorpay-style Payment Gateway simulation Modal */}
          {showPaymentModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
              <Card className="w-full max-w-md p-6 bg-dark-900 border border-white/10 shadow-2xl relative">
                
                {paymentStep === 1 ? (
                  <div className="space-y-6">
                    <div className="text-center space-y-1">
                      <div className="text-[10px] uppercase font-bold tracking-widest text-blue-400">CARD Secured Checkout</div>
                      <h3 className="text-lg font-black text-white">Select Payment Mode</h3>
                      <div className="text-2xl font-black text-emerald-400">₹{(selectedCarrier?.price * passengers.length).toLocaleString()}</div>
                    </div>

                    {/* Method Selector */}
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setPaymentMethod('UPI')}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-bold ${paymentMethod === 'UPI' ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-white/5 text-gray-400'}`}
                      >
                        <QrCodeIcon className="w-5 h-5 text-blue-400" /> UPI / QR
                      </button>
                      <button
                        onClick={() => setPaymentMethod('Card')}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-bold ${paymentMethod === 'Card' ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-white/5 text-gray-400'}`}
                      >
                        <CreditCardIcon className="w-5 h-5 text-blue-400" /> Credit Card
                      </button>
                      <button
                        onClick={() => setPaymentMethod('NetBanking')}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-bold ${paymentMethod === 'NetBanking' ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-white/5 text-gray-400'}`}
                      >
                        <CpuChipIcon className="w-5 h-5 text-blue-400" /> NetBanking
                      </button>
                    </div>

                    {/* UPI Scan simulation */}
                    {paymentMethod === 'UPI' && (
                      <div className="p-4 bg-white/5 border border-white/5 rounded-2xl text-center space-y-3">
                        <div className="w-32 h-32 bg-white p-2 rounded-xl mx-auto flex items-center justify-center">
                          <img src="/logo.png" className="w-24 h-24 opacity-80" alt="QR Simulation" />
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold">Scan QR code using any UPI App (GPay, PhonePe, Paytm)</p>
                      </div>
                    )}

                    {/* Card inputs simulation */}
                    {paymentMethod === 'Card' && (
                      <div className="space-y-3">
                        <Input label="Cardholder Name" placeholder="e.g. Rahul Kumar" defaultValue={passengers[0]?.name} />
                        <Input label="Card Number" placeholder="1234 5678 9101 1121" />
                        <div className="grid grid-cols-2 gap-3">
                          <Input label="Expiry Date" placeholder="MM/YY" />
                          <Input label="CVV" type="password" placeholder="***" />
                        </div>
                      </div>
                    )}

                    {/* NetBanking option */}
                    {paymentMethod === 'NetBanking' && (
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase">Select Bank</label>
                        <select className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500">
                          <option value="SBI" className="bg-dark-900">State Bank of India (SBI)</option>
                          <option value="HDFC" className="bg-dark-900">HDFC Bank</option>
                          <option value="ICICI" className="bg-dark-900">ICICI Bank</option>
                          <option value="AXIS" className="bg-dark-900">Axis Bank</option>
                        </select>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex gap-3 justify-end border-t border-white/5 pt-4">
                      <Button variant="secondary" onClick={() => setShowPaymentModal(false)}>
                        Cancel
                      </Button>
                      <Button variant="primary" onClick={handleSimulatePayment} className="bg-emerald-600 hover:bg-emerald-500 font-bold px-5">
                        Pay Securely
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 space-y-6">
                    <div className="relative w-16 h-16 mx-auto">
                      <div className="absolute inset-0 rounded-full border-4 border-blue-500/20" />
                      <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-base font-bold text-white">Clearance Processing</h4>
                      <p className="text-xs text-gray-400 animate-pulse">{processingMessage}</p>
                    </div>
                  </div>
                )}

              </Card>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
