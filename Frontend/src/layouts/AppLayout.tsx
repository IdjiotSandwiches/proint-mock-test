import { Toaster } from "sonner";

interface Props extends React.PropsWithChildren {}

function AppLayout({ children }: Props) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl">
      {children}
      <Toaster />
    </div>
  );
}

export default AppLayout;
