import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { BoardList } from "./_components/board-list";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
};

const BoardIdPage = async ({
  params,
}: BoardIdPageProps) => {
  const user = await auth();

  if (!user) {
    redirect("/login");
  }

  return (

    <div className="w-full mb-20">
      BoardIdPage {user.user?.name || user.user?.email}
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  )
}

export default BoardIdPage;