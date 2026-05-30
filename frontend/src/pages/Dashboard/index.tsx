import { BodyContainer, DashboardBackground, KPICard, KPIGrid, ListContainer, ListItem, MainGrid, SectionCard } from './styles';
import Header from '../../components/Header';
import BarTop from '../../components/Bartop';
import { useEffect, useState } from 'react';
import { BsBuilding, BsRocket } from 'react-icons/bs';
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { refreshToken } from '../../services/resources/user';
import { getPublishedPropertiesById, getTotalPropertiesById } from '../../services/resources/property';
import { getTotalLeadsById } from '../../services/resources/lead';
import { fetchEmpreendimentos } from '../Empreendimentos/api';
import { Empreendimento } from '../Empreendimentos/storage';

import PageNotFoundDashboard from '../../components/PageNotFoundDashboard';
import { ErrorBoundary } from 'react-error-boundary';
import useAuth from '../../hooks/useAuth';
import Funil from '../../components/Funnel';
import AdminStats from '../../components/AdminStats';
import useTrialStatus from '../../hooks/useTrialStatus';
import TrialWarningBanner from '../../components/TrialWarningBanner';

const Dashboard = () => {
    const navigate = useNavigate();

    const [totalProperties, setTotalProperties] = useState();
    const [publishedProperties, setPublishedProperties] = useState();
    const [totalLeads, setTotalLeads] = useState();
    const [empreendimentos, setEmpreendimentos] = useState<Empreendimento[]>([]);
    const [errors, setErrors] = useState(false);
    
    const { user, getCurrentUser } = useAuth();
    const trialStatus = useTrialStatus();
    
    const refreshTokenUser = async () => {
        const resp = await refreshToken();    
        if(resp === 204) {  
         navigate('/dashboard')
        } else {         
           navigate('/');
        }
    }

    useEffect(() => {
      refreshTokenUser()
    }, [])
    
    useEffect(() => {
        getCurrentUser()
        if(user === null){
            setErrors(true)
        }
    }, [])

    const getTotalProperties = async() => {
        const data = await getTotalPropertiesById(user.id);                
        if(data.status === 200){
            setTotalProperties(data.data);                   
        }
    }  

    const getTotalLeads = async() => {
        const dataL = await getTotalLeadsById(user.id);
        if(dataL.status === 200){                   
            setTotalLeads(dataL.data);                    
        }
    }  

    const getPublishedProperties = async() => {
        const data = await getPublishedPropertiesById(user.id);                
        if(data.status === 200){
            setPublishedProperties(data.data);                   
        }
    }  

    const getEmpreendimentos = async () => {
        try {
            const data = await fetchEmpreendimentos();
            setEmpreendimentos(data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {  
        if(user.id !== ''){
            getTotalProperties();
            getTotalLeads();
            getPublishedProperties();
            getEmpreendimentos();
        }
    }, [user.id]);

    let perfilTenant = user?.perfis ? Object.values(user.perfis).some(obj => obj === 'TENANT') : false;

    return (
        <>
            <div>
                <ErrorBoundary FallbackComponent={PageNotFoundDashboard}>
                    {!errors ?    
                    <DashboardBackground>
                        <Header />     
                        <BarTop />

                        <AdminStats isVisible={user?.perfis?.includes('ADMIN')} />
                        
                        {trialStatus.isActive && !trialStatus.isExpired && (
                            <TrialWarningBanner 
                            daysRemaining={trialStatus.daysRemaining}
                            onViewPlans={() => navigate('/plans')}
                            />
                        )}
                        
                        {perfilTenant ? 
                        <BodyContainer>
                            <div className="welcome-header">
                                <h1>Dashboard</h1>
                                <div className="action-buttons">
                                    <button className="btn-secondary" onClick={() => navigate('/properties')}>Imóveis</button>
                                    <button className="btn-primary" onClick={() => navigate('/empreendimentos')}>Novo Lançamento</button>
                                </div>
                            </div>

                            <KPIGrid>
                                <KPICard>
                                    <div className="kpi-header"><AiOutlineHome /> Imóveis Cadastrados</div>
                                    <div className="kpi-value">{totalProperties || 0}</div>
                                </KPICard>
                                <KPICard>
                                    <div className="kpi-header"><BsRocket /> Lançamentos Ativos</div>
                                    <div className="kpi-value">{empreendimentos.length || 0}</div>
                                </KPICard>
                                <KPICard>
                                    <div className="kpi-header"><AiOutlineUser /> Total de Leads</div>
                                    <div className="kpi-value">{totalLeads || 0}</div>
                                </KPICard>
                                <KPICard>
                                    <div className="kpi-header"><IoCloudUploadOutline /> Imóveis Publicados</div>
                                    <div className="kpi-value">{publishedProperties || 0}</div>
                                </KPICard>
                            </KPIGrid>

                            <MainGrid>
                                <SectionCard>
                                    <div className="section-header">
                                        <div className="title-block">
                                            <h2>Oportunidades Recentes</h2>
                                            <p>Acompanhe e gerencie seus lançamentos ativos.</p>
                                        </div>
                                        <button className="action-link" onClick={() => navigate('/empreendimentos')}>Ver todas</button>
                                    </div>

                                    <ListContainer>
                                        {empreendimentos.slice(0, 5).map(emp => (
                                            <ListItem key={emp.id}>
                                                <div className="item-info">
                                                    <div className="item-image"><BsBuilding /></div>
                                                    <div className="item-text">
                                                        <h4>{emp.nome}</h4>
                                                        <p>Criado em: {new Date(emp.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <div className="item-actions">
                                                    <span className="badge ativo">Ativo</span>
                                                    <button onClick={() => navigate(`/empreendimentos/${emp.id}`)}>Editar</button>
                                                </div>
                                            </ListItem>
                                        ))}
                                        {empreendimentos.length === 0 && (
                                            <p style={{color: '#666', fontSize: '14px', textAlign: 'center', padding: '20px 0'}}>Nenhum lançamento encontrado.</p>
                                        )}
                                    </ListContainer>
                                </SectionCard>

                                <SectionCard>
                                    <div className="section-header">
                                        <div className="title-block">
                                            <h2>Funil de Vendas</h2>
                                            <p>Visualize o estágio atual das suas oportunidades.</p>
                                        </div>
                                    </div>
                                    <div className="funnel-wrapper">
                                        <Funil />
                                    </div>
                                </SectionCard>
                            </MainGrid>

                        </BodyContainer>
                        : ''}

                    </DashboardBackground> 
                    : <Dashboard/>}  
                </ErrorBoundary>
            </div>
        </>
    )
}

export default Dashboard;