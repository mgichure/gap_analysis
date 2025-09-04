import { TopNav } from "@/components/shell/TopNav";
import { SideNav } from "@/components/shell/SideNav";
import { Breadcrumbs } from "@/components/shell/Breadcrumbs";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <TopNav />
      <div className="flex flex-1">
        <SideNav />
        <div className="flex-1 flex flex-col">
          <Breadcrumbs />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
