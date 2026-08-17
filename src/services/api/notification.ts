import { NotificationDto } from "@/types/zod/notification";
import { serverFetch } from "../auth/server";

export async function getNotifications(): Promise<NotificationDto[]> {
  const response = await serverFetch("/notifications", { method: "GET" });
  return response.json();
}

export async function getUnreadCount(): Promise<number> {
  const response = await serverFetch("/notifications/unread-count", {
    method: "GET",
  });
  return response.json();
}

export async function markNotificationAsRead(id: string): Promise<void> {
  await serverFetch(`/notifications/${id}/read`, {
    method: "PATCH",
  });
}

export async function markAllNotificationsAsRead(): Promise<void> {
  await serverFetch("/notifications/read-all", {
    method: "PATCH",
  });
}
