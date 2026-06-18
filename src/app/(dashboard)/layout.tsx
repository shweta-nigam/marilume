import Sidebar from "@/components/dashboard/Sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

 const requestHeaders = await headers();

  console.log(
    "[Dashboard] Cookie:",
    requestHeaders.get("cookie")
  );

 const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  console.log("[Dashboard] Session:", session);
  
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

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