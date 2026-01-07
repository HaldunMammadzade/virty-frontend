import { NextResponse } from 'next/server';
import axios from 'axios';

const EXTERNAL_API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * POST /api/auth/logout
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

    // Get authorization header from request
    const authHeader = request.headers.get('authorization');

    const headers = {
      'Content-Type': 'application/json',
    };

    if (authHeader) {
      headers['Authorization'] = authHeader;
    }

    const response = await axios.post(
      `${EXTERNAL_API_URL}/api/auth/logout`,
      {},
      { headers }
    );

    // Handle empty response
    if (response.status === 200 && (!response.data || Object.keys(response.data).length === 0)) {
      return new NextResponse(null, { status: 200 });
    }

    return NextResponse.json(response.data || {});
  } catch (error) {
    console.error('Logout proxy error:', error);
    
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

