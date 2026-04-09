"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PawPrint,
  LayoutDashboard,
  Calendar,
  Settings,
  LogOut,
  PlusCircle,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/agenda", label: "Agenda", icon: Calendar },
    { href: "/dashboard/config", label: "Configurações", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* SIDEBAR */}
      <aside className="w-64 border-r bg-sidebar text-sidebar-foreground hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-2 border-b border-sidebar-border">
          <PawPrint className="h-6 w-6 text-sidebar-primary" />
          <span className="font-bold text-xl tracking-tight">PetTracker</span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                pathname === item.href
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "hover:bg-sidebar-accent/50 text-sidebar-foreground/70",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border space-y-4">
          <ThemeToggle />
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-sidebar-foreground/70 hover:text-destructive"
          >
            <LogOut className="h-5 w-5" />
            Sair
          </Button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b flex items-center justify-between px-8 bg-background/80 backdrop-blur-md sticky top-0 z-10">
          <h1 className="font-semibold text-lg">Bem-vindo de volta! 🐾</h1>
          <Link href={"/addpet"}>
            <Button size="sm" className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Adicionar Pet
            </Button>
          </Link>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
