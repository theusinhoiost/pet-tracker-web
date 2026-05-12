"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* SIDEBAR */}
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4">
              {/* MAIN CONTENT */}
              <header className="h-16 border rounded-2xl flex items-center mx-2 justify-between px-8 bg-background/90 backdrop-blur-md sticky top-1 z-10">
                <h1 className="font-semibold text-lg flex justify-center items-center gap-3">
                  Bem-vindo de volta!
                </h1>
                <Link href={"/addpet"}>
                  <Button size="sm" className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Adicionar Pet
                  </Button>
                </Link>
              </header>
              <div className="p-4">{children}</div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </div>
  );
}
