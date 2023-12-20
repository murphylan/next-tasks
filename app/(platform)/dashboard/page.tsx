import { auth } from "@/auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const user = await auth();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      Dashboard {user.user?.name || user.user?.email}
    </div>
  )
}

export default DashboardPage;