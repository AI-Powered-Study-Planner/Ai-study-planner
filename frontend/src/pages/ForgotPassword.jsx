import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Send, ArrowLeft } from 'lucide-react';
import { authAPI } from '../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { ok, data } = await authAPI.forgotPassword({ email });
      if (!ok) {
        console.warn('Forgot password failed', data);
      }
      navigate('/reset-password', { state: { email } });
    } catch (error) {
      console.warn('Forgot password request failed:', error);
      navigate('/reset-password', { state: { email } });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in zoom-in duration-500">
      <Link to="/login" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to login
      </Link>

      <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
      <p className="text-slate-400 text-sm mb-6">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="email"
            placeholder="Email address"
            className="input-field pl-10"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-primary flex justify-center items-center gap-2 mt-6" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Reset Link'}
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
