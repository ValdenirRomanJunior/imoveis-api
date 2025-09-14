import styled from 'styled-components';

export const CustomDomainContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  margin: 20px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e6e9ed;

  h3 {
    margin: 0 0 20px 0;
    color: #333;
    font-size: 18px;
    font-weight: 600;
  }

  .domain-input-section {
    display: flex;
    gap: 12px;
    margin: 16px 0;
    align-items: center;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: stretch;
    }
  }

  .success-message {
    background: #d4edda;
    color: #155724;
    padding: 12px;
    border-radius: 4px;
    margin: 12px 0;
    border: 1px solid #c3e6cb;
  }

  .error-message {
    background: #f8d7da;
    color: #721c24;
    padding: 12px;
    border-radius: 4px;
    margin: 12px 0;
    border: 1px solid #f5c6cb;
  }

  .remove-button {
    background: #dc3545 !important;
    
    &:hover {
      background: #c82333 !important;
    }
  }
`;

export const DomainInfo = styled.div`
  background: #f8f9fa;
  padding: 16px;
  border-radius: 6px;
  margin: 16px 0;
  border-left: 4px solid #007bff;

  p {
    margin: 8px 0;
    color: #495057;
    font-size: 14px;

    strong {
      color: #212529;
    }
  }
`;

export const DomainInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e6e9ed;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s ease;
  min-width: 250px;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }

  &:disabled {
    background: #f8f9fa;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #6c757d;
  }
`;

export const DomainButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: #0056b3;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
    transform: none;
  }
`;

export const InstructionsBox = styled.div`
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 6px;
  padding: 20px;
  margin: 20px 0;

  h4 {
    margin: 0 0 16px 0;
    color: #856404;
    font-size: 16px;
  }

  ol {
    margin: 0;
    padding-left: 20px;
    color: #856404;

    li {
      margin: 8px 0;
      line-height: 1.5;
    }

    ul {
      margin: 8px 0;
      padding-left: 20px;

      li {
        list-style-type: disc;
        margin: 4px 0;

        strong {
          color: #533f03;
        }
      }
    }
  }
`;