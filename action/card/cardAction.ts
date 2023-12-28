'use server';

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const createCard = async (title: string, listId: string, boardId: string) => {

  try {
    const list = await db.list.findUnique({
      where: {
        id: listId,
      },
    });

    if (!list) {
      return null;
    }

    const lastCard = await db.card.findFirst({
      where: { listId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    const card = await db.card.create({
      data: {
        title,
        listId,
        order: newOrder,
      },
    });
    revalidatePath(`/board/${boardId}`);
    return card;

  } catch (error) {
    return null;
  }
}
