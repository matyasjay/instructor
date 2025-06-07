import { Outlet } from "react-router";
import ErrorBoundary from "@/components/context/error";
import Backdrop from "@/components/layout/backdrop";
import Navigation from "@/components/layout/navigation";

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <div className="mx-auto flex min-h-screen w-screen max-w-screen-2xl flex-col font-family-[Gotham]">
        <div className="mt-[70px] flex w-full h-dvh flex-1 gap-2 rounded-2xl">
          <Navigation />
          <main className="w-full rounded-2xl bg-white-3 dark:bg-dark-2 p-0 mx-auto">
            <div className="max-w-[1400px] bg-accent mx-auto border-x-1 overflow-y-auto fixed top-[70px] left-0 right-0 bottom-0">
              <div className="flex flex-col gap-3.5 mx-auto align-middle min-h-full bg-gray-900">
                <Backdrop />
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
