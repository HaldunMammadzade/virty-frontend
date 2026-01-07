/**
 * API Service Layer
 * Centralized API client for making HTTP requests to Swagger API
 */

import axios from 'axios';

// Use Next.js API routes as proxy to avoid CORS issues
const API_BASE_URL = '/api';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  /**
   * Get stored tokens from localStorage
   */
  getTokens() {
    if (typeof window === 'undefined') return null;
    
    try {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      const accessTokenExpiresAt = localStorage.getItem('accessTokenExpiresAt');
      const refreshTokenExpiresAt = localStorage.getItem('refreshTokenExpiresAt');
      const userId = localStorage.getItem('userId');

      return {
        accessToken,
        refreshToken,
        accessTokenExpiresAt,
        refreshTokenExpiresAt,
        userId,
      };
    } catch (error) {
      console.error('Error getting tokens:', error);
      return null;
    }
  }

  /**
   * Store tokens in localStorage
   */
  setTokens(tokens) {
    if (typeof window === 'undefined') return;

    try {
      if (tokens.accessToken) {
        localStorage.setItem('accessToken', tokens.accessToken);
      }
      if (tokens.refreshToken) {
        localStorage.setItem('refreshToken', tokens.refreshToken);
      }
      if (tokens.accessTokenExpiresAt) {
        localStorage.setItem('accessTokenExpiresAt', tokens.accessTokenExpiresAt);
      }
      if (tokens.refreshTokenExpiresAt) {
        localStorage.setItem('refreshTokenExpiresAt', tokens.refreshTokenExpiresAt);
      }
      if (tokens.userId) {
        localStorage.setItem('userId', tokens.userId);
      }
    } catch (error) {
      console.error('Error setting tokens:', error);
    }
  }

  /**
   * Clear all tokens from localStorage
   */
  clearTokens() {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessTokenExpiresAt');
      localStorage.removeItem('refreshTokenExpiresAt');
      localStorage.removeItem('userId');
    } catch (error) {
      console.error('Error clearing tokens:', error);
    }
  }

  /**
   * Check if access token is expired
   */
  isAccessTokenExpired() {
    if (typeof window === 'undefined') return true;

    try {
      const expiresAt = localStorage.getItem('accessTokenExpiresAt');
      if (!expiresAt) return true;

      const expirationDate = new Date(expiresAt);
      return expirationDate <= new Date();
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  }

  /**
   * Refresh access token if expired
   */
  async refreshAccessTokenIfNeeded() {
    if (this.isAccessTokenExpired()) {
      const tokens = this.getTokens();
      if (tokens?.refreshToken && tokens?.userId) {
        try {
          const response = await this.refresh({
            userId: tokens.userId,
            refreshToken: tokens.refreshToken,
          });
          this.setTokens(response);
          return response.accessToken;
        } catch (error) {
          console.error('Failed to refresh token:', error);
          this.clearTokens();
          throw error;
        }
      }
    }
    return this.getTokens()?.accessToken;
  }

  /**
   * Generic request method
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    // Ensure we have a valid access token
    let accessToken = this.getTokens()?.accessToken;
    
    // Try to refresh token if expired (only for authenticated requests)
    if (accessToken && this.isAccessTokenExpired()) {
      try {
        accessToken = await this.refreshAccessTokenIfNeeded();
      } catch (error) {
        // If refresh fails, continue without token (might be a public endpoint)
      }
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    try {
      // Parse body if it's a string, otherwise use as is
      let data = undefined;
      if (options.body) {
        data = typeof options.body === 'string' ? JSON.parse(options.body) : options.body;
      }

      const response = await axios({
        url,
        method: options.method || 'GET',
        headers: config.headers,
        data,
      });

      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      
      // Handle axios error response
      if (error.response) {
        const data = error.response.data || {};
        const status = error.response.status;
        
        // If it's a 401 and we have a refresh token, try to refresh
        if (status === 401 && this.getTokens()?.refreshToken) {
          try {
            const newToken = await this.refreshAccessTokenIfNeeded();
            if (newToken) {
              // Retry the original request with new token
              config.headers.Authorization = `Bearer ${newToken}`;
              let retryData = undefined;
              if (options.body) {
                retryData = typeof options.body === 'string' ? JSON.parse(options.body) : options.body;
              }
              const retryResponse = await axios({
                url,
                method: options.method || 'GET',
                headers: config.headers,
                data: retryData,
              });
              return retryResponse.data;
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            this.clearTokens();
          }
        }
        
        const apiError = new Error(data.detail || data.title || data.message || 'An error occurred');
        apiError.status = status;
        apiError.data = data;
        throw apiError;
      }
      
      throw error;
    }
  }

  /**
   * POST /api/auth/register
   * Register a new user
   * @param {Object} registerData - Registration data
   * @param {string} registerData.userName - User name
   * @param {string} registerData.city - City
   * @param {string} registerData.countryCode - Country code
   * @param {string} registerData.number - Phone number
   * @param {string} registerData.email - Email address
   * @param {string} registerData.password - Password
   * @param {string} registerData.repeatPassword - Repeat password
   * @param {boolean} registerData.hasAcceptedTerms - Terms acceptance
   * @param {string} registerData.recaptchaToken - reCAPTCHA token
   * @returns {Promise<{id: string}>} User ID
   */
  async register(registerData) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(registerData),
    });
    
    // Store userId from response
    if (response.id) {
      this.setTokens({ userId: response.id });
    }
    
    return response;
  }

  /**
   * POST /api/auth/login
   * Login with email and password
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.email - Email address
   * @param {string} credentials.password - Password
   * @returns {Promise<{accessToken: string, accessTokenExpiresAt: string, refreshToken: string, refreshTokenExpiresAt: string}>}
   */
  async login(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    // Store tokens
    this.setTokens(response);
    
    return response;
  }

  /**
   * POST /api/auth/verify-email
   * Verify email with OTP code
   * @param {Object} verifyData - Verification data
   * @param {string} verifyData.email - Email address
   * @param {string} verifyData.otpCode - OTP code
   * @returns {Promise<{accessToken: string, accessTokenExpiresAt: string, refreshToken: string, refreshTokenExpiresAt: string}>}
   */
  async verifyEmail(verifyData) {
    const response = await this.request('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify(verifyData),
    });
    
    // Store tokens
    this.setTokens(response);
    
    return response;
  }

  /**
   * POST /api/auth/refresh
   * Refresh access token
   * @param {Object} refreshData - Refresh token data
   * @param {string} refreshData.userId - User ID (UUID)
   * @param {string} refreshData.refreshToken - Refresh token
   * @returns {Promise<{accessToken: string, accessTokenExpiresAt: string, refreshToken: string, refreshTokenExpiresAt: string}>}
   */
  async refresh(refreshData) {
    const response = await this.request('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify(refreshData),
    });
    
    // Update stored tokens
    this.setTokens(response);
    
    return response;
  }

  /**
   * POST /api/auth/logout
   * Logout user
   * @returns {Promise<void>}
   */
  async logout() {
    try {
      await this.request('/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear tokens regardless of API response
      this.clearTokens();
    }
  }

  /**
   * POST /api/auth/resend-otp
   * Resend OTP code to email
   * @param {Object} resendData - Resend OTP data
   * @param {string} resendData.email - Email address
   * @returns {Promise<{message: string}>}
   */
  async resendOTP(resendData) {
    const response = await this.request('/auth/resend-otp', {
      method: 'POST',
      body: JSON.stringify(resendData),
    });
    
    return response;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export convenience functions
export const auth = {
  register: (registerData) => apiClient.register(registerData),
  login: (credentials) => apiClient.login(credentials),
  verifyEmail: (verifyData) => apiClient.verifyEmail(verifyData),
  resendOTP: (resendData) => apiClient.resendOTP(resendData),
  logout: () => apiClient.logout(),
};

// Export token management utilities
export const tokenManager = {
  getTokens: () => apiClient.getTokens(),
  setTokens: (tokens) => apiClient.setTokens(tokens),
  clearTokens: () => apiClient.clearTokens(),
  isAccessTokenExpired: () => apiClient.isAccessTokenExpired(),
};

export default apiClient;
