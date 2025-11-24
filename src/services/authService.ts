const AUTH_API_BASE_URL = process.env.NEXT_PUBLIC_AUTH_API_URL || 'http://localhost:3001/api';

export interface UserProfile {
  sub: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  preferred_username?: string;
  given_name?: string;
  family_name?: string;
  [key: string]: unknown;
}

export interface ProfileResponse {
  profile: UserProfile;
}

export interface MeResponse {
  user: UserProfile;
}

class AuthService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Get current user information
   */
  async getCurrentUser(): Promise<UserProfile | null> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return null;
      }

      const data: MeResponse = await response.json();
      return data.user;
    } catch (error) {
      console.error('Failed to get current user:', error);
      return null;
    }
  }

  /**
   * Get user profile details
   */
  async getUserProfile(): Promise<UserProfile | null> {
    try {
      const response = await fetch(`${this.baseUrl}/users/profile`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return null;
      }

      const data: ProfileResponse = await response.json();
      return data.profile;
    } catch (error) {
      console.error('Failed to get user profile:', error);
      return null;
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Logout failed:', error);
      return false;
    }
  }

  /**
   * Redirect to login page
   */
  redirectToLogin(): void {
    window.location.href = `${this.baseUrl}/auth/login`;
  }

  /**
   * Redirect to registration page
   */
  redirectToRegister(): void {
    window.location.href = `${this.baseUrl}/auth/register`;
  }
}

const authService = new AuthService(AUTH_API_BASE_URL);

export default authService;
