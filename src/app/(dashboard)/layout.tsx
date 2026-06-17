import Sidebar from "@/components/dashboard/Sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  console.log("[Layout Cookie Header]:", h.get("cookie"));
  const session = await auth.api.getSession({
    headers: h,
  });
  console.log("[Layout Session]:", session);

  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <div className="h-screen flex bg-background overflow-hidden py-4">
      <Sidebar />

      <main className="flex-1 h-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}