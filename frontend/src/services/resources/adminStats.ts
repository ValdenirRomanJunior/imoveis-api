import api from '../../utils/requests';

export interface AdminStatsDTO {
  totalUsers: number;
  totalProperties: number;
  totalLeads: number;
  totalOpportunities: number;
  publishedProperties: number;
  activeUsers: number;
}

export interface UserStatsDTO {
  id: number;
  slug: string;
  email: string;
  propertiesCount: number;
  leadsCount: number;
  createdAt?: string;
  // Informações de plano
  planType?: string;
  planName?: string;
  planStartDate?: string;
  planEndDate?: string;
  planStatus?: string;
  isTrialActive?: boolean;
  isPlanActive?: boolean;
  isPlanExpired?: boolean;
}

export interface UsersStatsResponse {
  content: UserStatsDTO[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface AccessMetricsDTO {
  total: {
    homeAccesses: number;
    testButtonClicks: number;
    uniqueHomeAccesses: number;
  };
  last24Hours: {
    homeAccesses: number;
    testButtonClicks: number;
    uniqueHomeAccesses: number;
  };
  lastWeek: {
    homeAccesses: number;
    testButtonClicks: number;
  };
  lastMonth: {
    homeAccesses: number;
    testButtonClicks: number;
  };
  conversionRate: number;
}

export const getSystemOverview = () => {
  return api.get('/admin/stats/overview');
};

export const getUsersStats = (page: number, size: number) => {
  return api.get(`/admin/stats/users?page=${page}&size=${size}`);
};

export const getRecentUsersStats = (page: number, size: number) => {
  return api.get(`/admin/stats/users/recent?page=${page}&size=${size}`);
};

export const getAccessMetrics = () => {
  return api.get('/admin/stats/access-metrics');
};

export const trackAccess = (page: string) => {
  // Envia o campo esperado pelo backend: eventType
  return api.post('/admin/stats/track-access', { eventType: page });
};

export const getUserDetailedStats = (userId: number) => {
  return api.get<UserStatsDTO>(`/admin/stats/users/${userId}`)
    .then(response => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const getUserFullDetails = (userId: number) => {
  return api.get<UserStatsDTO>(`/admin/stats/users/${userId}/details`)
    .then(response => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const getLoginMetrics = () => {
  return api.get('/admin/stats/login-metrics')
    .then(response => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const clearAccessMetrics = () => {
  return api.delete('/admin/stats/access-metrics')
    .then(response => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};