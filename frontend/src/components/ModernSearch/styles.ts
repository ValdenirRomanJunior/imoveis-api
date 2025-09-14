import styled from 'styled-components';

export const SearchContainer = styled.div`
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 15px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 100px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
    z-index: 1;
  }
`;

export const SearchWrapper = styled.div`
  background: white;
  border-radius: 12px;
  padding: 15px 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  max-width: 1200px;
  width: 100%;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 20px;
  
  @media (max-width: 768px) {
    padding: 10px 15px;
    margin: 0 10px;
    flex-direction: column;
    gap: 10px;
  }
`;

export const SearchTitle = styled.h2`
  text-align: center;
  color: #2d3748;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 25px;
  }
`;

export const SearchCode = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const SearchCodeInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s ease;
  height: 36px;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

export const OrDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e5e7eb;
  }
  
  span {
    padding: 0 12px;
    color: #6b7280;
    font-weight: 500;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 1px;
  }
`;

export const SearchForm = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  gap: 12px;
  width: 100%;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const SearchRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  &:last-of-type {
    grid-template-columns: 1fr;
  }
`;

export const SearchField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
  flex: 1;
  min-width: 120px;
`;

export const SearchLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #374151;
`;

export const IconWrapper = styled.div`
  color: #667eea;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  padding: 8px 12px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s ease;
  background: white;
  height: 36px;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &:disabled {
    background-color: #f9fafb;
    color: #9ca3af;
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: #a0aec0;
  }
`;

interface SearchSelectProps {
  isOpen?: boolean;
}

export const SearchSelect = styled.div<SearchSelectProps>`
  padding: 8px 12px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
  height: 36px;
  
  &:hover {
    border-color: #d1d5db;
  }
  
  ${props => props.isOpen && `
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  `}
  
  span {
    color: #2d3748;
  }
  
  svg {
    color: #718096;
    transition: transform 0.2s ease;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`;

export const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 2px solid #e2e8f0;
  border-top: none;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
`;

export const DropdownItem = styled.div`
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #f7fafc;
  }
  
  &:last-child {
    border-radius: 0 0 10px 10px;
  }
`;

interface SearchButtonProps {
  primary?: boolean;
}

export const SearchButton = styled.button<SearchButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  height: 36px;
  white-space: nowrap;
  
  ${props => props.primary ? `
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    color: white;
    
    &:hover {
      background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
    }
  ` : `
    background: white;
    color: #374151;
    border: 2px solid #e5e7eb;
    
    &:hover {
      border-color: #d1d5db;
      background: #f9fafb;
    }
    
    &:disabled {
      background: #cbd5e0;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
  `}
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
  }
`;