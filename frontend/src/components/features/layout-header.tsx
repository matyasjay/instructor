import { Fragment } from "react";
import { useNavigate } from "react-router";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import Cookies from "js-cookie";
import { useAuth } from "@/app/context";
import ButtonWithPopup from "@/components/features/button-with-popup";
import LoginForm from "@/components/forms/login";
import SignupForm from "@/components/forms/signup";
import { Button } from "@/components/ui/button";
import { COOKIES, STORAGE } from "@/config/cookies";
import { PAGES } from "@/config/pages";
import NewServiceForm from "../forms/new-service";

function performLogout() {
  Cookies.remove(COOKIES.JWT);
  window.localStorage.removeItem(STORAGE.USER);
}

export default function LayoutHeader() {
  const navigate = useNavigate();
  const { authenticated, setAuthenticated } = useAuth();

  const handleLogout = () => {
    performLogout();
    setAuthenticated(false);
    navigate(PAGES.PUBLIC.LANDING);
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
            description="Fill in the details below then submit to create a new service."
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
              <AlertDialogAction onClick={handleLogout}>
                <Button variant="destructive" className="w-[300px] cursor-pointer">
                  Confirm
                </Button>
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
            description="Fill in your credentials to log in to your account."
            className="ml-auto"
          />
          <ButtonWithPopup
            variant="outline"
            title="Sign Up"
            trigger="Sign Up"
            description="Fill in your details below to create a new account."
            content={<SignupForm />}
          />
        </Fragment>
      )}
    </nav>
  );
}
