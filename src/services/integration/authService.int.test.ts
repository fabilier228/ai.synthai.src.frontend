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
});
