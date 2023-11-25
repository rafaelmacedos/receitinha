import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
interface NexAuthSessionProviderProps {
  children: ReactNode;
}

export default function NexAuthSessionProvider({
  children,
}: NexAuthSessionProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
