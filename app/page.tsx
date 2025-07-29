import { AuthButton } from "@/components/auth-button";

import { NavigationMenu } from "@/components/ui/navigation-menu";

import { NavigationMenuList } from "@radix-ui/react-navigation-menu";

export default async function Home() {
  return (
    <>
      <div className="flex justify-end w-full p-4">
        <NavigationMenu>
          <NavigationMenuList>
            <AuthButton />
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <main className="min-h-screen flex flex-col items-center"></main>
    </>
  );
}
