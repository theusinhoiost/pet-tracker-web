"use client";

import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NotificationDto } from "@/types/zod/notification";
import {
  getNotificationsAction,
  getUnreadCountAction,
  markAllAsReadAction,
} from "@/actions/notifications/notifications";
import SheetNotificationCard from "./sheet-notification-card";

export default function NotificationsSheet() {
  const [notifications, setNotifications] = useState<NotificationDto[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  const loadData = () => {
    startTransition(async () => {
      const [notificationsResult, countResult] = await Promise.all([
        getNotificationsAction(),
        getUnreadCountAction(),
      ]);

      if (notificationsResult.success && notificationsResult.notifications) {
        setNotifications(notificationsResult.notifications);
      }

      if (countResult.success && typeof countResult.unreadCount === "number") {
        setUnreadCount(countResult.unreadCount);
      }
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleMarkAllAsRead = () => {
    startTransition(async () => {
      const result = await markAllAsReadAction();
      if (result.success) {
        loadData();
      }
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          Notificações
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col" aria-describedby={undefined}>
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

        <ScrollArea className="flex-1 min-h-0">
          <div className="flex flex-col gap-3">
            <div className="space-y-2 mx-4 mt-2">
              {notifications.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Nenhuma notificação
                </p>
              ) : (
                notifications.map((notification) => (
                  <SheetNotificationCard
                    key={notification.id}
                    notification={notification}
                    onRead={loadData}
                  />
                ))
              )}
            </div>
          </div>
        </ScrollArea>

        <SheetFooter className="border-t pt-4 flex-row gap-2 sm:justify-between">
          <Button
            variant="default"
            className="flex-1"
            onClick={handleMarkAllAsRead}
            disabled={isPending || unreadCount === 0}
          >
            {isPending ? "Limpando..." : "Limpar"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
