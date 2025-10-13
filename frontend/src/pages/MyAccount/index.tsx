/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useCallback } from 'react'
import BarTop from '../../components/Bartop';
import Header from '../../components/Header';
import {MdPhotoCamera} from 'react-icons/md';
import {AiOutlineEdit, AiOutlineCheck, AiOutlineClose} from 'react-icons/ai';
import {IoCloseOutline} from 'react-icons/io5';
import Modal from 'react-modal';
import api from '../../utils/requests';

import {MyAccountBackground,BodyMyAccountContainer,TitleWrapper, CardAccount, StatusBadge, ProgressBar, ActionButton, CardsContainer} from './styles';
import {  getImageIfExist, refreshToken, uploadProfileImage } from '../../services/resources/user';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import PageNotFound from '../../components/PageNotFound';
import { ErrorBoundary } from 'react-error-boundary';
import { deleteUserTenant, findAllUserTenant } from '../../services/resources/userTenant';
import { Tenant } from '../../types/tenant';
import Loading from '../../components/Loading';
import DomainManager from '../../components/DomainManager';
import CancelSubscriptionModal from '../../components/CancelSubscriptionModal';

const MyAccount = ()=>{

    const navigate = useNavigate();

    const [loading,setLoading]= useState(false);
    const [error,setError]= useState(false);
    const [errorMaxSize,setErrorMaxSize]= useState(false);
    const [successMessage,setSuccessMessage]= useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [showEmailChangeModal, setShowEmailChangeModal] = useState(false);

    const [fileBase64,setFileBase64]= useState<string>("");

    const [imageUser,setImageUser]= useState<string>("");

    // Estados para informações do plano
    const [planInfo, setPlanInfo] = useState<any>(null);
    const [loadingPlan, setLoadingPlan] = useState(false);

    // Estados para informações de pagamento
    const [paymentInfo, setPaymentInfo] = useState<any>(null);

    // Estados para o modal de cancelamento
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedSubscription, setSelectedSubscription] = useState<any>(null);

    // Estados para edição de perfil
    const [editingField, setEditingField] = useState<string | null>(null);
    const [editValues, setEditValues] = useState({
        name: '',
        email: '',
        phone: '',
        creci: ''
    });

    // Estados para alteração de senha
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordData, setPasswordData] = useState({
        newPassword: '',
        confirmPassword: ''
    });

    const {user, getCurrentUser} = useAuth();
    
    // useEffect para inicializar editValues com dados do usuário
    useEffect(() => {
        if (user) {
            setEditValues({
                name: user.slug || '',
                email: user.email || '',
                phone: user.phone || '',
                creci: user.creci || ''
            });
        }
    }, [user]);
    
    // Corrigindo o tratamento dos perfis - perfis é uma string, não um objeto
    let perfilAccount = user?.perfis ? user.perfis.includes('ACCOUNT') : false;
    let perfilAdmin = user?.perfis ? user.perfis.includes('ADMIN') : false;
    
    console.log('👤 Dados do usuário:', user);
    console.log('🔑 Perfis do usuário:', user?.perfis);
    console.log('📋 perfilAccount:', perfilAccount);
    console.log('🔧 perfilAdmin:', perfilAdmin);

    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [loadingTenants, setLoadingTenants] = useState(false);

    // Função para formatar data
    const formatDate = (dateInput: string | number | Date) => {
        if (!dateInput) return 'N/A';
        
        let date: Date;
        
        // Se for um timestamp Unix (número), multiplica por 1000 para converter para milliseconds
        if (typeof dateInput === 'number') {
            date = new Date(dateInput * 1000);
        } else if (typeof dateInput === 'string') {
            date = new Date(dateInput);
        } else {
            date = dateInput;
        }
        
        // Verifica se a data é válida
        if (isNaN(date.getTime())) {
            return 'Data inválida';
        }
        
        return date.toLocaleDateString('pt-BR');
    };

    // Função para buscar informações do plano
    const fetchPlanInfo = useCallback(async () => {
        console.log('🔍 fetchPlanInfo chamada - perfilAccount:', perfilAccount);
        if (!perfilAccount) {
            console.log('❌ fetchPlanInfo cancelada - usuário não tem perfil ACCOUNT');
            return;
        }
        
        setLoadingPlan(true);
        console.log('⏳ Iniciando busca de informações do plano...');
        try {
            // Usando endpoint /plans/current para obter dados do plano atual
            const response = await api.get('/plans/current');
            console.log('📡 Resposta da API /plans/current:', response.data);
            
            if (response.data && response.data.planType) {
                // O backend retorna os dados diretamente, não em um objeto 'plan'
                const planData = response.data;
                
                // Transforma os dados da API para o formato esperado pelo novo layout
                const transformedPlanInfo = {
                    planType: planData.planName || 'Plano Básico',
                    isActive: planData.isPlanActive || false,
                    isTrialActive: planData.isTrialActive || false,
                    planEndDate: planData.planEndDate || null
                };
                
                console.log('✅ Dados do plano transformados:', transformedPlanInfo);
                setPlanInfo(transformedPlanInfo);
            } else {
                console.log('❌ Nenhum plano ativo encontrado');
                setPlanInfo(null);
            }
        } catch (error) {
            console.error('❌ Erro ao buscar informações do plano:', error);
            setPlanInfo(null);
        } finally {
            setLoadingPlan(false);
            console.log('🏁 fetchPlanInfo finalizada');
        }
    }, [perfilAccount]);

    // Função para buscar informações de pagamento
    const fetchPaymentInfo = useCallback(async () => {
        if (!perfilAccount) return;
        
        try {
            const response = await api.get('/payment/info');
            if (response.data.success) {
                setPaymentInfo(response.data);
            }
        } catch (error) {
            console.error('Erro ao buscar informações de pagamento:', error);
        }
    }, [perfilAccount]);

    // Função para cancelar assinatura
    const handleCancelSubscription = async (subscriptionId: string) => {
        try {
            const response = await api.post(`/subscription/cancel/${subscriptionId}`);
            if (response.data.success) {
                setShowCancelModal(false);
                fetchPlanInfo(); // Atualizar informações do plano
                // Mostrar mensagem de sucesso
            }
        } catch (error) {
            console.error('Erro ao cancelar assinatura:', error);
        }
    };

    // Função para iniciar edição de campo
    const startEditing = (field: string, currentValue: string) => {
        setEditingField(field);
        setEditValues(prev => ({
            ...prev,
            [field]: currentValue
        }));
    };

    // Função para cancelar edição
    const cancelEditing = () => {
        setEditingField(null);
        setEditValues({
            name: '',
            email: '',
            phone: '',
            creci: ''
        });
    };

    // Função para salvar edição
    const saveEdit = async (field: string) => {
        try {
            // Mapear o campo 'name' para 'slug' na API
            const apiField = field === 'name' ? 'slug' : field;
            
            console.log('Salvando campo:', field, 'como:', apiField, 'com valor:', editValues[field as keyof typeof editValues]);
            
            const response = await api.put('/user/update-profile', {
                [apiField]: editValues[field as keyof typeof editValues]
            });
            
            console.log('Resposta da API:', response.data);
            
            if (response.data.success) {
                // Atualizar dados do usuário no contexto
                setEditingField(null);
                
                // Se o campo alterado foi o email, redirecionar para login
                if (field === 'email') {
                    // Limpar dados de autenticação
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    
                    // Mostrar modal informativo
                    setShowEmailChangeModal(true);
                    return;
                }
                
                try {
                    // Para outros campos, recarregar os dados do usuário normalmente
                    const updatedUser = await getCurrentUser();
                    console.log('Dados do usuário recarregados com sucesso:', updatedUser);
                    
                    // Atualizar os valores de edição com os dados mais recentes
                    setEditValues({
                        name: updatedUser.slug || '',
                        email: updatedUser.email || '',
                        creci: updatedUser.creci || '',
                        phone: ''
                    });
                    
                } catch (userError) {
                    console.error('Erro ao recarregar dados do usuário:', userError);
                    // Mesmo com erro ao recarregar, mostra sucesso do salvamento
                }
                
                // Mostrar mensagem de sucesso
                setSuccessMessage(true);
                setTimeout(() => setSuccessMessage(false), 3000);
            } else {
                console.error('API retornou sucesso false:', response.data.message);
                setError(true);
                setTimeout(() => setError(false), 3000);
            }
        } catch (error: any) {
            console.error('Erro ao atualizar perfil:', error);
            
            // Verificar se é erro de email duplicado
            if (error.response?.status === 409) {
                console.error('Email já está em uso');
                // Usar a mensagem do backend se disponível
                const backendMessage = error.response?.data?.message || 'Este email já está sendo usado por outro usuário.';
                setErrorMessage(backendMessage);
                setError(true);
                setTimeout(() => {
                    setError(false);
                    setErrorMessage('');
                }, 5000);
            } else {
                // Para outros erros, usar mensagem genérica
                const backendMessage = error.response?.data?.message || 'Erro ao atualizar perfil. Tente novamente.';
                setErrorMessage(backendMessage);
                setError(true);
                setTimeout(() => {
                    setError(false);
                    setErrorMessage('');
                }, 5000);
            }
        }
    };

    // Função para alterar senha
    const handlePasswordChange = async () => {
        // Validação de senha mínima de 8 caracteres
        if (passwordData.newPassword.length < 8) {
            setErrorMessage('A nova senha deve ter pelo menos 8 caracteres.');
            setError(true);
            setTimeout(() => {
                setError(false);
                setErrorMessage('');
            }, 3000);
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setErrorMessage('As senhas não coincidem.');
            setError(true);
            setTimeout(() => {
                setError(false);
                setErrorMessage('');
            }, 3000);
            return;
        }

        setPasswordLoading(true);
        try {
            const response = await api.put('/user/change-password', {
                newPassword: passwordData.newPassword
            });

            if (response.data.success) {
                setShowPasswordModal(false);
                setPasswordData({
                    newPassword: '',
                    confirmPassword: ''
                });
                setSuccessMessage(true);
                setTimeout(() => setSuccessMessage(false), 3000);
            }
        } catch (error) {
            console.error('Erro ao alterar senha:', error);
            setErrorMessage('Erro ao alterar senha.');
            setError(true);
            setTimeout(() => {
                setError(false);
                setErrorMessage('');
            }, 3000);
        } finally {
            setPasswordLoading(false);
        }
    };

    // Função de upload de imagem - DESATIVADA
    /*
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Verificar tamanho do arquivo (máximo 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setErrorMaxSize(true);
                setTimeout(() => setErrorMaxSize(false), 3000);
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const base64 = e.target?.result as string;
                setFileBase64(base64);
                handleUploadImage(base64);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadImage = async (base64: string) => {
        setLoading(true);
        try {
            const response = await uploadProfileImage(base64);
            if (response.success) {
                setImageUser(response.imageUrl);
                setSuccessMessage(true);
                setTimeout(() => setSuccessMessage(false), 3000);
            } else {
                setError(true);
                setTimeout(() => setError(false), 3000);
            }
        } catch (error) {
            console.error('Erro ao fazer upload da imagem:', error);
            setError(true);
            setTimeout(() => setError(false), 3000);
        } finally {
            setLoading(false);
        }
    };
    */

    const loadUserImage = useCallback(async () => {
        try {
            if (user?.id) {
                const perfil = perfilAdmin ? 'ADMIN' : 'ACCOUNT';
                const imageUrl = await getImageIfExist(user.id, perfil);
                if (imageUrl) {
                    setImageUser(imageUrl);
                }
            }
        } catch (error) {
            console.error('Erro ao carregar imagem do usuário:', error);
        }
    }, [user?.id, perfilAdmin]);

    const loadTenants = useCallback(async () => {
        if (!perfilAccount) return;
        
        setLoadingTenants(true);
        try {
            const response = await findAllUserTenant();
            if (response.status === 200 && response.data) {
                setTenants(response.data);
            }
        } catch (error) {
            console.error('Erro ao carregar tenants:', error);
        } finally {
            setLoadingTenants(false);
        }
    }, [perfilAccount]);

    const handleDeleteTenant = async (tenantId: number) => {
        if (!user?.id) return;
        
        try {
            const response = await deleteUserTenant(tenantId.toString());
            if (response.status === 204) {
                setTenants(prev => prev.filter(tenant => tenant.id !== tenantId));
                setSuccessMessage(true);
                setTimeout(() => setSuccessMessage(false), 3000);
            }
        } catch (error) {
            console.error('Erro ao deletar tenant:', error);
            setError(true);
            setTimeout(() => setError(false), 3000);
        }
    };

    useEffect(() => {
        if (user?.id) {
            loadUserImage();
            loadTenants();
            fetchPlanInfo();
            fetchPaymentInfo();
        }
    }, [user?.id, loadUserImage, loadTenants, fetchPlanInfo, fetchPaymentInfo]);

    return (
        <ErrorBoundary fallback={<div>Algo deu errado. Tente recarregar a página.</div>}>
            <div>
                {user.id ? (
                    <MyAccountBackground>
                       <Header />
                        <BarTop />
                        <BodyMyAccountContainer>
                           
                            <TitleWrapper>
                                <h1>Minha Conta</h1>
                            </TitleWrapper>

                            {/* Mensagens de feedback */}
                            {successMessage && (
                                <div style={{
                                    background: '#d4edda',
                                    color: '#155724',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    margin: '10px 0',
                                    border: '1px solid #c3e6cb'
                                }}>
                                    Operação realizada com sucesso!
                                </div>
                            )}

                            {error && (
                                <div style={{
                                    background: '#f8d7da',
                                    color: '#721c24',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    margin: '10px 0',
                                    border: '1px solid #f5c6cb'
                                }}>
                                    {errorMessage || 'Ocorreu um erro. Tente novamente.'}
                                </div>
                            )}

                            {errorMaxSize && (
                                <div style={{
                                    background: '#f8d7da',
                                    color: '#721c24',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    margin: '10px 0',
                                    border: '1px solid #f5c6cb'
                                }}>
                                    Arquivo muito grande. Máximo 5MB.
                                </div>
                            )}

                            <CardsContainer>
                                {/* Profile Card */}
                                <CardAccount status='ACTIVE'>
                                    <div className='card-account-wrapper'>
                                        <h2>Informações Pessoais</h2>
                                        
                                        {/* Profile Image - Apenas Iniciais */}
                                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                            <div style={{ 
                                                position: 'relative', 
                                                display: 'inline-block',
                                                width: '100px',
                                                height: '100px',
                                                borderRadius: '50%',
                                                overflow: 'hidden',
                                                border: '3px solid #ddd'
                                            }}>
                                                {/* Sempre exibir apenas as iniciais */}
                                                <div style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    background: '#f0f0f0',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '40px',
                                                    color: '#999'
                                                }}>
                                                    {user.slug?.charAt(0).toUpperCase() || 'U'}
                                                </div>
                                                
                                                {/* Upload desativado - código comentado */}
                                                {/*
                                                <label style={{
                                                    position: 'absolute',
                                                    bottom: '0',
                                                    right: '0',
                                                    background: '#007bff',
                                                    color: 'white',
                                                    borderRadius: '50%',
                                                    width: '30px',
                                                    height: '30px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                    border: '2px solid white'
                                                }}>
                                                    <MdPhotoCamera size={16} />
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                        style={{ display: 'none' }}
                                                    />
                                                </label>
                                                */}
                                            </div>
                                            {/* Loading desativado para upload */}
                                            {/* {loading && <Loading />} */}
                                        </div>

                                        {/* Profile Fields */}
                                        <div className='card-account-wrapper-name'>
                                            <label>Nome</label>
                                            {editingField === 'name' ? (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <input
                                                        type="text"
                                                        value={editValues.name}
                                                        onChange={(e) => setEditValues(prev => ({ ...prev, name: e.target.value }))}
                                                        style={{
                                                            flex: 1,
                                                            padding: '8px',
                                                            border: '1px solid #ddd',
                                                            borderRadius: '4px'
                                                        }}
                                                    />
                                                    <button onClick={() => saveEdit('name')} style={{ background: 'none', border: 'none', color: '#28a745', cursor: 'pointer' }}>
                                                        <AiOutlineCheck size={20} />
                                                    </button>
                                                    <button onClick={cancelEditing} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }}>
                                                        <AiOutlineClose size={20} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <p>{user.slug}</p>
                                                    <button 
                                                        onClick={() => startEditing('name', user.slug || '')}
                                                        style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}
                                                    >
                                                        <AiOutlineEdit size={16} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <div className='card-account-wrapper-name'>
                                            <label>Email</label>
                                            {editingField === 'email' ? (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <input
                                                        type="email"
                                                        value={editValues.email}
                                                        onChange={(e) => setEditValues(prev => ({ ...prev, email: e.target.value }))}
                                                        style={{
                                                            flex: 1,
                                                            padding: '8px',
                                                            border: '1px solid #ddd',
                                                            borderRadius: '4px'
                                                        }}
                                                    />
                                                    <button onClick={() => saveEdit('email')} style={{ background: 'none', border: 'none', color: '#28a745', cursor: 'pointer' }}>
                                                        <AiOutlineCheck size={20} />
                                                    </button>
                                                    <button onClick={cancelEditing} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }}>
                                                        <AiOutlineClose size={20} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <p>{user.email}</p>
                                                    <button 
                                                        onClick={() => startEditing('email', user.email || '')}
                                                        style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}
                                                    >
                                                        <AiOutlineEdit size={16} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <div className='card-account-wrapper-name'>
                                            <label>Telefone</label>
                                            {editingField === 'phone' ? (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <input
                                                        type="tel"
                                                        value={editValues.phone}
                                                        onChange={(e) => {
                                                            // Validação: apenas números e máximo 11 caracteres
                                                            const numericValue = e.target.value.replace(/\D/g, '').slice(0, 11);
                                                            setEditValues(prev => ({ ...prev, phone: numericValue }));
                                                        }}
                                                        placeholder="Digite apenas números"
                                                        maxLength={11}
                                                        style={{
                                                            flex: 1,
                                                            padding: '8px',
                                                            border: '1px solid #ddd',
                                                            borderRadius: '4px'
                                                        }}
                                                    />
                                                    <button onClick={() => saveEdit('phone')} style={{ background: 'none', border: 'none', color: '#28a745', cursor: 'pointer' }}>
                                                        <AiOutlineCheck size={20} />
                                                    </button>
                                                    <button onClick={cancelEditing} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }}>
                                                        <AiOutlineClose size={20} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <p>{user?.phone || 'Não informado'}</p>
                                                    <button
                                                        onClick={() => startEditing('phone', user?.phone || '')}
                                                        style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}
                                                    >
                                                        <AiOutlineEdit size={16} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Password Change Section */}
                                        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
                                            <button
                                                onClick={() => setShowPasswordModal(true)}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: '#007bff',
                                                    textDecoration: 'underline',
                                                    cursor: 'pointer',
                                                    fontSize: '14px'
                                                }}
                                            >
                                                Alterar senha
                                            </button>
                                        </div>
                                    </div>
                                </CardAccount>

                                {/* Plan Information Card - Only for Account users */}
        {perfilAccount && (
          <CardAccount status='ACTIVE'>
            <div className='card-account-wrapper'>
              <h2>Plano Atual</h2>
              
              {loadingPlan ? (
                <div style={{textAlign: 'center', padding: '20px'}}>
                  <Loading />
                </div>
              ) : planInfo ? (
                <>
                  <div className='card-account-wrapper-name'>
                    <label>Plano</label>
                    <p>{planInfo.planType}</p>
                  </div>
                  
                  <div className='card-account-wrapper-email'>
                    <label>Status</label>
                    <p style={{color: planInfo.isActive ? '#28a745' : '#dc3545'}}>
                      {planInfo.isActive ? 'Ativo' : 'Inativo'}
                    </p>
                  </div>
                  
                  {planInfo.isTrialActive && (
                    <div className='card-account-wrapper-status'>
                      <label>Período de Teste</label>
                      <p style={{color: '#ffc107'}}>
                        Expira em: {formatDate(planInfo.planEndDate)}
                      </p>
                    </div>
                  )}
                  
                  {!planInfo.isTrialActive && (
                    <div className='card-account-wrapper-status'>
                      <label>Válido até</label>
                      <p>{formatDate(planInfo.planEndDate)}</p>
                    </div>
                  )}
                  
                  <div className='card-account-wrapper-email'>
                    <label>Ações</label>
                    <Link to="/plans" style={{color: '#007bff', textDecoration: 'none'}}>
                      Ver todos os planos
                    </Link>
                  </div>
                </>
              ) : (
                <div className='card-account-wrapper-email'>
                  <label>Plano</label>
                  <p>Erro ao carregar informações do plano</p>
                </div>
              )}
            </div>
          </CardAccount>
        )}

                                {/* Payment Information Card - Only for Account users */}
                                {perfilAccount && (
                                    <CardAccount status='ACTIVE'>
                                        <div className='card-account-wrapper'>
                                            <h2>Informações de Pagamento</h2>
                                            
                                            {paymentInfo && paymentInfo.success ? (
                                                <>
                                                    <div className='card-account-wrapper-name'>
                                                        <label>Nome</label>
                                                        <p>{paymentInfo.customerInfo.name}</p>
                                                    </div>
                                                    
                                                    <div className='card-account-wrapper-name'>
                                                        <label>Email</label>
                                                        <p>{paymentInfo.customerInfo.email}</p>
                                                    </div>

                                                    <div className='card-account-wrapper-name'>
                                                        <label>Documento</label>
                                                        <p>{paymentInfo.customerInfo.document}</p>
                                                    </div>

                                                    {paymentInfo.subscriptions && paymentInfo.subscriptions.length > 0 && (
                                                        <div className='card-account-wrapper-name'>
                                                            <label>Assinaturas</label>
                                                            <ul style={{listStyle: 'none', padding: 0}}>
                                                                {paymentInfo.subscriptions.map((sub: any, index: number) => (
                                                                    <li key={index} style={{
                                                                        padding: '10px',
                                                                        margin: '5px 0',
                                                                        background: '#f8f9fa',
                                                                        borderRadius: '5px',
                                                                        border: '1px solid #dee2e6'
                                                                    }}>
                                                                        <strong>Plano:</strong> {sub.planName}<br/>
                                                                        <strong>Status:</strong> {sub.status}<br/>
                                                                        <strong>Valor:</strong> R$ {sub.amount}<br/>
                                                                        {sub.nextBillingDate && (
                                                                            <>
                                                                                <strong>Próxima cobrança:</strong> {formatDate(sub.nextBillingDate)}
                                                                            </>
                                                                        )}
                                                                        {sub.status === 'ACTIVE' && (
                                                                            <div style={{marginTop: '10px'}}>
                                                                                <ActionButton 
                                                                                    onClick={() => {
                                                                                        setSelectedSubscription(sub);
                                                                                        setShowCancelModal(true);
                                                                                    }}
                                                                                    variant="danger"
                                                                                >
                                                                                    Cancelar
                                                                                </ActionButton>
                                                                            </div>
                                                                        )}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <p>Nenhuma informação de pagamento disponível</p>
                                            )}
                                        </div>
                                    </CardAccount>
                                )}

                             
                            </CardsContainer>
                        </BodyMyAccountContainer>
                    </MyAccountBackground>
                ) : (
                    <PageNotFound/>
                )}

                {/* Modal de cancelamento de assinatura */}
                {showCancelModal && selectedSubscription && (
                    <CancelSubscriptionModal
                        isOpen={showCancelModal}
                        onClose={() => setShowCancelModal(false)}
                        onSuccess={() => handleCancelSubscription(selectedSubscription.id)}
                        subscription={selectedSubscription}
                    />
                )}

                {/* Password Change Modal */}
                {showPasswordModal && (
                    <Modal
                        isOpen={showPasswordModal}
                        onRequestClose={() => setShowPasswordModal(false)}
                        style={{
                            content: {
                                top: '50%',
                                left: '50%',
                                right: 'auto',
                                bottom: 'auto',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)',
                                width: '400px',
                                padding: '20px',
                                borderRadius: '8px',
                                border: '1px solid #ddd'
                            },
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }}
                    >
                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={() => setShowPasswordModal(false)}
                                style={{
                                    position: 'absolute',
                                    top: '-10px',
                                    right: '-10px',
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '20px',
                                    cursor: 'pointer',
                                    color: '#666'
                                }}
                            >
                                <IoCloseOutline />
                            </button>
                            
                            <h3 style={{ marginBottom: '20px', marginTop: '0' }}>Alterar Senha</h3>
                            
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                    Nova Senha
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        border: passwordData.newPassword.length > 0 && passwordData.newPassword.length < 8 
                                            ? '1px solid #dc3545' 
                                            : '1px solid #ddd',
                                        borderRadius: '4px',
                                        fontSize: '14px'
                                    }}
                                />
                                <small style={{ 
                                    color: passwordData.newPassword.length > 0 && passwordData.newPassword.length < 8 
                                        ? '#dc3545' 
                                        : '#6c757d',
                                    fontSize: '12px',
                                    marginTop: '5px',
                                    display: 'block'
                                }}>
                                    Mínimo de 8 caracteres
                                </small>
                            </div>
                            
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                    Confirmar Nova Senha
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        fontSize: '14px'
                                    }}
                                />
                            </div>
                            
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                <button
                                    onClick={() => {
                                        setShowPasswordModal(false);
                                        setPasswordData({
                                            newPassword: '',
                                            confirmPassword: ''
                                        });
                                    }}
                                    style={{
                                        background: '#6c757d',
                                        color: 'white',
                                        border: 'none',
                                        padding: '10px 20px',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '14px'
                                    }}
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handlePasswordChange}
                                    disabled={passwordLoading}
                                    style={{
                                        background: passwordLoading ? '#6c757d' : '#28a745',
                                        color: 'white',
                                        border: 'none',
                                        padding: '10px 20px',
                                        borderRadius: '4px',
                                        cursor: passwordLoading ? 'not-allowed' : 'pointer',
                                        fontSize: '14px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    {passwordLoading && (
                                        <div
                                            style={{
                                                width: '16px',
                                                height: '16px',
                                                border: '2px solid #ffffff',
                                                borderTop: '2px solid transparent',
                                                borderRadius: '50%',
                                                animation: 'spin 1s linear infinite'
                                            }}
                                        />
                                    )}
                                    {passwordLoading ? 'Salvando...' : 'Salvar'}
                                </button>
                            </div>
                        </div>
                    </Modal>
                )}

                {/* Modal de confirmação de alteração de email */}
                {showEmailChangeModal && (
                    <Modal
                        isOpen={showEmailChangeModal}
                        onRequestClose={() => {}}
                        contentLabel="Email Alterado"
                        style={{
                            content: {
                                top: '50%',
                                left: '50%',
                                right: 'auto',
                                bottom: 'auto',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)',
                                width: '400px',
                                maxWidth: '90vw',
                                padding: '30px',
                                borderRadius: '8px',
                                border: '1px solid #ddd'
                            },
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }}
                    >
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ 
                                fontSize: '48px', 
                                color: '#28a745', 
                                marginBottom: '20px' 
                            }}>
                                ✓
                            </div>
                            
                            <h3 style={{ 
                                marginBottom: '20px', 
                                marginTop: '0',
                                color: '#333',
                                fontSize: '20px'
                            }}>
                                Email Alterado com Sucesso!
                            </h3>
                            
                            <p style={{ 
                                marginBottom: '30px',
                                color: '#666',
                                lineHeight: '1.5',
                                fontSize: '16px'
                            }}>
                                Seu email foi alterado com sucesso. Você será redirecionado para a página de login para fazer login com o novo email.
                            </p>
                            
                            <button
                                onClick={() => {
                                    setShowEmailChangeModal(false);
                                    navigate('/');
                                }}
                                style={{
                                    background: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    padding: '12px 30px',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    fontWeight: 'bold'
                                }}
                            >
                                Ir para Login
                            </button>
                        </div>
                    </Modal>
                )}
            </div>
        </ErrorBoundary>
    );
};

export default MyAccount;