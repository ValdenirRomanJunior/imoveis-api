import styled from 'styled-components';

export const NovoPage = styled.main`
  min-height: calc(100vh - 45px);
  background: #f6f8fa;
  padding: 24px 16px 32px 16px;
  font-family: 'Nunito Sans', sans-serif;

  @media screen and (min-width: 1000px) {
    padding: 28px 24px 36px 88px;
  }
`;

export const ContentCard = styled.section`
  background: #fff;
  border: 1px solid #d8dee4;
  border-radius: 10px;
  padding: 18px;
`;

export const StepIndicatorWrap = styled.div`
  margin-bottom: 18px;
`;

export const StepsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 10px;

  p {
    font-size: 0.86rem;
    color: #57606a;
  }
`;

export const DotLine = styled.div`
  display: grid;
  grid-template-columns: 24px 1fr 24px 1fr 24px;
  align-items: center;

  .dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #d0d7de;
    background: #fff;
  }

  .dot.active {
    border-color: #1f6feb;
    background: #1f6feb;
  }

  .line {
    height: 2px;
    background: #d0d7de;
  }

  .line.active {
    background: #1f6feb;
  }
`;

export const FormSection = styled.div`
  margin-bottom: 18px;

  h3 {
    color: #1f2328;
    font-size: 1rem;
    margin-bottom: 10px;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.9rem;
  color: #57606a;

  input,
  select,
  textarea {
    border: 1px solid #d0d7de;
    border-radius: 6px;
    padding: 9px 10px;
    font-size: 0.95rem;
    font-family: inherit;
  }
`;

export const MiniButton = styled.button`
  border: 1px solid #d0d7de;
  background: #fff;
  border-radius: 6px;
  padding: 8px 10px;
  cursor: pointer;
`;

export const ActionsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
  gap: 8px;
`;

export const PrimaryButton = styled.button`
  border: 1px solid #1f6feb;
  background: #1f6feb;
  color: #fff;
  border-radius: 6px;
  padding: 10px 14px;
  font-weight: 700;
  cursor: pointer;
`;

export const SecondaryButton = styled.button`
  border: 1px solid #d0d7de;
  background: #fff;
  border-radius: 6px;
  padding: 10px 14px;
  cursor: pointer;
`;

export const TipologiaCard = styled.div`
  border: 1px solid #d8dee4;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;

  span {
    border-radius: 999px;
    border: 1px solid #d0d7de;
    padding: 5px 10px;
    font-size: 0.85rem;
    color: #57606a;
  }
`;

export const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
`;

export const TemplateCard = styled.button<{ $selected?: boolean; $disabled?: boolean }>`
  border-radius: 8px;
  border: 2px solid ${({ $selected }) => ($selected ? '#1f6feb' : '#d0d7de')};
  background: ${({ $disabled }) => ($disabled ? '#f3f4f6' : '#fff')};
  opacity: ${({ $disabled }) => ($disabled ? 0.7 : 1)};
  text-align: left;
  padding: 12px;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};

  .preview {
    height: 110px;
    border-radius: 6px;
    background: linear-gradient(135deg, #c7d2fe, #dbeafe);
    margin-bottom: 8px;
  }
`;

export const PreviewBox = styled.div`
  border: 1px solid #d0d7de;
  border-radius: 8px;
  background: #fafbfc;
  padding: 10px;
  min-height: 300px;
  overflow: auto;
`;

export const SuccessBox = styled.div`
  margin-top: 14px;
  border: 1px solid #2da44e;
  background: #dafbe1;
  color: #116329;
  border-radius: 8px;
  padding: 14px;

  .buttons {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  button,
  a {
    border: 1px solid #1f6feb;
    background: #1f6feb;
    color: #fff;
    border-radius: 6px;
    padding: 8px 10px;
    font-size: 0.9rem;
    cursor: pointer;
  }
`;
