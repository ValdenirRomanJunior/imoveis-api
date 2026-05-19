import styled from 'styled-components';

export const LancamentosPage = styled.main`
  min-height: calc(100vh - 45px);
  background: #f6f8fa;
  padding: 24px 16px 32px 16px;
  font-family: 'Nunito Sans', sans-serif;

  @media screen and (min-width: 1000px) {
    padding: 28px 24px 36px 88px;
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;

  h1 {
    font-size: 1.5rem;
    color: #1f2328;
  }
`;

export const PrimaryButton = styled.button`
  border: 1px solid #1f883d;
  background: #1f883d;
  color: #fff;
  border-radius: 6px;
  padding: 10px 16px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
`;

export const SectionTitle = styled.p`
  color: #59636e;
  margin-bottom: 16px;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 14px;
`;

export const LaunchCard = styled.article`
  background: #fff;
  border: 1px solid #d8dee4;
  border-radius: 8px;
  padding: 16px;

  h3 {
    color: #1f2328;
    font-size: 1.05rem;
    margin-bottom: 8px;
  }

  .leads {
    color: #59636e;
    margin: 8px 0 14px 0;
  }
`;

export const Badge = styled.span<{ $status: 'PUBLICADA' | 'RASCUNHO' | 'GERANDO' }>`
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 0.8rem;
  font-weight: 700;
  color: ${({ $status }) => ($status === 'PUBLICADA' ? '#116329' : $status === 'RASCUNHO' ? '#9a6700' : '#1f6feb')};
  background: ${({ $status }) => ($status === 'PUBLICADA' ? '#dafbe1' : $status === 'RASCUNHO' ? '#fff8c5' : '#ddf4ff')};
`;

export const CardActions = styled.div`
  display: flex;
  gap: 8px;

  a,
  button {
    border: 1px solid #d0d7de;
    background: #fff;
    color: #1f2328;
    border-radius: 6px;
    padding: 7px 10px;
    font-size: 0.85rem;
    cursor: pointer;
  }
`;

export const EmptyState = styled.button`
  width: 100%;
  margin-top: 16px;
  border: 1px dashed #8c959f;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  color: #57606a;
  text-align: left;
  cursor: pointer;
  font-size: 1rem;
`;
