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
          <NavigationMenuList className="flex w-full justify-between items-center">
            <div className="flex gap-4">
              <NavigationMenuItem>
                <NavigationMenuLink href="/">Home</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/learning-log">Learning Log</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </div>

            <NavigationMenuItem>
              <AuthButton />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
