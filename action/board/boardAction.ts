'use server';

import { db } from "@/lib/db";
import { Board } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getBoardList = async (): Promise<Board[] | undefined> => {
  const boards = await db.board.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return boards;
}

export const getBoardById = async (boardId: string): Promise<Board | null> => {
  const board = await db.board.findUnique({
    where: {
      id: boardId,
    },
  });

  return board;
}

export const createBoard = async (title: string): Promise<Board | undefined> => {
  const board = await db.board.create({
    data: {
      title,
      color: "bg-emerald-400"
    }
  });
  revalidatePath(`/board`);
  return board;
}

export const updateBoard = async (id: string, title: string): Promise<Board | undefined> => {
  const board = await db.board.update({
    where: {
      id,
    },
    data: {
      title,
    },
  });

  return board;
}

export const deleteBoard = async (id: string): Promise<Board | undefined> => {
  const board = await db.board.delete({
    where: {
      id,
    },
  });
  revalidatePath(`/board`);
  redirect(`/board`);
  return board;
}
