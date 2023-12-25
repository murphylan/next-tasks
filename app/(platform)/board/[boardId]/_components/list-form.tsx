"use client";

import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

import { createList } from "@/action/list/listAction";
import { createListSchema } from "@/action/list/schema";
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
import { Plus, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { z } from "zod";
import { ListWrapper } from "./list-wrapper";

export const ListForm = () => {
  const router = useRouter();
  const params = useParams();

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    };
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  type FormData = z.infer<typeof createListSchema>;
  const form = useForm<FormData>({
    resolver: zodResolver(createListSchema),
    defaultValues: {
      title: '',
    },
  })

  const onSubmit = async (formData: FormData) => {
    console.log(formData);

    const list = await createList(formData.title, formData.boardId);
    toast.success(`List "${list?.title}" created`);
    disableEditing();
    router.refresh();
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <Form {...form}>
          <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input  {...field}
                      onBlur={onBlur}
                      ref={inputRef}
                      className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <input
              hidden
              defaultValue={params.boardId}
              name="boardId"
            />
            <div className="flex items-center gap-x-1">
              <Button type="submit">Submit</Button>
              <Button
                onClick={disableEditing}
                size="sm"
                variant="ghost"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </Form>
      </ListWrapper>
    );
  };

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a list
      </button>
    </ListWrapper>
  );
};
