import api from '../../utils/requests';
import { Empreendimento, Lancamento, LancamentoStatus } from './storage';

export const fetchEmpreendimentos = async (): Promise<Empreendimento[]> => {
  const response = await api.get('/empreendimentos');
  return response.data;
};

export const fetchEmpreendimentoById = async (id: string): Promise<Empreendimento> => {
  const response = await api.get(`/empreendimentos/${id}`);
  return response.data;
};

export const createEmpreendimentoApi = async (nome: string, slug: string): Promise<Empreendimento> => {
  const response = await api.post('/empreendimentos', { nome, slug });
  return response.data;
};

export const fetchPaginasByEmpreendimento = async (empreendimentoId: string): Promise<Lancamento[]> => {
  const response = await api.get(`/empreendimentos/${empreendimentoId}/paginas`);
  // Parse JSON strings back to objects
  return response.data.map((item: any) => ({
    ...item,
    briefing: item.briefing ? JSON.parse(item.briefing) : {},
    conteudoGerado: item.conteudoGerado ? JSON.parse(item.conteudoGerado) : {},
    lpConfig: item.lpConfig ? JSON.parse(item.lpConfig) : undefined
  }));
};

export const createPaginaApi = async (empreendimentoId: string, payload: any): Promise<Lancamento> => {
  // Convert objects to strings for the backend
  const dto = {
    ...payload,
    briefing: typeof payload.briefing === 'object' ? JSON.stringify(payload.briefing) : payload.briefing,
    conteudoGerado: typeof payload.conteudoGerado === 'object' ? JSON.stringify(payload.conteudoGerado) : payload.conteudoGerado,
    lpConfig: typeof payload.lpConfig === 'object' ? JSON.stringify(payload.lpConfig) : payload.lpConfig
  };

  const response = await api.post(`/empreendimentos/${empreendimentoId}/paginas`, dto);
  return {
    ...response.data,
    briefing: response.data.briefing ? JSON.parse(response.data.briefing) : {},
    conteudoGerado: response.data.conteudoGerado ? JSON.parse(response.data.conteudoGerado) : {},
    lpConfig: response.data.lpConfig ? JSON.parse(response.data.lpConfig) : undefined
  };
};

export const fetchPaginaById = async (paginaId: string): Promise<Lancamento> => {
  const response = await api.get(`/paginas/${paginaId}`);
  return {
    ...response.data,
    briefing: response.data.briefing ? JSON.parse(response.data.briefing) : {},
    conteudoGerado: response.data.conteudoGerado ? JSON.parse(response.data.conteudoGerado) : {},
    lpConfig: response.data.lpConfig ? JSON.parse(response.data.lpConfig) : undefined
  };
};

export const fetchPaginaBySlug = async (slug: string): Promise<Lancamento> => {
  const response = await api.get(`/paginas/slug/${slug}`);
  return {
    ...response.data,
    briefing: response.data.briefing ? JSON.parse(response.data.briefing) : {},
    conteudoGerado: response.data.conteudoGerado ? JSON.parse(response.data.conteudoGerado) : {},
    lpConfig: response.data.lpConfig ? JSON.parse(response.data.lpConfig) : undefined
  };
};

export const updatePaginaApi = async (paginaId: string, payload: any): Promise<Lancamento> => {
  // Convert objects to strings for the backend
  const dto = {
    ...payload,
    briefing: typeof payload.briefing === 'object' ? JSON.stringify(payload.briefing) : payload.briefing,
    conteudoGerado: typeof payload.conteudoGerado === 'object' ? JSON.stringify(payload.conteudoGerado) : payload.conteudoGerado,
    lpConfig: typeof payload.lpConfig === 'object' ? JSON.stringify(payload.lpConfig) : payload.lpConfig
  };

  const response = await api.put(`/paginas/${paginaId}`, dto);
  return {
    ...response.data,
    briefing: response.data.briefing ? JSON.parse(response.data.briefing) : {},
    conteudoGerado: response.data.conteudoGerado ? JSON.parse(response.data.conteudoGerado) : {},
    lpConfig: response.data.lpConfig ? JSON.parse(response.data.lpConfig) : undefined
  };
};

export const uploadImagemApi = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  // Need to make sure the endpoint doesn't require Content-Type application/json, Axios usually handles FormData correctly by removing the default header
  const response = await api.post('/paginas/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data.url;
};
