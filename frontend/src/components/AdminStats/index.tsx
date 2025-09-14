import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { getSystemOverview, getUsersStats, AdminStatsDTO, UsersStatsResponse } from '../../services/resources/adminStats';
import {
  AdminStatsContainer,
  StatsGrid,
  StatCard,
  ChartsGrid,
  ChartContainer,
  TableContainer,
  UsersTable,
  UserRow,
  ModalOverlay,
  ModalContent,
  CloseButton
} from './styles';
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { RiUserLine } from 'react-icons/ri';

interface AdminStatsProps {
  isVisible: boolean;
}

const AdminStats: React.FC<AdminStatsProps> = ({ isVisible }) => {
  const [stats, setStats] = useState<AdminStatsDTO | null>(null);
  const [usersStats, setUsersStats] = useState<UsersStatsResponse | null>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isVisible) {
      loadAdminStats();
      loadUsersStats();
    }
  }, [isVisible]);

  const loadAdminStats = async () => {
    try {
      const response = await getSystemOverview();
      if (response.status === 200) {
        setStats(response.data);
      } else {
        setError('Erro ao carregar estatísticas do sistema');
      }
    } catch (err) {
      setError('Erro ao carregar estatísticas do sistema');
    }
  };

  const loadUsersStats = async () => {
    try {
      const response = await getUsersStats(0, 10);
      if (response.status === 200) {
        setUsersStats(response.data);
      } else {
        setError('Erro ao carregar estatísticas de usuários');
      }
    } catch (err) {
      setError('Erro ao carregar estatísticas de usuários');
    } finally {
      setLoading(false);
    }
  };



  const usersActivityChartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 300
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Total de Usuários', 'Usuários Ativos'],
    },
    yaxis: {
      title: {
        text: 'Quantidade'
      }
    },
    fill: {
      opacity: 1
    },
    colors: ['#007bff', '#28a745']
  };

  if (!isVisible) return null;

  if (loading) {
    return (
      <AdminStatsContainer>
        <p>Carregando estatísticas administrativas...</p>
      </AdminStatsContainer>
    );
  }

  if (error) {
    return (
      <AdminStatsContainer>
        <p style={{ color: 'red' }}>{error}</p>
      </AdminStatsContainer>
    );
  }

  const propertiesChartSeries = stats ? [
    stats.publishedProperties,
    stats.totalProperties - stats.publishedProperties
  ] : [];

  const usersActivitySeries = stats ? [{
    name: 'Usuários',
    data: [stats.totalUsers, stats.activeUsers]
  }] : [];

  return (
    <AdminStatsContainer>
      <h2>📊 Painel Administrativo</h2>
      
      <StatsGrid>
        <StatCard>
          <div className='stat-icon'>
            <AiOutlineUser />
          </div>
          <div className='stat-info'>
            <h3>Total de Usuários</h3>
            <span className='stat-number'>{stats?.totalUsers || 0}</span>
          </div>
        </StatCard>

        <StatCard>
          <div className='stat-icon'>
            <AiOutlineHome />
          </div>
          <div className='stat-info'>
            <h3>Total de Imóveis</h3>
            <span className='stat-number'>{stats?.totalProperties || 0}</span>
          </div>
        </StatCard>

        <StatCard>
          <div className='stat-icon'>
            <IoCloudUploadOutline />
          </div>
          <div className='stat-info'>
            <h3>Imóveis Publicados</h3>
            <span className='stat-number'>{stats?.publishedProperties || 0}</span>
          </div>
        </StatCard>

        <StatCard>
          <div className='stat-icon'>
            <RiUserLine />
          </div>
          <div className='stat-info'>
            <h3>Total de Leads</h3>
            <span className='stat-number'>{stats?.totalLeads || 0}</span>
          </div>
        </StatCard>
      </StatsGrid>

      <ChartsGrid>
        <ChartContainer>
          <h3>📈 Distribuição de Propriedades</h3>
          <Chart
            options={{
               chart: {
                 type: 'donut'
               },
               labels: ['Publicadas', 'Não Publicadas'],
               colors: ['#28a745', '#ffc107'],
               legend: {
                 position: 'bottom'
               },
               responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 280
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            }}
            series={propertiesChartSeries}
            type="donut"
            height={300}
          />
        </ChartContainer>

        <ChartContainer>
          <h3>👥 Atividade de Usuários</h3>
          <Chart
            options={{
               ...usersActivityChartOptions,
               responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 280
                  },
                  plotOptions: {
                    bar: {
                      horizontal: false,
                      columnWidth: '55%',
                      endingShape: 'rounded'
                    }
                  }
                }
              }]
            }}
            series={usersActivitySeries}
            type="bar"
            height={300}
          />
        </ChartContainer>
      </ChartsGrid>

      <TableContainer>
        <h3>👤 Usuários Recentes</h3>
        <UsersTable>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Propriedades</th>
              <th>Leads</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usersStats?.content.slice(0, 5).map(user => (
              <UserRow key={user.id}>
                <td>{user.slug}</td>
                <td>{user.email}</td>
                <td>{user.propertiesCount}</td>
                <td>{user.leadsCount}</td>
                <td>
                  <button 
                    onClick={() => setSelectedUser(user)}
                    style={{
                      background: '#007bff',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Ver Detalhes
                  </button>
                </td>
              </UserRow>
            ))}
          </tbody>
        </UsersTable>
      </TableContainer>

      {selectedUser && (
        <ModalOverlay onClick={() => setSelectedUser(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h3>Detalhes do Usuário</h3>
            <p><strong>Nome:</strong> {selectedUser.slug} {selectedUser.lastName}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Telefone:</strong> {selectedUser.phone}</p>
            <p><strong>CRECI:</strong> {selectedUser.cpf}</p>
            <p><strong>Data de Cadastro:</strong> {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : 'N/A'}</p>
            <p><strong>Propriedades:</strong> {selectedUser.propertiesCount}</p>
            <p><strong>Propriedades Publicadas:</strong> {selectedUser.publishedPropertiesCount}</p>
            <p><strong>Leads:</strong> {selectedUser.leadsCount}</p>
            
            <CloseButton onClick={() => setSelectedUser(null)}>
              Fechar
            </CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </AdminStatsContainer>
  );
};

export default AdminStats;