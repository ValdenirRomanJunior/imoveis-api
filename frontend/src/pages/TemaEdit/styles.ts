import styled from 'styled-components';

export const TemaEditContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  flex-direction: column;
  
  @media screen and (max-width: 768px) {
    padding: 10px;
    height: auto;
    min-height: 100vh;
  }
  
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    flex-direction: row;
    padding: 15px;
  }
  
  @media screen and (min-width: 1025px) {
    flex-direction: row;
    padding: 20px 30px 10px 60px;
  }
`;

export const EditorPanel = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-right: 1px solid ${({ theme }) => theme.colors.gray[200]};
  padding: 20px;
  overflow-y: auto;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  
  @media screen and (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
    padding: 15px;
    max-height: 50vh;
    order: 1;
  }
  
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    width: 350px;
    min-width: 300px;
    padding: 18px;
  }
  
  @media screen and (min-width: 1025px) {
    width: 400px;
    min-width: 350px;
  }
`;

export const PreviewPanel = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray[50]};
  padding: 20px;
  overflow: hidden;
  
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 15px;
    order: 2;
    min-height: 50vh;
    overflow-y: auto;
  }
  
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    padding: 18px;
    min-width: 400px;
  }
  
  @media screen and (min-width: 1025px) {
    padding: 20px;
  }
`;

export const EditorSection = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  
  @media screen and (max-width: 768px) {
    margin-bottom: 20px;
    padding: 15px;
  }
  
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    margin-bottom: 25px;
    padding: 18px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray[800]};
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  
  @media screen and (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 15px;
    padding-bottom: 8px;
  }
  
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    font-size: 22px;
    margin-bottom: 18px;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
  
  @media screen and (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray[700]};
  margin-bottom: 8px;
  
  @media screen and (max-width: 768px) {
    font-size: 13px;
    margin-bottom: 6px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 6px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray[800]};
  background-color: ${({ theme }) => theme.colors.white};
  transition: border-color 0.2s ease;
  margin-bottom: 8px;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    padding: 10px;
    font-size: 16px; /* Evita zoom no iOS */
    margin-bottom: 6px;
  }
  
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    padding: 11px;
    font-size: 13px;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 6px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray[800]};
  background-color: ${({ theme }) => theme.colors.white};
  transition: border-color 0.2s ease;
  resize: vertical;
  min-height: 80px;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    padding: 10px;
    font-size: 16px; /* Evita zoom no iOS */
    min-height: 70px;
  }
  
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    padding: 11px;
    font-size: 13px;
    min-height: 75px;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

export const ColorInput = styled.input`
  width: 60px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 6px;
  cursor: pointer;
  background: none;
  padding: 0;

  @media screen and (max-width: 768px) {
    width: 50px;
    height: 35px;
  }

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 4px;
  }
`;

export const FileInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 6px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray[800]};
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    padding: 10px;
    font-size: 13px;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray[700]};
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  transition: all 0.2s ease;

  @media screen and (max-width: 768px) {
    padding: 12px 16px;
    font-size: 14px;
    width: 100%;
    margin-bottom: 8px;
  }
  
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    padding: 9px 18px;
    font-size: 13px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[50]};
    border-color: ${({ theme }) => theme.colors.gray[400]};
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const SaveButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 20px;

  @media screen and (max-width: 768px) {
    padding: 14px;
    font-size: 15px;
    margin-top: 15px;
  }
  
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    padding: 13px;
    font-size: 15px;
    margin-top: 18px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(49, 130, 206, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const PreviewFrame = styled.iframe`
  width: 100%;
  height: calc(100vh - 120px);
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  
  @media screen and (max-width: 768px) {
    height: calc(50vh - 60px);
    min-height: 300px;
  }
  
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    height: calc(100vh - 100px);
  }
`;

export const TabContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  
  @media screen and (max-width: 768px) {
    gap: 3px;
    margin-bottom: 15px;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
  
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    gap: 4px;
  }
`;

export const Tab = styled.button<{ active: boolean }>`
  padding: 10px 15px;
  border: none;
  background-color: ${({ active, theme }) => 
    active ? theme.colors.primary : 'transparent'};
  color: ${({ active, theme }) => 
    active ? 'white' : theme.colors.gray[600]};
  border-radius: 6px 6px 0 0;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: -1px;
  white-space: nowrap;
  flex-shrink: 0;

  @media screen and (max-width: 768px) {
    padding: 8px 12px;
    font-size: 12px;
    min-width: auto;
  }
  
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    padding: 9px 13px;
    font-size: 13px;
  }

  &:hover {
    background-color: ${({ active, theme }) => 
      active ? theme.colors.primaryDark : theme.colors.gray[100]};
  }
`;

export const TabContent = styled.div`
  padding: 20px 0;
`;

// Estilos específicos para a seção de domínio personalizado
export const DomainSection = styled.div`
  margin-bottom: 32px;
`;

export const DomainCard = styled.div`
  background-color: #f8fafc;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`;

export const DomainInputContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const DomainInput = styled(Input)`
  flex: 1;
  margin-bottom: 0;

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-bottom: 0;
  }
`;

export const DomainButton = styled(Button)`
  background-color: #10b981;
  color: white;
  white-space: nowrap;
  border: 1px solid #10b981;

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-bottom: 0;
    order: 2;
  }

  &:hover {
    background-color: #059669;
    border-color: #059669;
  }
`;