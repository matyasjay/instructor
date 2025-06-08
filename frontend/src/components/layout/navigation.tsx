import { Fragment } from "react";
import AlertButton from "@/components/feature/alert-button";
import FormLayout from "@/components/layout/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ENDPOINTS } from "@/config/endpoints";
import { PAGES } from "@/config/pages";
import { MUTATION_KEYS } from "@/config/query";
import { createUserForm, loginUserForm } from "@/lib/forms";
import useAppNavigation from "@/lib/hooks/useAppNavigation";
import useAuth from "@/lib/hooks/useAuth";
import useLogout from "@/lib/hooks/useLogout";
import useUser from "@/lib/hooks/useUser";

export default function Navigation() {
  const { authenticated } = useAuth();
  const user = useUser();
  const logout = useLogout();
  const { left, right, handleNavigate } = useAppNavigation();

  return (
    <nav className="h-[70px] fixed top-0 left-0 right-0 bg-sidebar flex items-center px-5 py-3 gap-3 max-w-[1400px] mx-auto border-x-1 z-50 shadow-md border-b-1">
      <Button
        className="text-lg hover:no-underline text-white cursor-pointer"
        variant="link"
        onClick={handleNavigate(PAGES.PUBLIC.LANDING)}
      >
        Instructor
      </Button>
      {authenticated ? (
        <Fragment>
          {left}
          <h3
            id="account-details"
            className="flex flex-col items-end ml-auto text-gray-400"
          >
            <span className="font-normal">{user.name}</span>
            <span className="text-gray-500 text-xs">{user.email}</span>
          </h3>
          <Separator orientation="vertical" />
          {right}
          <AlertButton
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
          <AlertButton
            title="Sign In"
            trigger="Sign In"
            content={
              <FormLayout
                mutationKey={MUTATION_KEYS.LOGIN}
                endpoint={ENDPOINTS.LOGIN}
                form={loginUserForm}
              />
            }
            description="Fill in your credentials to log in to your account."
            className="ml-auto"
          />
          <AlertButton
            triggerVariant="outline"
            title="Sign Up"
            trigger="Sign Up"
            description="Fill in your details below to create a new account."
            content={
              <FormLayout
                mutationKey={MUTATION_KEYS.SIGNUP}
                endpoint={ENDPOINTS.SIGNUP}
                form={createUserForm}
              />
            }
          />
        </Fragment>
      )}
    </nav>
  );
}
