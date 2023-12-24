import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { BoardList } from "./_components/board-list";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { ListContainer } from "./_components/list-container";
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

    <div className="p-4 h-full overflow-x-auto">
      <ListContainer
      />
    </div>
  )
}

export default BoardIdPage;