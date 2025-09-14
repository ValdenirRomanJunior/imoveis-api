import  api  from '../../utils/requests';

export interface AdminStatsDTO {
  totalUsers: number;
  totalProperties: number;
  totalLeads: number;
  publishedProperties: number;
  activeUsers: number;
}

export interface UserStatsDTO {
  id: number;
  slug: string;
  lastName: string;
  email: string;
  phone: string;
  cpf: string;
  createdAt: string;
  propertiesCount: number;
  leadsCount: number;
  publishedPropertiesCount: number;
}

export interface UsersStatsResponse {
  content: UserStatsDTO[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export const getSystemOverview = () => {
  return api.get<AdminStatsDTO>('/admin/stats/overview')
    .then(response => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const getUsersStats = (page = 0, linesPerPage = 24, orderBy = 'slug', direction = 'ASC') => {
  return api.get<UsersStatsResponse>(`/admin/stats/users?page=${page}&linesPerPage=${linesPerPage}&orderBy=${orderBy}&direction=${direction}`)
    .then(response => {
      return response;
    })
    .catch((error) => {
      return error;
    });
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

export const getLoginMetrics = () => {
  return api.get('/admin/stats/login-metrics')
    .then(response => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};