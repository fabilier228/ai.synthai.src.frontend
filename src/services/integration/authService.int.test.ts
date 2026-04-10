import authService from '../authService';

describe('authService integration-like tests', () => {
  const originalFetch = global.fetch;
  const originalLocation = window.location;

  beforeEach(() => {
    global.fetch = jest.fn();

    delete (window as unknown as { location?: Location }).location;
    (window as unknown as { location: { href: string } }).location = {
      href: '',
    };
  });

  afterEach(() => {
    global.fetch = originalFetch;
    window.location = originalLocation;
    jest.clearAllMocks();
  });

  test('should return current user when API returns success', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ user: { sub: 'u-1', preferred_username: 'john' } }),
    });

    const user = await authService.getCurrentUser();

    expect(user).toEqual({ sub: 'u-1', preferred_username: 'john' });
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/auth/me'),
      expect.objectContaining({ method: 'GET', credentials: 'include' })
    );
  });

  test('should return null when getCurrentUser API responds with non-OK', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });

    const user = await authService.getCurrentUser();

    expect(user).toBeNull();
  });

  test('should return null when getCurrentUser throws network error', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('network error'));

    const user = await authService.getCurrentUser();

    expect(user).toBeNull();
  });

  test('should return user profile when API returns success', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ profile: { sub: 'u-2', email: 'john@example.com' } }),
    });

    const profile = await authService.getUserProfile();

    expect(profile).toEqual({ sub: 'u-2', email: 'john@example.com' });
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/users/profile'),
      expect.objectContaining({ method: 'GET', credentials: 'include' })
    );
  });

  test('should return null when profile API fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });

    const profile = await authService.getUserProfile();

    expect(profile).toBeNull();
  });

  test('should return false when logout API fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });

    const result = await authService.logout();

    expect(result).toBe(false);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/auth/logout'),
      expect.objectContaining({ method: 'POST', credentials: 'include' })
    );
  });

  test('should redirect browser to login endpoint', () => {
    authService.redirectToLogin();

    expect(window.location.href).toContain('/auth/login');
  });

  test('should redirect browser to register endpoint', () => {
    authService.redirectToRegister();

    expect(window.location.href).toContain('/auth/register');
  });

  test('should redirect browser to change email endpoint', () => {
    authService.redirectToChangeEmail();

    expect(window.location.href).toContain('/auth/account/email');
  });

  test('should redirect browser to change password endpoint', () => {
    authService.redirectToChangePassword();

    expect(window.location.href).toContain('/auth/account/password');
  });
});
