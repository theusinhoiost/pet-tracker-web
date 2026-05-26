"use client";

import { LuPawPrint } from "react-icons/lu";
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
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SheetNotificationCard from "@/components/ui/sheet-notifcation-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { LogOut } from "lucide-react";
import Header from "@/components/ui/header";

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
          <Sheet aria-description="Notificações mais recentes sobre o pet">
            <SheetTrigger asChild>
              <Button variant="outline" className="relative">
                Notificações
                {/* Badge */}
                <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  3
                </span>
              </Button>
            </SheetTrigger>

            <SheetContent className="flex flex-col">
              {/* HEADER */}
              <SheetHeader className="border-b pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <SheetTitle>Notificações</SheetTitle>

                    <p className="text-sm text-muted-foreground mt-1">
                      Atualizações recentes sobre seus pets
                    </p>
                  </div>
                </div>
              </SheetHeader>

              {/* LISTA */}
              <ScrollArea className="flex-1  min-h-0">
                <div className="flex flex-col gap-3">
                  <div>
                    <div className="space-y-2 mx-4 mt-2">
                      <SheetNotificationCard />
                      <SheetNotificationCard />
                      <SheetNotificationCard />
                      <SheetNotificationCard />
                      <SheetNotificationCard />
                      <SheetNotificationCard />
                    </div>
                  </div>

                  {/* ONTEM */}
                </div>
              </ScrollArea>

              {/* FOOTER */}
              <SheetFooter className="border-t pt-4 flex-row gap-2 sm:justify-between">
                <Button variant="default" className="flex-1">
                  Limpar
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </Header>

      <main className="grow py-6 px-3">{children}</main>

      {/* --- FOOTER --- */}
      <footer className="bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <LuPawPrint className="h-4 w-4" />
            <span className="font-semibold">PetTracker Inc.</span>
          </div>
          <p>&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
