// Simple auth utility for admin access
const ADMIN_EMAILS = ['ahnaf.asad1413@gmail.com', 'talhajubaer3121@gmail.com'];

export const isAdminEmail = (email: string): boolean => {
  return ADMIN_EMAILS.includes(email.toLowerCase());
};

export const getStoredAdminEmail = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('adminEmail');
};

export const storeAdminEmail = (email: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('adminEmail', email);
  }
};

export const clearAdminAuth = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminEmail');
  }
};

export const isAdminAuthenticated = (): boolean => {
  const email = getStoredAdminEmail();
  return email ? isAdminEmail(email) : false;
};
