import { NextResponse } from 'next/server';
import axios from 'axios';

const EXTERNAL_API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * POST /api/auth/verify-email
 * Proxy to external API to avoid CORS issues
 */
export async function POST(request) {
  try {
    if (!EXTERNAL_API_URL) {
      return NextResponse.json(
        { detail: 'API URL is not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    
    // Get authorization header from request
    const authHeader = request.headers.get('authorization');

    const headers = {
      'Content-Type': 'application/json',
    };

    if (authHeader) {
      headers['Authorization'] = authHeader;
    }

    const response = await axios.post(
      `${EXTERNAL_API_URL}/api/auth/verify-email`,
      body,
      { headers }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Verify email proxy error:', error);
    
    if (error.response) {
      return NextResponse.json(
        error.response.data || { detail: error.message },
        { status: error.response.status }
      );
    }
    
    return NextResponse.json(
      { detail: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

