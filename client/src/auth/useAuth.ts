import { useAuthContext } from './AuthProvider';

export const useAuth = () => {
  const { token, login, logout, isAuthenticated } = useAuthContext();
  return { token, login, logout, isAuthenticated };
};