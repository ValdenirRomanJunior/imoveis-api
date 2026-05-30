import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import BarTop from '../../components/Bartop';
import { EmpreendimentosBackground, EmpreendimentosContainer, EmpreendimentosGrid, EmpreendimentoCard, EmptyState } from './styles';
import { fetchEmpreendimentos, createEmpreendimentoApi } from './api';
import { Empreendimento as EmpreendimentoType } from './storage';

// Extendendo o tipo Empreendimento para incluir os campos dinâmicos retornados pela API que não estão no storage.ts
interface Empreendimento extends EmpreendimentoType {
    paginas?: any[];
    leadsCount?: number;
}

const Empreendimentos: React.FC = () => {
    const navigate = useNavigate();
    const [empreendimentos, setEmpreendimentos] = useState<Empreendimento[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [novoNome, setNovoNome] = useState('');
    const [criando, setCriando] = useState(false);

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await fetchEmpreendimentos();
            setEmpreendimentos(data);
        } catch (error) {
            console.error('Erro ao carregar empreendimentos', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!novoNome.trim()) return;
        setCriando(true);
        try {
            // Gera um slug simples a partir do nome
            const slug = novoNome.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            const novo = await createEmpreendimentoApi(novoNome, slug);
            setIsModalOpen(false);
            setNovoNome('');
            navigate(`/empreendimentos/${novo.id}`); // Redireciona direto para o detalhe
        } catch (error) {
            console.error('Erro ao criar', error);
            alert('Erro ao criar empreendimento. Tente novamente.');
        } finally {
            setCriando(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <EmpreendimentosBackground>
            <Header />
            <BarTop />
            
            <EmpreendimentosContainer>
                <div className="page-header">
                    <h1>Empreendimentos</h1>
                    <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
                        + Novo Empreendimento
                    </button>
                </div>

                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '60px', color: '#666', fontSize: '14px' }}>
                        Carregando empreendimentos...
                    </div>
                ) : empreendimentos.length > 0 ? (
                    <EmpreendimentosGrid>
                        {empreendimentos.map((emp) => {
                            const isAtivo = true; // Você pode ajustar essa lógica se tiver um status no backend
                            
                            return (
                                <EmpreendimentoCard key={emp.id} onClick={() => navigate(`/empreendimentos/${emp.id}`)}>
                                    <div className="card-header">
                                        <h3>{emp.nome}</h3>
                                        <span className={`badge ${isAtivo ? 'ativo' : 'inativo'}`}>
                                            {isAtivo ? 'Ativo' : 'Inativo'}
                                        </span>
                                    </div>
                                    
                                    <div className="card-metrics">
                                        <div className="metric-item">
                                            <span className="label">Páginas</span>
                                            <span className="value">{emp.paginas ? emp.paginas.length : 0}</span>
                                        </div>
                                        <div className="metric-item">
                                            <span className="label">Leads</span>
                                            <span className="value">{emp.leadsCount || 0}</span>
                                        </div>
                                    </div>
                                </EmpreendimentoCard>
                            );
                        })}
                    </EmpreendimentosGrid>
                ) : (
                    <EmptyState>
                        <h3>Nenhum empreendimento ativo</h3>
                        <p>Você ainda não criou nenhum empreendimento. Comece criando o seu primeiro lançamento para gerenciar suas páginas e leads.</p>
                        <button onClick={() => setIsModalOpen(true)}>Criar Empreendimento</button>
                    </EmptyState>
                )}
            </EmpreendimentosContainer>

            {/* Modal de Criação Nativo */}
            {isModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
                    <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                        <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', color: '#111' }}>Novo Empreendimento</h2>
                        <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>Dê um nome ao seu novo lançamento imobiliário.</p>
                        
                        <input 
                            type="text" 
                            placeholder="Ex: Residencial Flores..." 
                            value={novoNome}
                            onChange={(e) => setNovoNome(e.target.value)}
                            autoFocus
                            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #eaeaea', fontSize: '15px', marginBottom: '24px', outline: 'none' }}
                        />

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                style={{ padding: '8px 16px', background: '#fff', border: '1px solid #eaeaea', borderRadius: '6px', cursor: 'pointer', color: '#666' }}
                                disabled={criando}
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleCreate}
                                disabled={criando || !novoNome.trim()}
                                style={{ padding: '8px 16px', background: '#000', border: 'none', borderRadius: '6px', cursor: 'pointer', color: '#fff', opacity: (criando || !novoNome.trim()) ? 0.5 : 1 }}
                            >
                                {criando ? 'Criando...' : 'Criar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </EmpreendimentosBackground>
    );
};

export default Empreendimentos;