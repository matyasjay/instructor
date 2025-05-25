export type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="mx-auto flex min-h-screen w-screen max-w-screen-2xl flex-col p-2 font-family-[Gotham]">
      <div
        className={`relative flex w-full rounded-2xl bg-white-4 dark:bg-dark `}
      >
        &nbsp;
      </div>
      <div className="mt-2 flex w-full flex-1 gap-2 rounded-2xl">
        <main className="h-fit w-full rounded-2xl bg-white-3 dark:bg-dark-2">
          <img src="/logo.gif" alt="Instructor Logo" />
          {children}
        </main>
      </div>
    </div>
  );
}
