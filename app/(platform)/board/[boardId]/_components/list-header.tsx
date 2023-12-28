"use client";

import { List } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";

import { updateList } from "@/action/list/listAction";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ListOptions } from "./list-options";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title 字符长度太短了。"
  }).max(50),
});

interface ListHeaderProps {
  data: List;
  onAddCard: () => void;
};

export const ListHeader = ({
  data,
  onAddCard,
}: ListHeaderProps) => {
  const router = useRouter();
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  type FormData = z.infer<typeof formSchema>;
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
    },
  })

  const onSubmit = async (formData: FormData) => {
    console.log(formData);

    if (formData.title === title) {
      return disableEditing();
    }

    const list = await updateList(data.id, data.boardId, formData.title);
    setTitle(formData.title);
    toast.success(`List "${list?.title}" created`);
    disableEditing();
    router.refresh();
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start- gap-x-2">
      {isEditing ? (
        <Form {...form}>
          <form
            ref={formRef}
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 px-[2px]"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input  {...field}
                      ref={inputRef}
                      onBlur={onBlur}
                      placeholder="Enter list title.."
                      className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
        >
          {title}
        </div>
      )}
      <ListOptions
        onAddCard={onAddCard}
        data={data}
      />
    </div>
  );
};
