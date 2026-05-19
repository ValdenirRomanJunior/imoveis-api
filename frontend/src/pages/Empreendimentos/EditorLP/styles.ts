import styled from 'styled-components';

export const EditorContainer = styled.div`
  display: flex;
  height: calc(100vh - 45px); // descontando header
  background: #f8f9fa;
  overflow: hidden;
`;

export const SidebarEditor = styled.aside`
  width: 400px;
  background: #ffffff;
  border-right: 1px solid #e1e4e8;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const EditorHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #e1e4e8;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #24292e;
    margin: 0;
  }
`;

export const SaveButton = styled.button`
  background: #0066ff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #0052cc;
  }
`;

export const EditorTabs = styled.div`
  display: flex;
  border-bottom: 1px solid #e1e4e8;
`;

export const TabBtn = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 12px;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${(props) => (props.$active ? '#0066ff' : 'transparent')};
  color: ${(props) => (props.$active ? '#0066ff' : '#586069')};
  font-weight: ${(props) => (props.$active ? '600' : '500')};
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: #0066ff;
  }
`;

export const EditorContent = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 20px;
  
  /* Scrollbar estilizda */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c1c1c1;
    border-radius: 4px;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 16px;

  label {
    display: block;
    font-size: 0.85rem;
    font-weight: 600;
    color: #24292e;
    margin-bottom: 6px;
  }

  input, textarea {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #d1d5da;
    border-radius: 6px;
    font-size: 0.9rem;
    color: #24292e;
    transition: 0.2s;

    &:focus {
      outline: none;
      border-color: #0066ff;
      box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }
`;

export const PreviewArea = styled.main`
  flex: 1;
  background: #e1e4e8;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;
  min-height: 0;
  min-width: 0;
`;

export const PreviewWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  min-height: 800px;
`;
