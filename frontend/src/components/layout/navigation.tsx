import { Fragment } from "react";
import { useNavigate } from "react-router";
import z from "zod";
import { useAuth } from "@/components/context/auth";
import AlertButton from "@/components/feature/alert-button";
import { Separator } from "@/components/ui/separator";
import { ENDPOINTS } from "@/config/endpoints";
import { menu, PRIMARY_ROUTES } from "@/config/menu";
import { PAGES } from "@/config/pages";
import { MUTATION_KEYS } from "@/config/query";
import { FormLayout } from "@/lib/hooks/useForm";
import useLogout from "@/lib/hooks/useLogout";
import useUser from "@/lib/hooks/useUser";
import { Button } from "../ui/button";

function getPageOrder(page: Nullable<string>) {
  return +(page?.split("#")[0] ?? 0);
}

function getNavigationItems(
  pages: { id?: string; path: string }[],
  handleNavigate: (path: string) => () => void,
) {
  return pages
    ?.sort((a, b) => {
      const orderA = getPageOrder(a.id);
      const orderB = getPageOrder(b.id);
      return orderA - orderB;
    })
    .map((page) => {
      return (
        <Button
          variant={
            PRIMARY_ROUTES.includes(page.id?.split("#")[0] ?? "")
              ? "default"
              : "ghost"
          }
          className="cursor-pointer"
          onClick={handleNavigate(page.path)}
          key={page.id}
        >
          {page.id?.split("#")[1]}
        </Button>
      );
    });
}

const left = menu?.filter(({ id }) => !!id && getPageOrder(id) > 0) ?? [];
const right = menu?.filter(({ id }) => !!id && getPageOrder(id) < 0) ?? [];

export default function Navigation() {
  const navigate = useNavigate();
  const { authenticated } = useAuth();
  const user = useUser();
  const logout = useLogout();

  const handleNavigate = (path: string) => () => {
    navigate(path);
  };

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
          {getNavigationItems(left, handleNavigate)}
          <h3 className="flex flex-col items-end ml-auto text-gray-400">
            <span className="font-normal">{user.name}</span>
            <span className="text-gray-500 text-xs">{user.email}</span>
          </h3>
          <Separator orientation="vertical" />
          {getNavigationItems(right, handleNavigate)}
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
                schema={z.object({
                  email: z.string().email(),
                  password: z.string().min(8),
                })}
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
                schema={z.object({
                  email: z.string().email(),
                  name: z.string().min(5).max(30),
                  password: z.string().min(8),
                  password_confirm: z.string().min(8),
                })}
              />
            }
          />
        </Fragment>
      )}
    </nav>
  );
}
