import React, { useState, useEffect } from 'react';
import { getUsersStats, UsersStatsResponse, getUserFullDetails } from '../../services/resources/adminStats';
import AdminPlanModal from '../AdminPlanModal';
import {
  UsersListContainer,
  Header,
  SearchContainer,
  SearchInput,
  FilterSelect,
  TableContainer,
  UsersTable,
  UserRow,
  PaginationContainer,
  PaginationButton,
  LoadingSpinner,
  ErrorMessage,
  ModalOverlay,
  ModalContent,
  CloseButton
} from './styles';
import { AiOutlineSearch, AiOutlineUser, AiOutlineClose } from 'react-icons/ai';

const UsersList: React.FC = () => {
  const [usersStats, setUsersStats] = useState<UsersStatsResponse | null>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [planModalAction, setPlanModalAction] = useState<'renew' | 'change' | 'trial'>('renew');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const pageSize = 20;

  useEffect(() => {
    loadUsers();
  }, [currentPage, sortBy, sortDirection]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsersStats(currentPage, pageSize);
      if (response.status === 200) {
        setUsersStats(response.data);
        setError('');
      } else {
        setError('Erro ao carregar usuários');
      }
    } catch (err) {
      setError('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(0);
    loadUsers();
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
    setCurrentPage(0);
  };

  const filteredUsers = usersStats?.content?.filter(user =>
    user.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleUserDetails = async (user: any) => {
    setSelectedUser(user);
    setLoadingDetails(true);
    try {
      const response = await getUserFullDetails(user.id);
      if (response.status === 200) {
        setUserDetails(response.data);
      } else {
        setUserDetails(null);
      }
    } catch (err) {
      setUserDetails(null);
    } finally {
      setLoadingDetails(false);
    }
  };

  const closeModal = () => {
    setSelectedUser(null);
    setUserDetails(null);
  };

  const handlePlanAction = (action: 'renew' | 'change' | 'trial') => {
    setPlanModalAction(action);
    setShowPlanModal(true);
  };

  const handlePlanModalSuccess = () => {
    setShowPlanModal(false);
    // Recarregar os detalhes do usuário
    if (selectedUser) {
      handleUserDetails(selectedUser);
    }
  };

  const handleDeleteUser = () => {
    setShowDeleteModal(true);
    setDeleteError('');
  };

  const confirmDeleteUser = async () => {
    if (!selectedUser) return;

    setDeleteLoading(true);
    setDeleteError('');

    try {
      const token = localStorage.getItem('token');
      const tokenString = token ? JSON.parse(token) : '';

      const response = await fetch(`https://standi-api-dd146fec77bd.herokuapp.com/admin/stats/users/${selectedUser.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': tokenString,
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();

      if (result.success) {
        setShowDeleteModal(false);
        closeModal();
        loadUsers(); // Recarregar a lista de usuários
        alert('Usuário excluído com sucesso!');
      } else {
        setDeleteError(result.message || 'Erro ao excluir usuário');
      }
    } catch (error) {
      setDeleteError('Erro ao excluir usuário. Tente novamente.');
      console.error('Erro ao excluir usuário:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getPlanStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo':
        return '#28a745';
      case 'Período de Teste':
        return '#17a2b8';
      case 'Vencido':
        return '#dc3545';
      case 'Inativo':
        return '#6c757d';
      default:
        return '#6c757d';
    }
  };

  const totalPages = usersStats?.totalPages || 0;

  return (
    <UsersListContainer>
      <Header>
        <h1><AiOutlineUser /> Gerenciamento de Usuários</h1>
        <p>Visualize e gerencie todos os usuários cadastrados na plataforma</p>
      </Header>

      <SearchContainer>
        <div style={{ position: 'relative', flex: 1 }}>
          <SearchInput
            type="text"
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <AiOutlineSearch 
            style={{ 
              position: 'absolute', 
              right: '10px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: '#666',
              cursor: 'pointer'
            }}
            onClick={handleSearch}
          />
        </div>
        
        <FilterSelect value={sortBy} onChange={(e) => handleSort(e.target.value)}>
          <option value="createdAt">Data de Cadastro</option>
          <option value="slug">Nome</option>
          <option value="email">Email</option>
          <option value="propertiesCount">Propriedades</option>
          <option value="leadsCount">Leads</option>
        </FilterSelect>
      </SearchContainer>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <TableContainer>
        <UsersTable>
          <thead>
            <tr>
              <th onClick={() => handleSort('slug')} style={{ cursor: 'pointer' }}>
                Nome {sortBy === 'slug' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('email')} style={{ cursor: 'pointer' }}>
                Email {sortBy === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('createdAt')} style={{ cursor: 'pointer' }}>
                Data de Cadastro {sortBy === 'createdAt' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('propertiesCount')} style={{ cursor: 'pointer' }}>
                Propriedades {sortBy === 'propertiesCount' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('leadsCount')} style={{ cursor: 'pointer' }}>
                Leads {sortBy === 'leadsCount' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '40px' }}>
                  <LoadingSpinner />
                  Carregando usuários...
                </td>
              </tr>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <UserRow key={user.id}>
                  <td>{user.slug}</td>
                  <td>{user.email}</td>
                  <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR') : 'N/A'}</td>
                  <td>{user.propertiesCount}</td>
                  <td>{user.leadsCount}</td>
                  <td>
                    <button 
                      onClick={() => handleUserDetails(user)}
                      style={{
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      Ver Detalhes
                    </button>
                  </td>
                </UserRow>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
                  Nenhum usuário encontrado
                </td>
              </tr>
            )}
          </tbody>
        </UsersTable>
      </TableContainer>

      {totalPages > 1 && (
        <PaginationContainer>
          <PaginationButton 
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
          >
            Anterior
          </PaginationButton>
          
          <span>
            Página {currentPage + 1} de {totalPages}
          </span>
          
          <PaginationButton 
            onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
            disabled={currentPage >= totalPages - 1}
          >
            Próxima
          </PaginationButton>
        </PaginationContainer>
      )}

      {selectedUser && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>
              <AiOutlineClose />
            </CloseButton>
            <h2>Detalhes do Usuário</h2>
            
            {loadingDetails ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <LoadingSpinner />
                Carregando detalhes...
              </div>
            ) : userDetails ? (
              <div>
                {/* Informações básicas */}
                <div style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                  <h3 style={{ color: '#333', marginBottom: '10px' }}>Informações Básicas</h3>
                  <div style={{ marginBottom: '10px' }}>
                    <strong>Nome:</strong> {userDetails.slug}
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <strong>Email:</strong> {userDetails.email}
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <strong>Senha:</strong> {userDetails.password}
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <strong>Data de Cadastro:</strong> {formatDate(userDetails.createdAt)}
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <strong>Propriedades:</strong> {userDetails.propertiesCount}
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <strong>Leads:</strong> {userDetails.leadsCount}
                  </div>
                </div>

                {/* Informações do plano */}
                <div style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                  <h3 style={{ color: '#333', marginBottom: '10px' }}>Plano Atual</h3>
                  <div style={{ marginBottom: '10px' }}>
                    <strong>Tipo do Plano:</strong> {userDetails.planType || 'Sem plano'}
                  </div>
                  {userDetails.planName && (
                    <div style={{ marginBottom: '10px' }}>
                      <strong>Nome do Plano:</strong> {userDetails.planName}
                    </div>
                  )}
                  <div style={{ marginBottom: '10px' }}>
                    <strong>Status:</strong> 
                    <span style={{ 
                      color: getPlanStatusColor(userDetails.planStatus),
                      fontWeight: 'bold',
                      marginLeft: '5px'
                    }}>
                      {userDetails.planStatus || 'Sem plano'}
                    </span>
                  </div>
                  {userDetails.planStartDate && (
                    <div style={{ marginBottom: '10px' }}>
                      <strong>Data de Início:</strong> {formatDate(userDetails.planStartDate)}
                    </div>
                  )}
                  {userDetails.planEndDate && (
                    <div style={{ marginBottom: '10px' }}>
                      <strong>Data de Vencimento:</strong> {formatDate(userDetails.planEndDate)}
                    </div>
                  )}
                  {userDetails.isTrialActive && (
                    <div style={{ marginBottom: '10px', color: '#17a2b8' }}>
                      <strong>🎯 Período de teste ativo</strong>
                    </div>
                  )}
                </div>

                {/* Ações do administrador */}
                <div style={{ marginBottom: '15px' }}>
                  <h3 style={{ color: '#333', marginBottom: '10px' }}>Ações do Administrador</h3>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                      style={{
                        background: '#28a745',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                      onClick={() => handlePlanAction('renew')}
                    >
                      Ações no Plano
                    </button>
                    
                    <button
                      style={{
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                      onClick={() => handleDeleteUser()}
                    >
                      Excluir Usuário
                    </button>
        
       
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                Erro ao carregar detalhes do usuário
              </div>
            )}
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Modal de gerenciamento de planos */}
      <AdminPlanModal
        isOpen={showPlanModal}
        onClose={() => setShowPlanModal(false)}
        userId={selectedUser?.id}
        userEmail={selectedUser?.email}
        currentPlan={userDetails?.planType}
        onSuccess={handlePlanModalSuccess}
      />

      {/* Modal de confirmação de exclusão */}
      {showDeleteModal && (
        <ModalOverlay onClick={() => setShowDeleteModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px' }}>
            <CloseButton onClick={() => setShowDeleteModal(false)}>
              <AiOutlineClose />
            </CloseButton>
            
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h3 style={{ color: '#dc3545', marginBottom: '20px' }}>
                Confirmar Exclusão
              </h3>
              
              <p style={{ marginBottom: '20px', fontSize: '16px' }}>
                Tem certeza que deseja excluir o usuário?
              </p>
              
              <p style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>
                <strong>Usuário:</strong> {selectedUser?.email}
              </p>
              
              {deleteError && (
                <div style={{ 
                  color: '#dc3545', 
                  marginBottom: '20px', 
                  padding: '10px', 
                  backgroundColor: '#f8d7da', 
                  borderRadius: '4px',
                  fontSize: '14px'
                }}>
                  {deleteError}
                </div>
              )}
              
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button
                  style={{
                    background: '#6c757d',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                  onClick={() => setShowDeleteModal(false)}
                  disabled={deleteLoading}
                >
                  Cancelar
                </button>
                
                <button
                  style={{
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    opacity: deleteLoading ? 0.7 : 1
                  }}
                  onClick={confirmDeleteUser}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? 'Excluindo...' : 'Excluir'}
                </button>
              </div>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </UsersListContainer>
  );
};

export default UsersList;