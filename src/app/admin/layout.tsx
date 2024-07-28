import type { Metadata } from "next";
import Sidebar from "../../components/Sidebar";

export const metadata: Metadata = {
  title: "Emprender Mujer - Impact Hub | Sculapp",
  description: "Plataforma educativa",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
