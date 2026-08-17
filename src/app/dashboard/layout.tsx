"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SheetNotificationCard from "@/components/notifications/sheet-notification-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { LogOut } from "lucide-react";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import NotificationsSheet from "@/components/notifications/notifications-sheet";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background/80 text-foreground flex flex-col transition-colors duration-300">
      <Header>
        <div className="flex items-center gap-2 sm:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32">
              <DropdownMenuGroup>
                <DropdownMenuItem aria-description="Entrar área de pagamentos">
                  Pagamentos
                </DropdownMenuItem>
                <DropdownMenuItem aria-description="Entrar área das configurações">
                  <Link href={"/settings"}>Configurações</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem variant="destructive">
                  Sair da conta <LogOut />
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <NotificationsSheet />
        </div>
      </Header>

      <main className="grow py-6 px-3">{children}</main>

      <Footer />
    </div>
  );
}
