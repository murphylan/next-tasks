"use client";

import { createCard } from "@/action/card/cardAction";
import { createCardSchema } from "@/action/card/schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {
  ElementRef,
  KeyboardEventHandler,
  forwardRef,
  useRef,
} from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { z } from "zod";

interface CardFormProps {
  listId: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
};

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(({
  listId,
  enableEditing,
  disableEditing,
  isEditing,
}, ref) => {
  const router = useRouter();
  const params = useParams<{ boardId: string }>();
  const formRef = useRef<ElementRef<"form">>(null);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useOnClickOutside(formRef, disableEditing);
  useEventListener("keydown", onKeyDown);

  const onTextareakeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  type FormData = z.infer<typeof createCardSchema>;
  const form = useForm<FormData>({
    resolver: zodResolver(createCardSchema),
    defaultValues: {
      title: '',
    },
  })

  const onSubmit = async (formData: FormData) => {
    console.log(formData);

    const card = await createCard(formData.title, listId, params.boardId,);
    toast.success(`List "${card?.title}" created`);
    disableEditing();
    router.refresh();
  };

  if (isEditing) {
    return (
      <Form {...form}>
        <form
          ref={formRef}
          onSubmit={form.handleSubmit(onSubmit)}
          className="m-1 py-0.5 px-1 space-y-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea  {...field}
                    onKeyDown={onTextareakeyDown}
                    ref={ref}
                    placeholder="Enter a title for this card..."
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-1">
            <Button type="submit">Add card</Button>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </Form >
    )
  }

  return (
    <div className="pt-2 px-2">
      <Button
        onClick={enableEditing}
        className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
        size="sm"
        variant="ghost"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a card
      </Button>
    </div>
  );
});

CardForm.displayName = "CardForm";