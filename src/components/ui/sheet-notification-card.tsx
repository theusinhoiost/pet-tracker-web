import { Bell } from "lucide-react";
import { Card } from "./card";

export default function SheetNotificationCard() {
  return (
    <Card className="p-3 border-l-4 border-l-primary">
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <Bell className="size-4 text-primary" />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Vacina atrasada</h4>

            <span className="text-xs text-muted-foreground">há 2h</span>
          </div>

          <p className="text-sm text-muted-foreground mt-1">
            A vacina V10 do Thor venceu ontem.
          </p>
        </div>
      </div>
    </Card>
  );
}
