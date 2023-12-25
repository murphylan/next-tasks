"use client";

import { ListForm } from "./list-form";

export const ListContainer = () => {

  return (
    <div>
      <ol>
        <ListForm />
        <div className="flex-shrink-0 w-1" />
      </ol>
    </div>
  );
};
