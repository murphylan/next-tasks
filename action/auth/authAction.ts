'use server';

import { signOut } from "@/auth";

export const handleSubmit = async () => {
  await signOut();
}