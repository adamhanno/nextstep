import React, { useState } from 'react';
import './OtpVerification.css';
import { useAuth } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OtpVerification() {
  const [otp, setOtp] = useState('');
  const { verifyOtp, reSendOtp } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setOtp(e.target.value);
  };

  const handleResend = async () => {
    const loadingToastId = toast.loading('Resending...')
   try {
    await reSendOtp()
    toast.update(loadingToastId, {
      render: 'Resent successful!',
      type: 'success',
      isLoading: false,
      autoClose: 2000,
    })
   } catch (error) {
    toast.update(loadingToastId, {
      render: error.message || 'Failed to resent OTP.',
      type: 'error',
      isLoading: false,
      autoClose: 3000,
    });
   }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToastId = toast.loading('Verifying...'); // No need to pass a custom ID unless necessary

    try {
      const userVerified = await verifyOtp(otp);

      if (userVerified) {
        toast.update(loadingToastId, {
          render: 'Verification successful!',
          type: 'success',
          isLoading: false,
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate('/onboarding');
        }, 1500);
      } else {
        throw new Error('Invalid OTP. Please try again.');
      }
    } catch (err) {
      toast.update(loadingToastId, {
        render: err.message || 'Failed to verify OTP. Please try again.',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="otp-container">
      <ToastContainer />
      <div className="otp-card">
        <h1 className="otp-title">OTP Verification</h1>
        <p className="otp-description">Enter the 6-digit code sent to your email or phone.</p>
        <form onSubmit={handleSubmit} className="otp-form">
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={handleInputChange}
            placeholder="Enter OTP"
            className="otp-input"
            required
          />
          <button type="submit" className="otp-submit">Verify OTP</button>
        </form>
        <div className="otp-resend">
          <button onClick={handleResend} className="otp-resend-btn">Resend OTP</button>
        </div>
      </div>
    </div>
  );
}

export default OtpVerification;
