"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const handleChange = async (newLocale: string) => {
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;

    router.refresh();
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={locale} onValueChange={handleChange}>
        <SelectTrigger className="w-45 border-muted-foreground">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="pt">🇧🇷 Português</SelectItem>

          <SelectItem value="en">🇺🇸 English</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
