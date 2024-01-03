import { notFound, redirect } from "next/navigation";

import { getBoardById } from "@/action/board/boardAction";
import { auth } from "@/auth";
import { BoardNavbar } from "./_components/board-navbar";

export async function generateMetadata({
  params
}: {
  params: { boardId: string; };
}) {
  const user = await auth();

  if (!user) {
    return {
      title: "Board",
    };
  }

  const board = await getBoardById(params.boardId);

  return {
    title: board?.title || "Board",
  };
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string; };
}) => {
  const user = await auth();

  if (!user) {
    redirect("/board");
  }

  const board = await getBoardById(params.boardId);

  if (!board) {
    notFound();
  }

  return (
    <div
      className="relative h-full bg-no-repeat bg-cover bg-center"
    // style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar data={board} />
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative pt-16 h-full">
        {children}
      </main>
    </div>
  );
};

export default BoardIdLayout;
