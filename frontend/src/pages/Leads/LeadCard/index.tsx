import { LeadCardContainer, LeadList, LeadListItem, LeadSearchWrapper, MessageNoLeads } from "./styles";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import { BiSearch, BiFilterAlt } from "react-icons/bi";
import { Lead, LeadPage } from "../../../types/lead";
import { leadsPageable } from "../../../services/resources/lead";
import PaginationLead from "../../../components/PaginationLead";

const LeadCardItem = ({ id, name, email, phone, instant, opportunityId, message }: Lead) => {
    const capitalize = (string: string) => {
        return string?.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase()) || '';
    };

    const initial = name ? name.substring(0, 1) : '?';
    const isCaptacao = message?.startsWith('[Captação]');

    return (
        <LeadListItem>
            <div className="lead-info">
                <div className="avatar">{initial}</div>
                <div className="details">
                    <Link to={`/leadDetail/${id}`} className="name-link">
                        {capitalize(name)}
                    </Link>
                    <div className="contact-info">
                        <span><AiOutlineMail /> {email}</span>
                        <span><FaWhatsapp /> {phone}</span>
                        <span>{instant}</span>
                    </div>
                </div>
            </div>
            
            <div className="lead-status">
                {isCaptacao && (
                    <span className="badge captacao" style={{ background: '#f5f3ff', color: '#6d28d9', border: '1px solid #ddd6fe' }}>Captação</span>
                )}
                {opportunityId === null ? (
                    <span className="badge resolvido">Resolvido</span>
                ) : (
                    <span className="badge aberto">Em aberto</span>
                )}

                {opportunityId !== null && (
                    <Link to={`/oportunidades/oportunidade/${opportunityId}`} className="action-link" title="Ver Oportunidade">
                        <BiFilterAlt size={18} />
                    </Link>
                )}
            </div>
        </LeadListItem>
    );
};

const LeadCard = ({ param }: { param: string }) => {
    const [pageNumber, setPageNumber] = useState(0);
    const [name, setName] = useState('');
    const [page, setPage] = useState<LeadPage>({
        content: [],
        last: true,
        totalPages: 0,
        totalElements: 0,
        size: 12,
        number: 0,
        first: true,
        numberOfElements: 0,
        empty: true
    });

    const getLeads = async () => {
        try {
            const { data } = await leadsPageable(name.toLowerCase(), pageNumber);
            setPage(data as LeadPage);
            localStorage.removeItem('images');
        } catch (error) {
            console.error("Erro ao buscar leads", error);
        }
    };

    useEffect(() => {       
        getLeads();     
    }, [pageNumber, name]);

    useEffect(() => {
        if(param !== '') {
            getLeads();
        }
    }, [param]);

    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    };

    return (
        <LeadCardContainer>
            <LeadSearchWrapper>
                <div className="search-input-container">
                    <BiSearch />
                    <input 
                        type="search"  
                        placeholder="Buscar lead por nome..." 
                        onChange={(e) => setName(e.target.value)} 
                        maxLength={35}
                    />
                </div>
            </LeadSearchWrapper>

            {page.content && page.content.length > 0 ? (
                <>
                    <LeadList>
                        {page.content.map(lead => (
                            <LeadCardItem key={lead.id} {...lead} />
                        ))}
                    </LeadList>
                    <div style={{ padding: '16px 24px', borderTop: '1px solid #eaeaea', display: 'flex', justifyContent: 'center' }}>
                        <PaginationLead page={page} onChange={handlePageChange} /> 
                    </div>
                </>
            ) : (
                <MessageNoLeads>
                    <h4>Nenhum lead encontrado com estes critérios.</h4>
                </MessageNoLeads>
            )}
        </LeadCardContainer>
    );
};

export default LeadCard;