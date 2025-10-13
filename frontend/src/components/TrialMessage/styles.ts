import styled from 'styled-components';

export const TrialMessageContainer = styled.div`
  width: 100%;
  margin: 1rem 0;
  padding: 0 2rem ;

   @media (min-width: 1000px){
    width: 95%;
    padding: 0 1rem 0 4.5rem;
  }
`;

export const TrialMessageContent = styled.div`
  background: rgba(255, 165, 0, 0.08); /* Laranja bem fraco, quase transparente */
  border: 2px solid #ff8c00; /* Borda laranja */
  border-radius: 12px;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 2px 8px rgba(255, 140, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 165, 0, 0.12);
    box-shadow: 0 4px 12px rgba(255, 140, 0, 0.15);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
    padding: 1rem;
  }
`;

export const TrialIcon = styled.div`
  color: #ff8c00; /* Cor laranja */
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const TrialText = styled.p`
  color: #ff8c00; /* Cor laranja */
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  flex: 1;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    text-align: center;
  }
`;

export const TrialLink = styled.button`
  background: #ff8c00; /* Background laranja */
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    background: #ff7700;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(255, 140, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.85rem;
  }
`;