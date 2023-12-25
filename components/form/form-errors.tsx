import { XCircle } from "lucide-react";
import { FieldErrors } from "react-hook-form";

interface FormErrorsProps {
  id: string;
  errors?: FieldErrors<{
    title: string;
  }>;
};

export const FormErrors = ({
  id,
  errors
}: FormErrorsProps) => {
  if (!errors) {
    return null;
  }

  return (
    <div
      id={`${id}-error`}
      aria-live="polite"
      className="mt-2 text-xs text-rose-500"
    >
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
  );
};
