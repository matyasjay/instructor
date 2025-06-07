import { Fragment } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "@/components/context/auth";
import ErrorBoundary from "@/components/context/error";
import AlertButton from "@/components/feature/alert-button";
import { menu, PRIMARY_ROUTES } from "@/components/feature/menu";
import LoginForm from "@/components/form/login";
import SignupForm from "@/components/form/signup";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PAGES } from "@/config/pages";
import useLogout from "@/lib/hooks/useLogout";
import useUser from "@/lib/hooks/useUser";

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

export default function Layout({ children }: { children?: React.ReactNode }) {
  const navigate = useNavigate();
  const { authenticated } = useAuth();
  const user = useUser();
  const logout = useLogout();

  const handleNavigate = (path: string) => () => {
    navigate(path);
  };

  return (
    <ErrorBoundary>
      <div className="mx-auto flex min-h-screen w-screen max-w-screen-2xl flex-col font-family-[Gotham]">
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
                content={<LoginForm />}
                description="Fill in your credentials to log in to your account."
                className="ml-auto"
              />
              <AlertButton
                triggerVariant="outline"
                title="Sign Up"
                trigger="Sign Up"
                description="Fill in your details below to create a new account."
                content={<SignupForm />}
              />
            </Fragment>
          )}
        </nav>
        <div className="mt-[70px] flex w-full h-dvh flex-1 gap-2 rounded-2xl">
          <main className="w-full rounded-2xl bg-white-3 dark:bg-dark-2 p-0 mx-auto">
            <div className="max-w-[1400px] bg-accent mx-auto border-x-1 overflow-y-auto fixed top-[70px] left-0 right-0 bottom-0">
              <div className="flex flex-col gap-3.5 mx-auto align-middle min-h-full bg-gray-900">
                <div className="relative left-0 right-0 top-[70px] bottom-0 isolate px-6 lg:px-8">
                  <div
                    className="absolute inset-x-0 -top-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-20"
                    aria-hidden="true"
                  >
                    <div
                      className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#3b82f6] to-[#ffffff] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
                      style={{
                        clipPath:
                          "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                      }}
                    ></div>
                  </div>
                  <div
                    className="absolute inset-x-0 top-[calc(100%-20rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    aria-hidden="true"
                  >
                    <div
                      className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#3b82f6] to-[#ffffff] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
                      style={{
                        clipPath:
                          "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                      }}
                    ></div>
                  </div>
                </div>
                <div
                  className="fixed top-[70px] left-[50%] translate-x-[-50%] right-0 bottom-0 overflow-auto w-full max-w-[1400px] p-[30px]"
                  id="main_content"
                >
                  {children ?? <Outlet />}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}
