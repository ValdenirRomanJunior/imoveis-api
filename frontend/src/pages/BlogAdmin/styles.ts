import styled, { css } from 'styled-components';

export const AdminContainer = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 24px;
`;

export const AdminHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #111827;
  margin: 0;
`;

export const Columns = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 24px;
`;

export const Left = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
  overflow: hidden;
`;

export const Right = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
  padding: 16px;
`;

export const PostList = styled.div`
  max-height: 520px;
  overflow: auto;
`;

export const PostItem = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &:hover { background: #f9fafb; }
`;

export const Helper = styled.span`
  display: inline-block;
  color: #6b7280;
  font-size: 12px;
  margin-left: 8px;
`;

export const TagList = styled.div`
  display: flex;
  gap: 6px;
`;

export const TagItem = styled.span`
  font-size: 12px;
  color: #374151;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  padding: 2px 6px;
`;

export const Label = styled.label`
  font-size: 13px;
  color: #374151;
  margin-top: 8px;
  display: block;
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px 12px;
  outline: none;
  font-size: 14px;
  margin: 6px 0 12px 0;

  &:focus { border-color: #a3a3a3; }
`;

export const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px 12px;
  outline: none;
  font-size: 14px;
  margin: 6px 0 12px 0;
  resize: vertical;
  min-height: 80px;

  &:focus { border-color: #a3a3a3; }
`;

export const UploadBox = styled.div`
  border: 1px dashed #d1d5db;
  border-radius: 10px;
  background: #fafafa;
  padding: 10px;
  margin-top: 6px;
`;

export const ActionRow = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 10px;
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: filter 0.2s ease;

  ${({ variant }) => {
    switch (variant) {
      case 'secondary': return css`background: #f3f4f6; color: #111827;`;
      case 'danger': return css`background: #ef4444; color: #fff;`;
      default: return css`background: #111827; color: #fff;`;
    }
  }}

  &:hover { filter: brightness(0.95); }
`;

export const EmptyState = styled.div`
  text-align: center;
  color: #6b7280;
  padding: 24px 0;
`;