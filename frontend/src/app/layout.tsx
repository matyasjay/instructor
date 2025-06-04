import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { COOKIES, STORAGE } from "@/config/cookies";
import { PAGES } from "@/config/pages";
import Cookies from "js-cookie";
import { Fragment } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router";

export default function Layout({
  authenticated: inheritedAuth,
  children,
}: {
  authenticated?: boolean;
  children?: React.ReactNode;
}) {
  const { authenticated } = useLoaderData() ?? {};
  const isAuthenticated = authenticated ?? inheritedAuth ?? false;
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove(COOKIES.JWT);
    window.localStorage.removeItem(STORAGE.USER);
    window.location.pathname = PAGES.PUBLIC.LANDING;
  };

  return (
    <div className="mx-auto flex min-h-screen w-screen max-w-screen-2xl flex-col p-2 font-family-[Gotham]">
      <div
        className={`relative flex w-full rounded-2xl bg-white-4 dark:bg-dark`}
      >
        &nbsp;
      </div>
      <div className="mt-2 flex w-full h-dvh flex-1 gap-2 rounded-2xl">
        <main className="w-full rounded-2xl bg-white-3 dark:bg-dark-2 p-0 mx-auto">
          <div className="h-[70px] fixed top-0 left-0 right-0 bg-sidebar flex items-center px-5 py-3 gap-3 max-w-[1400px] mx-auto border-x-1">
            <Button
              className="text-lg hover:no-underline text-white"
              variant="link"
              onClick={() => navigate(PAGES.PUBLIC.LANDING)}
            >
              Instructor
            </Button>
            {isAuthenticated ? (
              <Fragment>
                <Button
                  variant="default"
                  className="ml-auto"
                  onClick={() => navigate(PAGES.PRIVATE.SERVICE_NEW)}
                >
                  New Service
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => navigate(PAGES.PRIVATE.DASHBOARD)}
                >
                  Dashboard
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => navigate(PAGES.PRIVATE.SERVICE_OWN)}
                >
                  Own Services
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => navigate(PAGES.PRIVATE.SERVICE_ALL)}
                >
                  All Services
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">Log out</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Do you wish to sign out?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action will sign you out from our systems and
                        prevent accessing your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleLogout}
                        className="bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60"
                      >
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </Fragment>
            ) : (
              <Fragment>
                <Button
                  variant="default"
                  onClick={() => navigate(PAGES.PUBLIC.LOGIN)}
                  className="ml-auto"
                >
                  Sign In
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate(PAGES.PUBLIC.SIGNUP)}
                >
                  Sign Up
                </Button>
              </Fragment>
            )}
          </div>
          <div className="max-w-[1400px] bg-accent mx-auto border-x-1 overflow-y-auto fixed top-[70px] left-0 right-0 bottom-0">
            <div className="flex flex-col gap-3.5 mx-auto align-middle min-h-full bg-gray-900">
              <div className="relative isolate px-6 lg:px-8">
                <div
                  className="absolute inset-x-0 -top-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-20"
                  aria-hidden="true"
                >
                  <div
                    className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
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
                    className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
                    style={{
                      clipPath:
                        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                  ></div>
                </div>
              </div>
              <div className="relative">{children ?? <Outlet />}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
