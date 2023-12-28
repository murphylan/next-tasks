import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { BoardList } from "./_components/board-list";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { ListContainer } from "./_components/list-container";
import { getLists } from "@/action/list/listAction";
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

  const lists = await getLists(params.boardId);

  return (
    <div className="p-4 h-full overflow-x-auto">
      <ListContainer
        boardId={params.boardId}
        data={lists}
      />
    </div>
  )
}

export default BoardIdPage;