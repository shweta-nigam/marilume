import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex bg-background overflow-hidden py-4">
      <Sidebar />

      <main className="flex-1 h-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}