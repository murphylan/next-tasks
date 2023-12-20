import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "@/auth";

export const Navbar = () => {

  const handleSubmit = async () => {
    'use server';
    await signOut();
  }

  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <form action={handleSubmit}>
          <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
            <Button size="sm" variant="outline" asChild>
              <Link href="/login">
                Login
              </Link>
            </Button>
            <Button size="sm" asChild type="submit">
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
