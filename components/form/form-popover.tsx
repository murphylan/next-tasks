"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { X, XCircle } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { ElementRef, useRef } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FormSubmit } from "./form-submit";
import { toast } from "sonner";
import { createBoard } from "@/action/board/boardAction";
import { revalidatePath } from "next/cache";
import { createBoardSchema } from "@/action/board/schema";

type FormData = zod.infer<typeof createBoardSchema>;

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
};

export const FormPopover = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}: FormPopoverProps) => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);

  const { pending } = useFormStatus();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(createBoardSchema),
  });

  async function onSubmit(data: FormData) {
    console.log(isSubmitting);
    console.log(data);

    const board = await createBoard(data.title);

    toast.success("Board created!");
    closeRef.current?.click();
    router.push("/dashboard");
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="space-y-1">
                <Label
                  htmlFor="title"
                  className="text-xs font-semibold text-neutral-700"
                >
                  Board title
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter your title"
                  disabled={pending}
                  className={cn(
                    "text-sm px-2 py-1 h-7",
                    "",
                  )}
                  {...register("title", { required: true })}
                  aria-describedby={`title-error`}
                />
              </div>
              {errors?.title && (
                <div
                  id="title-error"
                  aria-live="polite"
                  className="flex items-center font-medium p-2 border border-rose-500 bg-rose-500/10 rounded-sm text-red-600 text-sm"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  {errors?.title?.message}
                </div>
              )}
            </div>
          </div>
          <FormSubmit className="w-full">
            Create
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
