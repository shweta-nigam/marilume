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
    <div className="h-full-screen flex bg-background overflow-hidden ">
      <Sidebar />

      <main className="flex-1 min-h-0 overflow-hidden p-4">
  {children}
</main>
    </div>
  );
}