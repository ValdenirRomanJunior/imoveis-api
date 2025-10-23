import api from '../../utils/requests';

export interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  readAt?: string;
  referenceUserId?: number;
  referenceUserName?: string;
  referenceUserEmail?: string;
}

export interface NotificationCount {
  unreadCount: number;
}

export const getNotifications = async (unreadOnly: boolean = false) => {
  try {
    const response = await api.get(`/admin/stats/notifications?unreadOnly=${unreadOnly}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar notificações:', error);
    throw error;
  }
};

export const getNotificationCount = async (): Promise<NotificationCount> => {
  try {
    const response = await api.get('/admin/stats/notifications/count');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar contagem de notificações:', error);
    throw error;
  }
};

export const markNotificationAsRead = async (notificationId: number) => {
  try {
    await api.put(`/admin/stats/notifications/${notificationId}/read`);
  } catch (error) {
    console.error('Erro ao marcar notificação como lida:', error);
    throw error;
  }
};

export const markAllNotificationsAsRead = async () => {
  try {
    await api.put('/admin/stats/notifications/mark-all-read');
  } catch (error) {
    console.error('Erro ao marcar todas as notificações como lidas:', error);
    throw error;
  }
};

// Novo: deletar todas as notificações
export const clearAllNotifications = async () => {
  try {
    await api.delete('/admin/stats/notifications');
  } catch (error) {
    console.error('Erro ao deletar todas as notificações:', error);
    throw error;
  }
};