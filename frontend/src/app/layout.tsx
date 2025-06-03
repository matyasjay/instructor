export type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto flex min-h-screen w-screen max-w-screen-2xl flex-col p-2 font-family-[Gotham]">
      <div
        className={`relative flex w-full rounded-2xl bg-white-4 dark:bg-dark`}
      >
        &nbsp;
      </div>
      <div className="mt-2 flex w-full h-dvh flex-1 gap-2 rounded-2xl">
        <main className="h-180 w-full rounded-2xl bg-white-3 dark:bg-dark-2 p-0">
          {children}
        </main>
      </div>
    </div>
  );
}
