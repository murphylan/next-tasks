import { auth } from "@/auth";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { BoardList } from "../../board/[boardId]/_components/board-list";
import { CreditCard } from "lucide-react";
import Image from "next/image";

const DashboardPage = async () => {
  const user = await auth();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="w-full mb-20">

      <div className="flex items-center gap-x-4">
        <div className="w-[60px] h-[60px] relative">
          <Image
            fill
            src={"/logo.svg"}
            alt="Organization"
            className="rounded-md object-cover"
          />
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-xl">
            BoardIdPage
          </p>
          <div className="flex items-center text-xs text-muted-foreground">
            <CreditCard className="h-3 w-3 mr-1" />
            {user.user?.name || user.user?.email}
          </div>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  )
}

export default DashboardPage;