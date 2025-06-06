import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { useAuth } from "@/components/context/auth";
import { COOKIES, STORAGE } from "@/config/cookies";
import { PAGES } from "@/config/pages";

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
