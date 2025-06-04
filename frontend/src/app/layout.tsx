import { Button } from "@/components/ui/button";
import { COOKIES, STORAGE } from "@/config/cookies";
import { PAGES } from "@/config/pages";
import Cookies from "js-cookie";
import { Fragment } from "react";
import { Outlet, useLoaderData } from "react-router";

type PrivatePages = (typeof PAGES)["PRIVATE"][keyof (typeof PAGES)["PRIVATE"]];
type PublicPages = (typeof PAGES)["PUBLIC"][keyof (typeof PAGES)["PUBLIC"]];
type Page = PublicPages | PrivatePages;

export default function Layout({
  authenticated: inheritedAuth,
}: {
  authenticated?: boolean;
}) {
  const { authenticated } = useLoaderData();
  const isAuthenticated = authenticated ?? inheritedAuth ?? false;

  const hideUserActions = (
    [PAGES.PUBLIC.LOGIN, PAGES.PUBLIC.SIGNUP] as string[]
  ).includes(window.location.pathname);

  const handleLogout = () => {
    Cookies.remove(COOKIES.JWT);
    window.localStorage.removeItem(STORAGE.USER);
    window.location.pathname = PAGES.PUBLIC.LANDING;
  };

  const navigate = (url: Page) => () => {
    window.location.pathname = url;
  };

  return (
    <div className="mx-auto flex min-h-screen w-screen max-w-screen-2xl flex-col p-2 font-family-[Gotham]">
      <div
        className={`relative flex w-full rounded-2xl bg-white-4 dark:bg-dark`}
      >
        &nbsp;
      </div>
      <div className="mt-2 flex w-full h-dvh flex-1 gap-2 rounded-2xl">
        <main className="h-180 w-full max-w-[900px] rounded-2xl bg-white-3 dark:bg-dark-2 p-0 mx-auto">
          <div className="fixed top-0 left-0 right-0 bg-sidebar flex items-center px-5 py-3 gap-3">
            <Button
              className="text-lg hover:no-underline text-white"
              variant="link"
              onClick={navigate(PAGES.PUBLIC.LANDING)}
            >
              Instructor
            </Button>
            {isAuthenticated ? (
              <Fragment>
                <Button
                  variant="secondary"
                  className="ml-auto"
                  onClick={navigate(PAGES.PRIVATE.DASHBOARD)}
                >
                  Dashboard
                </Button>
                <Button
                  variant="secondary"
                  onClick={navigate(PAGES.PRIVATE.SERVICES)}
                >
                  My Services
                </Button>
                <Button variant="destructive" onClick={handleLogout}>
                  Log out
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <Button
                  variant="secondary"
                  className="ml-auto"
                  onClick={navigate(PAGES.PUBLIC.SERVICES)}
                >
                  Explore
                </Button>
                {!hideUserActions && <Fragment><Button
                  variant="default"
                  onClick={navigate(PAGES.PUBLIC.LOGIN)}
                >
                  Sign In
                </Button>
                  <Button
                    variant="outline"
                    onClick={navigate(PAGES.PUBLIC.SIGNUP)}
                  >
                    Sign Up</Button></Fragment>}
              </Fragment>
            )}
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
