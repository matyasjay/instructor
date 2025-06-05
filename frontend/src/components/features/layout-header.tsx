import Cookies from "js-cookie";
import { Fragment } from "react";
import { useNavigate } from "react-router";
import NewServiceForm from "../forms/new-service";
import ButtonWithPopup from "@/components/features/button-with-popup";
import LoginForm from "@/components/forms/login";
import SignupForm from "@/components/forms/signup";
import { AlertDialogAction } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { COOKIES, STORAGE } from "@/config/cookies";
import { PAGES } from "@/config/pages";
import { useAuth } from "@/lib/hooks/useAuth";

export default function LayoutHeader() {
  const navigate = useNavigate();
  const authenticated = useAuth();

  const handleLogout = () => {
    Cookies.remove(COOKIES.JWT);
    window.localStorage.removeItem(STORAGE.USER);
    window.location.pathname = PAGES.PUBLIC.LANDING;
  };

  return (
    <nav className="h-[70px] fixed top-0 left-0 right-0 bg-sidebar flex items-center px-5 py-3 gap-3 max-w-[1400px] mx-auto border-x-1 shadow-md z-50">
      <Button
        className="text-lg hover:no-underline text-white cursor-pointer"
        variant="link"
        onClick={() => navigate(PAGES.PUBLIC.LANDING)}
      >
        Instructor
      </Button>
      {authenticated ? (
        <Fragment>
          <ButtonWithPopup
            title="Create New Service"
            trigger="New Service"
            content={<NewServiceForm />}
            className="ml-auto"
          />
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => navigate(PAGES.PRIVATE.SERVICE_OWN)}
          >
            Own Services
          </Button>
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => navigate(PAGES.PRIVATE.SERVICE_ALL)}
          >
            All Services
          </Button>
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => navigate(PAGES.PRIVATE.DASHBOARD)}
          >
            Dashboard
          </Button>
          <ButtonWithPopup
            title="Do you wish to sign out?"
            trigger="Log out"
            description="This action will sign you out from our systems and prevent accessing your data from our servers."
            variant="outline"
            content={
              <AlertDialogAction
                onClick={handleLogout}
                className="bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 cursor-pointer"
              >
                Confirm
              </AlertDialogAction>
            }
          />
        </Fragment>
      ) : (
        <Fragment>
          <ButtonWithPopup
            title="Sign In"
            trigger="Sign In"
            content={<LoginForm />}
            className="ml-auto"
          />
          <ButtonWithPopup
            variant="outline"
            title="Sign Up"
            trigger="Sign Up"
            content={<SignupForm />}
          />
        </Fragment>
      )}
    </nav>
  );
}
