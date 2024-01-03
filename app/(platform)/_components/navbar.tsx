'use client'

import { usePathname } from 'next/navigation'
import { handleSubmit } from "@/action/auth/authAction";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";

export const Navbar = () => {

  const pathname = usePathname();

  console.log(pathname);

  return (
    <div className="sticky z-50 top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <form action={handleSubmit}>
            {
              (pathname !== '/dashboard') &&
              <Button size="sm" variant="outline" asChild>
                <Link href="/login">
                  <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                </Link>
              </Button>
            }
            <Button size="sm" type="submit">
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
