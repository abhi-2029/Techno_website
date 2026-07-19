/**
 * CARD Technocrats & Engineers LLP - Admin Portal Component
 * 
 * Senior Developer Notes:
 * - Governs dashboard controls, document tables, or lead lists.
 * - Requires authorization validation and state handling.
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  // Register form validator schemas and state fields
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { login } = useAuth();
  // Instantiates navigation controller for program routing
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  // Submission callback routing clean form datasets to active mutation calls
  const onSubmit = async (data) => {
    try {
      await login(data);
      toast.success('Successfully logged in to Admin Panel!');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please check your admin credentials.');
    }
  };

  return (
    <main className="min-h-screen bg-[#030712] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        {/* Glow decoration */}
        <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

        <Card className="p-8 bg-white/5 border border-white/10 backdrop-blur-xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            {/* Logo placeholder */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center mx-auto text-xl font-black shadow-lg">
              C
            </div>
            <h1 className="text-2xl font-bold">Admin Portal</h1>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-black">
              CARD Technocrats
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email Address"
              id="email"
              type="email"
              placeholder="admin@cardtechno.com"
              error={errors.email?.message}
              {...register('email', { required: 'Email is required' })}
            />
            
            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password', { required: 'Password is required' })}
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                loading={isSubmitting}
                className="w-full justify-center py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold"
              >
                Log In
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </main>
  );
}
