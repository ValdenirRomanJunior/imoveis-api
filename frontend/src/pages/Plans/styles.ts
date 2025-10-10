import styled from 'styled-components';

export const PlansContainer = styled.div`
  min-height: 100vh;
  background: white;
  padding: 0 1.5rem;
`;

export const PlansBackground = styled.div`
 

`;

export const PlansHeader = styled.div`
  text-align: center;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(-2px);
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 900;
 
  color: ${props => props.theme.colors.primary};
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #93c5fd;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// Componentes de Toggle de Preços copiados da Home
export const PricingToggleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
  position: relative;
  z-index:0;
`;

export const PricingToggle = styled.div`
  display: flex;
  background: #e5e7eb;
  border-radius: 50px;
  padding: 4px;
  position: relative;
`;

export const PricingToggleButton = styled.button<{ active: boolean }>`
  padding: 12px 24px;
  border: none;
  border-radius: 46px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  min-width: 100px;
  
  ${props => props.active ? `
    background: #3b82f6;
    color: white;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
  ` : `
    background: transparent;
    color: #6b7280;
  `}
  
  &:hover {
    ${props => !props.active && `
      color: #374151;
    `}
  }
`;

export const EconomyBadge = styled.div`
  position: absolute;
  top: 65px;
  left: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #3b82f6;
  font-weight: 600;
  font-size: 0.7rem;
  
  @media (min-width: 768px) {
    position: absolute;
    top: 60px;
    left: 510px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #3b82f6;
    font-weight: 600;
    font-size: 0.9rem;
  }
`;

export const EconomyArrow = styled.div`
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 12px solid #3b82f6;
  transform: rotate(-45deg);
  
  @media (min-width: 768px) {
    transform: rotate(-30deg);
  }
`;

export const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const PricingCard = styled.div`
  background: ${({theme}) => theme.colors.background};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid #e6e9ed;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  
  &.popular {
    border: 2px solid ${({theme}) => theme.colors.primary};
    transform: scale(1.02);
    
    &::before {
      content: 'Mais Popular';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background: ${({theme}) => theme.colors.primary};
      color: white;
      text-align: center;
      padding: 0.5rem;
      font-size: 0.9rem;
      font-weight: 600;
    }
    
    &:hover {
      transform: scale(1.02) translateY(-5px);
    }
  }

  &.current-plan {
    border: 2px solid #28a745;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    
    &::before {
      content: 'Seu Plano Atual';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background: #28a745;
      color: white;
      text-align: center;
      padding: 0.5rem;
      font-size: 0.9rem;
      font-weight: 600;
    }
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(40, 167, 69, 0.2);
    }
  }
`;

export const PricingIcon = styled.div`
  width: 60px;
  height: 60px;
  background: ${({theme}) => theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 1.5rem;
`;

export const PricingPlanName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({theme}) => theme.colors.primary};
  text-align: center;
  margin-bottom: 0.5rem;
  font-family: 'Nunito Sans', sans-serif;
`;

export const PricingDescription = styled.p`
  color: ${({theme}) => theme.colors.secondary};
  text-align: center;
  margin-bottom: 1.5rem;
  line-height: 1.5;
  font-family: 'Nunito Sans', sans-serif;
`;

export const PricingPrice = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.25rem;
`;

export const PricingCurrency = styled.span`
  font-size: 1.2rem;
  color: ${({theme}) => theme.colors.primary};
  font-weight: 600;
`;

export const PricingAmount = styled.span`
  font-size: 3rem;
  font-weight: 700;
  color: ${({theme}) => theme.colors.primary};
`;

export const PricingPeriod = styled.span`
  font-size: 1rem;
  color: ${({theme}) => theme.colors.secondary};
`;

export const PricingFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
`;

export const PricingFeature = styled.li`
  padding: 0.5rem 0;
  color: ${({theme}) => theme.colors.gray[700]};
  position: relative;
  padding-left: 1.5rem;
  font-family: 'Nunito Sans', sans-serif;
  font-size: .9rem;
  
  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: ${({theme}) => theme.colors.primary};
    font-weight: bold;
  }
`;

export const PricingNote = styled.p`
  background: ${({theme}) => theme.colors.backgroundLight};
  color: ${({theme}) => theme.colors.primary};
  padding: 0.75rem;
  border-radius: 8px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  border: 1px solid #e6e9ed;
  font-family: 'Nunito Sans', sans-serif;
`;

export const PricingButton = styled.button`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${({theme}) => theme.colors.backgroundLight};
  color: ${({theme}) => theme.colors.gray[700]};
  border: 2px solid #e6e9ed;
  font-family: 'Nunito Sans', sans-serif;
  
  &.primary {
    background: ${({theme}) => theme.colors.primary};
    color: white;
    border: none;
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  &.primary:hover:not(:disabled) {
    background: ${({theme}) => theme.colors.primaryDark};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: #e9ecef;
    color: #6c757d;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  color: white;
  
  p {
    margin-top: 1rem;
    font-size: 1.1rem;
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  color: white;
  text-align: center;
  
  p {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
  
  button {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
`;