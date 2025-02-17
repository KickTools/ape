// app/connect/layout.tsx
import { KickAuthProvider } from "@/context/KickAuthContext";

export default function ConnectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <KickAuthProvider>
    <div className="flex flex-grow">
      {children}
    </div>
  </KickAuthProvider>;
}
