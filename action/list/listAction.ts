'use server';

import { db } from "@/lib/db";
import { List } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getBoardById } from "../board/boardAction";
import { redirect } from "next/navigation";

export const createList = async (title: string, boardId: string): Promise<List | null> => {
  const board = await getBoardById(boardId);

  if (!board) {
    return null;
  }

  const lastList = await db.list.findFirst({
    where: { boardId: boardId },
    orderBy: { order: "desc" },
    select: { order: true },
  });

  const newOrder = lastList ? lastList.order + 1 : 1;

  const list = await db.list.create({
    data: {
      title,
      boardId,
      order: newOrder,
    },
  });
  revalidatePath(`/dashboard/${boardId}`);
  return list;
}

export const getLists = async (boardId: string) => {

  const lists = await db.list.findMany({
    where: {
      boardId: boardId,
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return lists;
}

export const deleteList = async (id: string, boardId: string): Promise<List | undefined> => {
  const list = await db.list.delete({
    where: {
      id,
      boardId,
    },
  });
  revalidatePath(`/board/${boardId}`);
  redirect(`/board/${boardId}`);
  return list;
}