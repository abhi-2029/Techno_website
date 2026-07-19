/**
 * CARD Technocrats & Engineers LLP - Contact Page & Lead Submission Form
 * 
 * Google 15+ Years Senior Developer Architecture Notes:
 * 1. Pre-filling State Pattern:
 *    To increase lead conversion rates, when a client clicks "Apply Now" on any service card, 
 *    the router passes the service title as a `subject` parameter via either:
 *    - `location.state.subject` (for internal React Router navigation)
 *    - `location.search` (query parameters, e.g. `?subject=CPWD%20Registration` for external backlinks).
 *    We extract this dynamically using `URLSearchParams` and pre-populate the Hook Form.
 * 2. Form State Management (React Hook Form):
 *    Utilizes uncontrolled components registered to a schema-less validation context. 
 *    This avoids unnecessary re-renders that occur in traditional state-bound inputs.
 * 3. Mutation-Based Posting (React Query):
 *    Submits form data to the backend via `useCreateContact` mutation. 
 *    Handles load indicators (`isPending`) and reactive, toast feedback loops.
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useCreateContact } from '../hooks/useContacts';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

export default function Contact() {
  const location = useLocation();
  
  // Extract pre-filled subject from query params or route history state
  const searchParams = new URLSearchParams(location.search);
  const defaultSubject = searchParams.get('subject') || location.state?.subject || '';

  // Initialize React Hook Form with defaultValues
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      subject: defaultSubject,
    }
  });
  
  const createContactMutation = useCreateContact();

  // Submission callback routing clean form datasets to active mutation calls
  const onSubmit = (data) => {
    // Post parameters asynchronously to MongoDB Atlas via Node Express backend API
    createContactMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Your message has been sent successfully! Our team will get back to you shortly.');
        reset(); // Clear form fields upon successful database persistence
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || 'Failed to submit form. Please check your network and try again.');
      },
    });
  };

  // Structured Corporate Contact Coordinates
  const contactInfo = [
    {
      label: 'Office Address',
      value: '01, Ward No. 15, Sheohar, Post: Sheohar, Dist: Sheohar, Bihar - 843329',
      icon: MapPinIcon,
    },
    {
      label: 'Phone Call Support',
      value: '+91 7529993812 / +91 6222-796684',
      icon: PhoneIcon,
    },
    {
      label: 'Email Inbox',
      value: 'ctellp@gmail.com',
      icon: EnvelopeIcon,
    },
    {
      label: 'Working Hours',
      value: 'Monday - Saturday: 10:00 AM to 07:00 PM (IST)',
      icon: ClockIcon,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us | CARD Technocrats & Engineers LLP</title>
        <meta
          name="description"
          content="Get in touch with CARD Technocrats. Submit contact submissions, find our office address details in Sheohar, Bihar, email coordinates, phone, and Google Maps location."
        />
      </Helmet>

      <main className="bg-[#030712] text-white pt-28 pb-16 min-h-screen">
        <div className="container mx-auto px-4 space-y-16">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-sm font-semibold tracking-wider text-blue-500 uppercase">Get In Touch</h2>
            <h1 className="text-4xl md:text-5xl font-black">Contact Our Consultancy</h1>
            <p className="text-gray-400 text-sm">
              Have questions about CPWD registration, tender documents, or detailed project reports? File the contact form below or reach us directly via phone or WhatsApp.
            </p>
          </div>

          {/* Form + Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch max-w-6xl mx-auto">
            
            {/* Left: Contact Form Card */}
            <Card className="p-8 bg-white/5 border border-white/10 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-white mb-6">Send Us a Message</h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="Full Name"
                  id="name"
                  placeholder="John Doe"
                  error={errors.name?.message}
                  {...register('name', { required: 'Name is required' })}
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Email Address"
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    error={errors.email?.message}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                  <Input
                    label="Phone Number"
                    id="phone"
                    placeholder="+91 9876543210"
                    error={errors.phone?.message}
                    {...register('phone', { required: 'Phone number is required' })}
                  />
                </div>

                <Input
                  label="Subject"
                  id="subject"
                  placeholder="Inquiry about CPWD/PWD contractor registration"
                  error={errors.subject?.message}
                  {...register('subject', { required: 'Subject is required' })}
                />

                {/* Textarea message field */}
                <div className="space-y-1">
                  <label htmlFor="message" className="text-xs font-semibold text-gray-400">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about your requirements..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors duration-300 resize-none"
                    {...register('message', { required: 'Message is required' })}
                  />
                  {errors.message && (
                    <span className="text-[10px] text-red-500 font-bold">{errors.message.message}</span>
                  )}
                </div>

                {/* Submit button with React Query pending state mapping */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    loading={createContactMutation.isPending}
                    className="w-full justify-center py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold"
                  >
                    Submit Inquiry
                  </Button>
                </div>
              </form>
            </Card>

            {/* Right: Contact Information Grid & Map */}
            <div className="flex flex-col justify-between space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <Card key={index} className="p-6 bg-white/5 border border-white/10 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 flex-shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1.5">{info.label}</h4>
                        {info.label === 'Phone Call Support' ? (
                          <div className="text-sm text-white leading-relaxed font-semibold space-y-1">
                            <a href="tel:+917529993812" className="hover:text-blue-400 block transition-colors">+91 7529993812</a>
                            <a href="tel:+916222-796684" className="hover:text-blue-400 block transition-colors">+91 6222-796684</a>
                          </div>
                        ) : info.label === 'Email Inbox' ? (
                          <a href={`mailto:${info.value}`} className="text-sm text-white leading-relaxed font-semibold hover:text-blue-400 underline transition-colors">{info.value}</a>
                        ) : (
                          <p className="text-sm text-white leading-relaxed font-semibold">{info.value}</p>
                        )}

                        {info.label === 'Phone Call Support' && (
                          <div className="mt-3">
                            <a
                              href="tel:+917529993812"
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white font-bold text-[10px] uppercase border border-emerald-500/20 tracking-wider transition-all duration-300 cursor-pointer shadow-lg shadow-emerald-500/5"
                            >
                              📞 Click to Call Support
                            </a>
                          </div>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* Embed Google Maps showing Sheohar, Bihar district operational center */}
              <div className="rounded-3xl overflow-hidden border border-white/10 h-[300px] relative shadow-lg">
                <iframe
                  title="CARD Technocrats Sheohar Office Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14332.327599026402!2d85.28945281488583!3d26.264667232230105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed10bdc17b5f8f%3A0xc39ad61a5b81b29a!2sSheohar%2C%20Bihar%20843329!5e0!3m2!1sen!2sin!4v1703800000000!5m2!1sen!2sin"
                  className="w-full h-full border-none"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>

        </div>
      </main>
    </>
  );
}
