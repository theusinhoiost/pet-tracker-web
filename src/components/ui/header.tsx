import Link from "next/link";
import { ReactNode } from "react";
import { LuPawPrint } from "react-icons/lu";

type HeaderProps = {
  children?: ReactNode;
};

export default function Header({ children }: HeaderProps) {
  return (
    <header className="border-b sticky top-0 bg-background/80 backdrop-blur-md z-50">
      <nav className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LuPawPrint className="h-7 w-7 text-primary" />
          <span className="text-2xl font-bold tracking-tight">
            <Link href={"/"}>
              Pet<span className="text-primary">Tracker</span>
            </Link>
          </span>
        </div>
        {children}
      </nav>
    </header>
  );
}
