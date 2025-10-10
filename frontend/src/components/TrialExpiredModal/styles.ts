import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
`;

export const ModalContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;

export const ModalContent = styled.div`
  padding: 32px;
  
  @media (max-width: 768px) {
    padding: 24px;
  }
`;

export const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

export const IconWrapper = styled.div`
  color: #f44336;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
`;

export const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin: 0;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const ModalBody = styled.div`
  margin-bottom: 32px;
`;

export const ModalText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 16px;
  text-align: center;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: center;
  }
`;

export const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  min-width: 180px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 479px) {
    width: 100%;
    min-width: auto;
  }
`;

export const SecondaryButton = styled.button`
  background: transparent;
  color: #666;
  border: 2px solid #ddd;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  min-width: 180px;
  
  &:hover {
    border-color: #4caf50;
    color: #4caf50;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 479px) {
    width: 100%;
    min-width: auto;
  }
`;