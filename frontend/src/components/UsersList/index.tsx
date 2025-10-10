import React, { useState, useEffect } from 'react';
import { getUsersStats, UsersStatsResponse } from '../../services/resources/adminStats';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

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
                      onClick={() => setSelectedUser(user)}
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
        <ModalOverlay onClick={() => setSelectedUser(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setSelectedUser(null)}>
              <AiOutlineClose />
            </CloseButton>
            <h2>Detalhes do Usuário</h2>
            <div style={{ marginBottom: '15px' }}>
              <strong>Nome:</strong> {selectedUser.slug}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Email:</strong> {selectedUser.email}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Data de Cadastro:</strong> {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString('pt-BR') : 'N/A'}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Propriedades:</strong> {selectedUser.propertiesCount}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Leads:</strong> {selectedUser.leadsCount}
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </UsersListContainer>
  );
};

export default UsersList;