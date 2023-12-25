"use client";

import { Board } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

import { updateBoard } from "@/action/board/boardAction";
import { createBoardSchema } from "@/action/board/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface BoardTitleFormProps {
  data: Board;
};

export const BoardTitleForm = ({
  data,
}: BoardTitleFormProps) => {

  const [title, setTitle] = useState(data.title);
  // 1. Define your form.
  type FormData = z.infer<typeof createBoardSchema>;
  const form = useForm<FormData>({
    resolver: zodResolver(createBoardSchema),
    defaultValues: {
      title: title,
    },
  })

  const onSubmit = async (formData: FormData) => {
    console.log(formData);

    const board = await updateBoard(data.id, formData.title);
    toast.success(`Board "${board?.title}" updated!`);
    setTitle(formData.title);
    disableEditing();
  };

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);


  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    })
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <Form {...form}>
        <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-x-2"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={title} {...field}
                    ref={inputRef}
                    onBlur={onBlur}
                    className="w-96 text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    )
  }

  return (
    <Button
      onClick={enableEditing}
      variant="ghost"
      className="font-bold text-lg h-auto w-auto p-1 px-2"
    >
      {title}
    </Button>
  );
};
