'use server';

import { db } from "@/lib/db";
import { Card, List } from "@prisma/client";
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

export const copyList = async (id: string, boardId: string) => {

  try {
    const listToCopy = await db.list.findUnique({
      where: {
        id,
        boardId,
      },
      include: {
        cards: true,
      },
    });

    if (!listToCopy) {
      return null;
    }

    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    const list = await db.list.create({
      data: {
        boardId: listToCopy.boardId,
        title: `${listToCopy.title} - Copy`,
        order: newOrder,
        cards: {
          // Assuming listToCopy.cards is an array of objects
          create: listToCopy.cards.map((card) => ({
            title: card.title,
            description: card.description,
            order: card.order,
          })),
        },
      },
      include: {
        cards: true,
      },
    });


    revalidatePath(`/board/${boardId}`);
    return list;
  } catch (error) {
    return null;
  }

}

export const updateList = async (id: string, boardId: string, title: string) => {
  try {
    const list = await db.list.update({
      where: {
        id,
        boardId,
      },
      data: {
        title,
      },
    });
    revalidatePath(`/board/${boardId}`);
    return list;
  } catch (error) {
    return null
  }

}

export const updateListOrder = async (items: List[], boardId: string) => {
  let lists;
  try {
    const transaction = items.map((list) =>
      db.list.update({
        where: {
          id: list.id,
        },
        data: {
          order: list.order,
        },
      })
    );

    lists = await db.$transaction(transaction);
    revalidatePath(`/board/${boardId}`);
    return lists;
  } catch (error) {
    return null;
  }
}


export const updateCardOrder = async (items: Card[], boardId: string) => {
  let updatedCards;

  try {
    const transaction = items.map((card) =>
      db.card.update({
        where: {
          id: card.id,
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      }),
    );

    updatedCards = await db.$transaction(transaction);
  } catch (error) {
    return null;
  }

  revalidatePath(`/board/${boardId}`);
  return updatedCards;
}

