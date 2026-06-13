"use client";
import { Monitor, Moon, Sun, Palette, LucideIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Card, CardContent } from "../card";

import { Separator } from "../separator";

export default function ThemeSettingsChanger() {
  const { theme, setTheme } = useTheme();

  return (
    <Card className="rounded-3xl border-border/50 shadow-sm">
      <CardContent className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Aparência</h2>

            <p className="text-sm text-muted-foreground">
              Customize o visual da plataforma.
            </p>
          </div>

          <Palette className="h-5 w-5 text-muted-foreground" />
        </div>

        <Separator />

        <div className="flex gap-8 justify-center">
          <div onClick={() => setTheme("light")}>
            <ThemeCard icon={Sun} title="Claro" active={theme === "light"} />
          </div>

          <div onClick={() => setTheme("dark")}>
            <ThemeCard icon={Moon} title="Escuro" active={theme === "dark"} />
          </div>

          <div onClick={() => setTheme("system")}>
            <ThemeCard
              icon={Monitor}
              title="Sistema"
              active={theme === "system"}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
function ThemeCard({
  icon: Icon,
  title,
  active = false,
}: {
  icon: LucideIcon;
  title: string;
  active?: boolean;
}) {
  return (
    <button
      className={`rounded-3xl border p-6 transition-all
      ${active ? "border-primary bg-primary/10" : "hover:bg-muted/50"}`}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-2xl bg-muted p-4">
          <Icon className="h-6 w-6" />
        </div>

        <span className="font-medium">{title}</span>
      </div>
    </button>
  );
}
