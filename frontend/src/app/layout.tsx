import LayoutHeader from "@/components/features/layout-header";
import { Outlet } from "react-router";

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-screen max-w-screen-2xl flex-col p-2 font-family-[Gotham]">
      <div
        className={`relative flex w-full rounded-2xl bg-white-4 dark:bg-dark`}
      >
        &nbsp;
      </div>
      <LayoutHeader />
      <div className="mt-2 flex w-full h-dvh flex-1 gap-2 rounded-2xl">
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
                className="fixed top-[70px] left-[50%] translate-x-[-50%] right-0 bottom-0 overflow-auto w-full max-w-[1400px] pb-[30px]"
                id="main_content"
              >
                {children ?? <Outlet />}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
