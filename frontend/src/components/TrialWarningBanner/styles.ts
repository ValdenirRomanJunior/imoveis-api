import styled from 'styled-components';

interface BannerContainerProps {
  type: 'info' | 'warning' | 'critical' | 'expired';
}

export const BlockingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 16px;
  pointer-events: auto;
`;

export const BannerContainer = styled.div<BannerContainerProps>`
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  border-left: 4px solid;
  
  ${({ type }) => {
    switch (type) {
      case 'info':
        return `
          background-color: #e3f2fd;
          border-left-color: #2196f3;
          color: #1565c0;
        `;
      case 'warning':
        return `
          background-color: #fff3e0;
          border-left-color: #ff9800;
          color: #e65100;
        `;
      case 'critical':
        return `
          background-color: #ffebee;
          border-left-color: #f44336;
          color: #c62828;
        `;
      case 'expired':
        return `
          background-color: #fce4ec;
          border-left-color: #e91e63;
          color: #ad1457;
        `;
      default:
        return `
          background-color: #e3f2fd;
          border-left-color: #2196f3;
          color: #1565c0;
        `;
    }
  }}
`;

export const BannerContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const BannerText = styled.span`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  
  small {
    display: block;
    font-size: 12px;
    font-weight: 400;
    margin-top: 4px;
    opacity: 0.8;
  }
`;

export const UpgradeButton = styled.button`
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    background-color: #1565c0;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    justify-self: stretch;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  opacity: 0.7;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;