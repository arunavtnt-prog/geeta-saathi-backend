/**
 * Authentication Service
 * Handles OTP generation and verification
 */

import { randomInt } from 'crypto';

// In production, this would integrate with:
// - Supabase Auth for phone OTP
// - Twilio for SMS delivery
// - Redis for OTP caching and rate limiting

interface SendOTPResult {
  success: boolean;
  otp?: string; // Only in development
  expiresAt?: Date;
}

interface VerifyOTPResult {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    phone: string;
    isNewUser: boolean;
  };
}

/**
 * Generate a 6-digit OTP
 */
function generateOTP(): string {
  return randomInt(100000, 999999).toString();
}

/**
 * Send OTP to phone number
 * @param phone - Phone number in format +91XXXXXXXXXX
 * @returns OTP result (with OTP only in dev mode)
 */
export async function sendOTP(phone: string): Promise<SendOTPResult> {
  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // In development, return the OTP for testing
  if (process.env.NODE_ENV === 'development') {
    console.log(`[DEV MODE] OTP for ${phone}: ${otp}`);
    return {
      success: true,
      otp,
      expiresAt,
    };
  }

  // Production: Integrate with Twilio
  // TODO: Implement actual SMS sending
  // const twilio = require('twilio');
  // const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  // await client.messages.create({
  //   body: `Your Geeta Saathi verification code is: ${otp}`,
  //   from: process.env.TWILIO_PHONE_NUMBER,
  //   to: phone,
  // });

  // For now, store in Redis (TODO)
  // await redis.setex(`otp:${phone}`, 600, otp);

  return {
    success: true,
    expiresAt,
  };
}

/**
 * Verify OTP code
 * @param phone - Phone number
 * @param otp - OTP code to verify
 * @returns Verification result with token and user data
 */
export async function verifyOTP(phone: string, otp: string): Promise<VerifyOTPResult> {
  // In development, accept any 6-digit OTP
  if (process.env.NODE_ENV === 'development') {
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      return { success: false };
    }
  }

  // Production: Verify against stored OTP
  // const storedOTP = await redis.get(`otp:${phone}`);
  // if (storedOTP !== otp) {
  //   return { success: false };
  // }

  // Check if user exists (TODO: Query database)
  const isNewUser = false; // TODO: Implement

  // Generate JWT token (TODO: Use Supabase JWT)
  const token = Buffer.from(`${phone}:${Date.now()}`).toString('base64');

  return {
    success: true,
    token,
    user: {
      id: 'user_' + Date.now(),
      phone,
      isNewUser,
    },
  };
}

/**
 * Verify JWT token
 * @param token - JWT token
 * @returns Decoded user data or null
 */
export async function verifyToken(token: string) {
  // TODO: Implement JWT verification with Supabase
  // For now, just decode the base64 token
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [phone] = decoded.split(':');

    if (!phone || !phone.startsWith('+91')) {
      return null;
    }

    return { phone };
  } catch {
    return null;
  }
}
