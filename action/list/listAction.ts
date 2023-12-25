'use server';

import { db } from "@/lib/db";
import { List } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getBoardById } from "../board/boardAction";

export const getLists = async (): Promise<List[] | undefined> => {
  const lists = await db.list.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return lists;
}

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