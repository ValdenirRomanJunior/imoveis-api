import styled from 'styled-components';

export const DomainContainer = styled.div`
  .domain-card {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .domain-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    
    h4 {
      margin: 0;
      color: #333;
      font-weight: 600;
    }

    svg {
      margin-right: 8px;
      color: #007bff;
    }
  }

  .domain-section {
    margin-bottom: 30px;
    
    h5 {
      color: #495057;
      font-weight: 500;
      margin-bottom: 15px;
    }
  }

  .domain-info {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    
    .badge {
      margin-right: 10px;
    }
    
    strong {
      color: #333;
      font-size: 16px;
    }
    
    a {
      margin-left: 8px;
      color: #007bff;
      text-decoration: none;
      
      &:hover {
        color: #0056b3;
      }
    }
  }

  .dns-instructions {
    background: #e7f3ff;
    border: 1px solid #b3d9ff;
    border-radius: 6px;
    padding: 15px;
    margin: 15px 0;
    
    strong {
      color: #0066cc;
    }
    
    code {
      background: #f8f9fa;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      color: #d63384;
    }
  }

  .form-group {
    margin-bottom: 20px;
    
    label {
      font-weight: 500;
      color: #495057;
      margin-bottom: 8px;
    }
    
    input {
      border: 1px solid #ced4da;
      border-radius: 6px;
      padding: 10px 12px;
      font-size: 14px;
      
      &:focus {
        border-color: #007bff;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
      }
      
      &:disabled {
        background-color: #f8f9fa;
        opacity: 0.6;
      }
    }
    
    .form-text {
      font-size: 12px;
      color: #6c757d;
      margin-top: 5px;
    }
  }

  .button-group {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    
    .btn {
      border-radius: 6px;
      padding: 8px 16px;
      font-weight: 500;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &.btn-primary {
        background: #007bff;
        color: white;
        
        &:hover:not(:disabled) {
          background: #0056b3;
        }
      }
      
      &.btn-outline-primary {
        background: transparent;
        color: #007bff;
        border: 1px solid #007bff;
        
        &:hover:not(:disabled) {
          background: #007bff;
          color: white;
        }
      }
      
      &.btn-outline-danger {
        background: transparent;
        color: #dc3545;
        border: 1px solid #dc3545;
        
        &:hover:not(:disabled) {
          background: #dc3545;
          color: white;
        }
      }
      
      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      
      .spinner-border {
        width: 16px;
        height: 16px;
        margin-right: 6px;
      }
    }
  }

  .alert {
    border-radius: 6px;
    padding: 12px 16px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    
    &.alert-success {
      background: #d1edff;
      border-color: #b3d9ff;
      color: #0c5460;
    }
    
    &.alert-danger {
      background: #f8d7da;
      border-color: #f5c6cb;
      color: #721c24;
    }
    
    &.alert-info {
      background: #d1ecf1;
      border-color: #bee5eb;
      color: #0c5460;
    }
  }

  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    
    .spinner-border {
      width: 40px;
      height: 40px;
      color: #007bff;
    }
  }

  .divider {
    border: none;
    border-top: 1px solid #e0e0e0;
    margin: 25px 0;
  }

  .badge {
    padding: 6px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
    
    &.bg-primary {
      background: #007bff !important;
      color: white;
    }
    
    &.bg-success {
      background: #28a745 !important;
      color: white;
    }
    
    &.bg-warning {
      background: #ffc107 !important;
      color: #212529;
    }
  }

  @media (max-width: 768px) {
    .domain-info {
      flex-direction: column;
      align-items: flex-start;
      
      .badge {
        margin-bottom: 5px;
      }
    }
    
    .button-group {
      flex-direction: column;
      
      .btn {
        width: 100%;
      }
    }
  }
`;

export default DomainContainer;