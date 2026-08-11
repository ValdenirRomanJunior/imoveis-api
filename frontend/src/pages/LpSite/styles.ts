import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #0b1420; /* Dark blue background */
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Inter', sans-serif; /* Fallback font */
`;

export const TopBar = styled.div`
  width: 100%;
  background-color: #0f1c2b; /* Slightly darker or different shade for top bar */
  padding: 15px 20px;
  text-align: center;
  border-bottom: 1px solid #1a2a3a;
`;

export const TopBarText = styled.h3`
  color: #4ade80; /* Green color */
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin: 0;
`;

export const ContentWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const MainTitle = styled.h1`
  color: #ffffff;
  font-size: 36px;
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 20px;

  span {
    color: #f59e0b; /* Gold/yellow color */
    font-style: italic;
  }

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const SubTitle = styled.p`
  color: #94a3b8; /* Light blue/grey */
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 700px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const VideoContainer = styled.div`
  width: 100%;
  max-width: 700px;
  aspect-ratio: 16 / 9;
  background-color: #000;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  margin-bottom: 30px;
  cursor: pointer;

  /* Thumbnail do vídeo */
  .video-thumb {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  /* Overlay escuro */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.25);
    z-index: 2;
    transition: background 0.3s;
  }
  &:hover::after {
    background: rgba(0, 0, 0, 0.4);
  }

  .play-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    width: 90px;
    height: 90px;
    filter: drop-shadow(0 4px 20px rgba(0,0,0,0.5));
    transition: transform 0.2s ease;
  }
  &:hover .play-icon {
    transform: translate(-50%, -50%) scale(1.08);
  }

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    z-index: 4;
  }
`;

export const CtaText = styled.p`
  color: #e2e8f0;
  font-size: 18px;
  margin-bottom: 20px;

  span {
    font-weight: 700;
    color: #ffffff;
  }
`;

export const CtaButton = styled.a`
  background: linear-gradient(180deg, #86efac 0%, #22c55e 100%);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 20px 40px;
  font-size: 19px;
  font-weight: 800;
  text-transform: uppercase;
  cursor: pointer;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
  transition: transform 0.2s, box-shadow 0.2s;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-decoration: none;

  svg {
    font-size: 44px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(34, 197, 94, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;
