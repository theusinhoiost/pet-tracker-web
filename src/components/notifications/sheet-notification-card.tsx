"use client";

import { Bell } from "lucide-react";
import { Card } from "../ui/card";

import { useTransition } from "react";
import { NotificationDto } from "@/types/zod/notification";
import { markAsReadAction } from "@/actions/notifications/notifications";

function formatTimeAgo(date: Date) {
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - new Date(date).getTime()) / 1000,
  );

  if (diffInSeconds < 60) return "agora";
  if (diffInSeconds < 3600) return `há ${Math.floor(diffInSeconds / 60)} min`;
  if (diffInSeconds < 86400) return `há ${Math.floor(diffInSeconds / 3600)}h`;
  return `há ${Math.floor(diffInSeconds / 86400)}d`;
}

type Props = {
  notification: NotificationDto;
  onRead?: () => void;
};

export default function SheetNotificationCard({ notification, onRead }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (notification.read) return;

    startTransition(async () => {
      await markAsReadAction(notification.id);
      onRead?.();
    });
  };

  return (
    <Card
      className={`p-3 border-l-4 cursor-pointer transition-opacity ${
        notification.read ? "border-l-muted opacity-60" : "border-l-primary"
      } ${isPending ? "opacity-50" : ""}`}
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <Bell className="size-4 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">{notification.title}</h4>
            <span className="text-xs text-muted-foreground">
              {formatTimeAgo(notification.createdAt)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {notification.message}
          </p>
        </div>
      </div>
    </Card>
  );
}
