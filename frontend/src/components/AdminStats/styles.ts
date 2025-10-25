import styled from 'styled-components';

export const AdminStatsContainer = styled.div`
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    padding: 15px;
    margin-top: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 10px;
    margin-top: 10px;
  }
  
  h2 {
    color: #333;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 600;
    
    @media (max-width: 768px) {
      font-size: 20px;
      margin-bottom: 15px;
    }
    
    @media (max-width: 480px) {
      font-size: 18px;
      margin-bottom: 10px;
    }
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 10px;
    margin-bottom: 15px;
  }
`;

export const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 15px;
  transition: transform 0.2s ease;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 15px;
    gap: 12px;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
    gap: 10px;
    flex-direction: column;
    text-align: center;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }
  
  .stat-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    
    @media (max-width: 768px) {
      width: 45px;
      height: 45px;
      font-size: 20px;
    }
    
    @media (max-width: 480px) {
      width: 40px;
      height: 40px;
      font-size: 18px;
    }
  }
  
  .stat-info {
    flex: 1;
    
    h3 {
      margin: 0 0 5px 0;
      color: #666;
      font-size: 14px;
      font-weight: 500;
      
      @media (max-width: 768px) {
        font-size: 13px;
      }
      
      @media (max-width: 480px) {
        font-size: 12px;
        margin-bottom: 3px;
      }
    }
    
    .stat-number {
      font-size: 28px;
      font-weight: 700;
      color: #333;
      
      @media (max-width: 768px) {
        font-size: 24px;
      }
      
      @media (max-width: 480px) {
        font-size: 20px;
      }
    }
  }
`;

export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    gap: 10px;
    margin-bottom: 15px;
  }
`;

export const ChartContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  @media (max-width: 768px) {
    padding: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
  }
  
  h3 {
    margin: 0 0 20px 0;
    color: #333;
    font-size: 18px;
    font-weight: 600;
    
    @media (max-width: 768px) {
      font-size: 16px;
      margin-bottom: 15px;
    }
    
    @media (max-width: 480px) {
      font-size: 14px;
      margin-bottom: 10px;
    }
  }
`;

export const TableContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
  
  h3 {
    margin: 0;
    padding: 20px;
    background: #f8f9fa;
    color: #333;
    font-size: 18px;
    font-weight: 600;
    border-bottom: 1px solid #dee2e6;
    
    @media (max-width: 768px) {
      padding: 15px;
      font-size: 16px;
    }
    
    @media (max-width: 480px) {
      padding: 12px;
      font-size: 14px;
    }
  }
`;

export const CloseButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 20px;
  transition: background-color 0.2s ease;
  
  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 13px;
    margin-top: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 12px;
    margin-top: 10px;
    width: 100%;
  }
  
  &:hover {
    background: #c82333;
  }
`;

export const UsersTable = styled.table`
  width: 100%;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-collapse: collapse;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
  
  thead {
    background: #f8f9fa;
    
    @media (max-width: 480px) {
      display: block;
    }
    
    th {
      padding: 15px;
      text-align: left;
      font-weight: 600;
      color: #333;
      border-bottom: 1px solid #dee2e6;
      
      @media (max-width: 768px) {
        padding: 12px;
      }
      
      @media (max-width: 480px) {
        padding: 8px;
        display: inline-block;
        min-width: 100px;
      }
    }
  }
  
  tbody {
    tr:nth-child(even) {
      background: #f8f9fa;
    }
  }
`;

export const UserRow = styled.tr`
  &:hover {
    background: #e9ecef !important;
  }
  
  @media (max-width: 480px) {
    display: block;
    border-bottom: 2px solid #dee2e6;
    margin-bottom: 10px;
  }
  
  td {
    padding: 12px 15px;
    border-bottom: 1px solid #dee2e6;
    color: #333;
    
    @media (max-width: 768px) {
      padding: 10px 12px;
    }
    
    @media (max-width: 480px) {
      padding: 8px;
      display: inline-block;
      min-width: 100px;
      border-bottom: none;
      border-right: 1px solid #dee2e6;
      
      &:last-child {
        border-right: none;
      }
    }
    
    &:last-child {
      text-align: center;
      
      @media (max-width: 480px) {
        text-align: left;
      }
    }
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    padding: 20px;
    max-width: 90%;
    max-height: 85vh;
  }
  
  @media (max-width: 480px) {
    padding: 15px;
    max-width: 95%;
    max-height: 90vh;
    margin: 10px;
  }
  
  h3 {
    margin: 0 0 20px 0;
    color: #333;
    font-size: 20px;
    font-weight: 600;
    
    @media (max-width: 768px) {
      font-size: 18px;
      margin-bottom: 15px;
    }
    
    @media (max-width: 480px) {
      font-size: 16px;
      margin-bottom: 10px;
    }
  }
  
  p {
    margin: 10px 0;
    color: #666;
    
    @media (max-width: 768px) {
      margin: 8px 0;
      font-size: 14px;
    }
    
    @media (max-width: 480px) {
      margin: 6px 0;
      font-size: 13px;
    }
    
    strong {
      color: #333;
    }
  }
`;