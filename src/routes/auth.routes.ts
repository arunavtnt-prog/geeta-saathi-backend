/**
 * Authentication Routes
 * Phone OTP-based authentication using Supabase Auth
 */

import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { sendOTP, verifyOTP } from '../services/auth.service.js';

const router = Router();

/**
 * @route   POST /api/auth/send-otp
 * @desc    Send OTP to user's phone number
 * @access  Public
 */
router.post(
  '/send-otp',
  asyncHandler(async (req, res, next) => {
    const { phone } = req.body;

    // Validate phone number
    if (!phone || !/^\+91\d{10}$/.test(phone)) {
      return res.status(400).json({
        error: {
          message: 'Invalid phone number. Must be in format +91XXXXXXXXXX',
        },
      });
    }

    const result = await sendOTP(phone);

    res.status(200).json({
      message: 'OTP sent successfully',
      // Don't reveal actual OTP in production
      ...(process.env.NODE_ENV === 'development' && { devOTP: result.otp }),
    });
  })
);

/**
 * @route   POST /api/auth/verify-otp
 * @desc    Verify OTP and return auth token
 * @access  Public
 */
router.post(
  '/verify-otp',
  asyncHandler(async (req, res, next) => {
    const { phone, otp } = req.body;

    // Validate input
    if (!phone || !otp) {
      return res.status(400).json({
        error: {
          message: 'Phone number and OTP are required',
        },
      });
    }

    // Verify OTP (accept any 6-digit code in development)
    const result = await verifyOTP(phone, otp);

    if (!result.success) {
      return res.status(401).json({
        error: {
          message: 'Invalid or expired OTP',
        },
      });
    }

    res.status(200).json({
      message: 'Login successful',
      token: result.token,
      user: result.user,
    });
  })
);

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh access token
 * @access  Public
 */
router.post(
  '/refresh',
  asyncHandler(async (req, res, next) => {
    // TODO: Implement token refresh logic
    // For now, return success
    res.status(200).json({
      message: 'Token refreshed',
      token: req.body.token,
    });
  })
);

export default router;
