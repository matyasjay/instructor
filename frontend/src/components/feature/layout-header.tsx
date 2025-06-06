import { Fragment } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/components/context/auth";
import ButtonWithPopup from "@/components/feature/button-with-popup";
import LoginForm from "@/components/form/login";
import NewServiceForm from "@/components/form/new-service";
import SignupForm from "@/components/form/signup";
import { Button } from "@/components/ui/button";
import { PAGES } from "@/config/pages";
import useLogout from "@/lib/hooks/useLogout";
import useUser from "@/lib/hooks/useUser";
import { Separator } from "../ui/separator";

export default function LayoutHeader() {
  const navigate = useNavigate();
  const { authenticated } = useAuth();
  const user = useUser();
  const logout = useLogout();

  return (
    <nav className="h-[70px] fixed top-0 left-0 right-0 bg-sidebar flex items-center px-5 py-3 gap-3 max-w-[1400px] mx-auto border-x-1 z-50 shadow-md border-b-1">
      <Button
        className="text-lg hover:no-underline text-white cursor-pointer"
        variant="link"
        onClick={() => navigate(PAGES.PUBLIC.LANDING)}
      >
        Instructor
      </Button>
      {authenticated ? (
        <Fragment>
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => navigate(PAGES.PRIVATE.SERVICE_OWN)}
          >
            My Services
          </Button>
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => navigate(PAGES.PRIVATE.SERVICE_ALL)}
          >
            Shared Services
          </Button>
          <ButtonWithPopup
            title="Create New Service"
            trigger="New Service"
            content={<NewServiceForm />}
            className="ml-3"
            description="Fill in the details below then submit to create a new service."
          />
          <h3 className="flex flex-col items-end ml-auto text-gray-400">
            <span className="font-normal">{user.name}</span>
            <span className="text-gray-500 text-xs">{user.email}</span>
          </h3>
          <Separator orientation="vertical" />
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => navigate(PAGES.PRIVATE.ACCOUNT)}
          >
            Account
          </Button>
          <ButtonWithPopup
            title="Do you wish to sign out?"
            trigger="Log out"
            description="This action will sign you out from our systems and prevent accessing your data from our servers."
            triggerVariant="outline"
            dismiss="split"
            confirm="Confirm"
            onConfirm={logout}
            confirmVariant="destructive"
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
            triggerVariant="outline"
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
