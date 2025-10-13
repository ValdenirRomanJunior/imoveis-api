import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

export const Header = styled.div`
  text-align: center;
  color: white;
  margin-bottom: 3rem;

  svg {
    margin-bottom: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const PricingToggle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  padding: 0.5rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 3rem;
`;

export const ToggleButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? '#667eea' : 'white'};

  &:hover {
    background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

export const PlansContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const PlanCard = styled.div<{ popular?: boolean }>`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  position: relative;
  border: ${props => props.popular ? '3px solid #ffd700' : '1px solid #e9ecef'};

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  .popular-badge {
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(45deg, #ffd700, #ffed4e);
    color: #333;
    padding: 0.5rem 1.5rem;
    border-radius: 20px;
    font-weight: 700;
    font-size: 0.9rem;
    box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
  }
`;

export const PlanHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const PlanName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

export const PlanPrice = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: #667eea;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.25rem;
`;

export const PlanPeriod = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #6c757d;
`;

export const PlanDescription = styled.p`
  color: #6c757d;
  font-size: 1rem;
  line-height: 1.5;
`;

export const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
`;

export const Feature = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f8f9fa;

  svg {
    color: #28a745;
    font-size: 0.9rem;
    flex-shrink: 0;
  }

  span {
    color: #495057;
    font-size: 0.95rem;
    line-height: 1.4;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const ContactButton = styled.button<{ popular?: boolean }>`
  width: 100%;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  background: ${props => props.popular 
    ? 'linear-gradient(45deg, #667eea, #764ba2)' 
    : '#667eea'};
  color: white;

  &:hover {
    background: ${props => props.popular 
      ? 'linear-gradient(45deg, #5a6fd8, #6a4190)' 
      : '#5a6fd8'};
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const Footer = styled.div`
  text-align: center;
  margin-top: 4rem;
  color: white;

  p {
    font-size: 1rem;
    opacity: 0.9;
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  button {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
    padding: 0.75rem 2rem;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-2px);
    }
  }
`;