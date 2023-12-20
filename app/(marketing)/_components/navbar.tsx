import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
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
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <form action={handleSubmit}>
            <Button size="sm" variant="outline" asChild>
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Link>
            </Button>
            {/* <Button size="sm" type="submit">
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button> */}
          </form>
        </div>
      </div>
    </div>
  );
};
