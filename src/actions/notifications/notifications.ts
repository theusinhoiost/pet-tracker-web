"use server";

import {
  getNotifications,
  getUnreadCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "@/services/api/notification";
import { NotificationDto } from "@/types/zod/notification";

type NotificationActionState = {
  notifications?: NotificationDto[];
  unreadCount?: number;
  errors: string[];
  success: boolean;
};

export async function getNotificationsAction(): Promise<NotificationActionState> {
  try {
    const notifications = await getNotifications();
    return {
      notifications,
      errors: [],
      success: true,
    };
  } catch (error) {
    return {
      notifications: [],
      errors: ["Erro ao carregar notificações"],
      success: false,
    };
  }
}

export async function getUnreadCountAction(): Promise<NotificationActionState> {
  try {
    const unreadCount = await getUnreadCount();
    return {
      unreadCount,
      errors: [],
      success: true,
    };
  } catch (error) {
    return {
      unreadCount: 0,
      errors: ["Erro ao carregar contagem"],
      success: false,
    };
  }
}

export async function markAsReadAction(
  id: string,
): Promise<NotificationActionState> {
  try {
    await markNotificationAsRead(id);
    return {
      errors: [],
      success: true,
    };
  } catch (error) {
    return {
      errors: ["Erro ao marcar como lida"],
      success: false,
    };
  }
}

export async function markAllAsReadAction(): Promise<NotificationActionState> {
  try {
    await markAllNotificationsAsRead();
    return {
      errors: [],
      success: true,
    };
  } catch (error) {
    return {
      errors: ["Erro ao limpar notificações"],
      success: false,
    };
  }
}
