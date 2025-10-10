import styled from 'styled-components';

export const GuideContainer = styled.div`
  min-height: 100vh;
  background: #fff;
  padding: 0;
`;

export const GuideContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  min-height: calc(100vh - 80px);
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const GuideHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #f0f0f0;
`;

export const GuideTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const GuideSubtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

export const GuideSection = styled.section`
  margin-bottom: 3rem;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 12px;
  border-left: 4px solid #667eea;
`;

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: #667eea;
  }
`;

export const SectionContent = styled.div`
  color: #555;
  line-height: 1.8;
  
  h3 {
    font-size: 1.3rem;
    color: #333;
    margin: 1.5rem 0 1rem 0;
    font-weight: 600;
  }
  
  p {
    margin-bottom: 1rem;
    font-size: 1rem;
  }
  
  ul {
    margin: 1rem 0;
    padding-left: 2rem;
    
    li {
      margin-bottom: 0.5rem;
      position: relative;
      
      &::marker {
        color: #667eea;
      }
    }
  }
  
  ol {
    margin: 1rem 0;
    padding-left: 2rem;
    
    li {
      margin-bottom: 0.8rem;
      font-weight: 500;
    }
  }
`;

export const StepCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-left: 3px solid #667eea;
`;

export const StepNumber = styled.span`
  display: inline-block;
  background: #667eea;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  font-weight: bold;
  margin-right: 1rem;
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

export const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  svg {
    font-size: 3rem;
    color: #667eea;
    margin-bottom: 1rem;
  }
  
  h4 {
    font-size: 1.3rem;
    color: #333;
    margin-bottom: 1rem;
    font-weight: 600;
  }
  
  p {
    color: #666;
    line-height: 1.6;
  }
`;

export const NavigationTip = styled.div`
  background: #e8f4fd;
  border: 1px solid #b3d9ff;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  
  strong {
    color: #0066cc;
  }
`;

export const BackToTop = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
  
  &:hover {
    background: #5a6fd8;
    transform: translateY(-2px);
  }
  
  svg {
    font-size: 1.5rem;
  }
`;