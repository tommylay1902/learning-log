import { AuthButton } from "@/components/auth-button";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-2">
      <div className="m-3">
        <NavigationMenu className="w-full max-w-none pb-2">
          <NavigationMenuList className="flex w-full  items-center">
            <div className="flex gap-4 w-[200px]">
              <NavigationMenuItem>
                <NavigationMenuLink href="/">Home</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/learning-log">Learning Log</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </div>
            <div className="flex-1 text-center">
              <div className="text-5xl font-bold mx-auto">DO NOT GIVE UP</div>
            </div>
            <div className="flex justify-end w-[200px]">
              <NavigationMenuItem>
                <AuthButton />
              </NavigationMenuItem>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
