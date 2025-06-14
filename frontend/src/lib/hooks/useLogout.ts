import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import { COOKIES, STORAGE } from '@/lib/cookies';
import useAuth from '@/lib/hooks/useAuth';
import { PAGES } from '@/lib/pages';

export default function useLogout() {
  const navigate = useNavigate();
  const { setAuthenticated } = useAuth();

  function handleLogout() {
    Cookies.remove(COOKIES.JWT);
    window.localStorage.removeItem(STORAGE.USER);
    setAuthenticated(false);
    navigate(PAGES.PUBLIC.LANDING);
  }

  return handleLogout;
}
