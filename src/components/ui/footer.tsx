import Link from "next/link";
import { LuPawPrint } from "react-icons/lu";

export default function Footer() {
  return (
    <footer>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <LuPawPrint className="h-4 w-4" />
          <span className="font-semibold">PetTracker Inc.</span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link href="/legal#privacidade" className="hover:text-foreground transition-colors">
            Privacidade
          </Link>
          <Link href="/legal#termos" className="hover:text-foreground transition-colors">
            Termos
          </Link>
          <Link href="/legal#cookies" className="hover:text-foreground transition-colors">
            Cookies
          </Link>
        </nav>

        <p>&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}