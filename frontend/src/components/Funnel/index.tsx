
import { useEffect, useState } from 'react';
import { 
    FunnelContainer, 
    FunnelGraphic, 
    FunnelSlice, 
    FunnelLabels, 
    LabelRow, 
    LabelLine, 
    LabelName, 
    LabelValue 
} from './styles';
import { countstepsName } from '../../services/resources/lead';
import useAuth from '../../hooks/useAuth';
import PageNotFoundDashboard from '../PageNotFoundDashboard';

type Counts = {
    name: string;
    count: number;
}

const sliceColors = [
    '#111111', // Preto / Cinza bem escuro (topo)
    '#444444', // Cinza escuro
    '#666666', // Cinza médio
    '#888888', // Cinza
    '#aaaaaa', // Cinza claro
    '#cccccc', // Cinza mais claro
    '#eaeaea'  // Cinza muito claro (base)
];


function Funil() {
    const [errors, setErrors] = useState(false);
    const { user, getCurrentUser } = useAuth();
    const [counts, setCounts] = useState<Counts[]>([]);

    useEffect(() => {
        getCurrentUser();
        if (user === null) {
            setErrors(true);
        }
    }, []);

    const getcountSteps = async () => {     
        try {
            const data = await countstepsName() as Counts[];
            if (data) {
                setCounts(data);
            }
        } catch (error) {
            console.error("Erro ao buscar dados do funil:", error);
        }
    }

    useEffect(() => {      
        if(user?.id) {
            getcountSteps();
        }
    }, [user?.id]);

    let perfilTenant = user?.perfis ? Object.values(user.perfis).some(obj => obj === 'TENANT') : false;
    if (!perfilTenant || errors) return <PageNotFoundDashboard />;

    return (
        <FunnelContainer>
            <FunnelGraphic>
                {counts.map((_, index) => {
                    // Distribui a paleta dinamicamente garantindo que o primeiro seja escuro e o último seja claro
                    const colorIndex = counts.length > 1 
                        ? Math.floor((index / (counts.length - 1)) * (sliceColors.length - 1))
                        : 0;
                    
                    return (
                        <FunnelSlice 
                            key={`slice-${index}`} 
                            style={{ backgroundColor: sliceColors[colorIndex] }} 
                        />
                    );
                })}
            </FunnelGraphic>
            <FunnelLabels>
                {counts.map((item, index) => (
                    <LabelRow key={`label-${index}`}>
                        <LabelLine />
                        <LabelName>{item.name}</LabelName>
                        <LabelValue>{item.count}</LabelValue>
                    </LabelRow>
                ))}
            </FunnelLabels>
        </FunnelContainer>
    );
}

export default Funil;