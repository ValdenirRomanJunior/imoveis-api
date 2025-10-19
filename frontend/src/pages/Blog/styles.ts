import styled from 'styled-components';

export const BlogContainer = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 32px 24px;
`;

export const BlogHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

export const BlogTitle = styled.h1`
  font-size: 32px;
  line-height: 1.2;
  margin: 0;
  color: #1f2937;
`;

export const BlogSubtitle = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin-top: 8px;
`;

export const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

export const PostCard = styled.div`
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 12px;
  background: #fff;
  overflow: hidden;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    transform: translateY(-2px);
  }
`;

export const PostCover = styled.img`
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
`;

export const PostContent = styled.div`
  padding: 16px;
`;

export const PostTitle = styled.h2`
  font-size: 20px;
  color: #111827;
  margin: 0 0 8px 0;
`;

export const PostExcerpt = styled.p`
  font-size: 14px;
  color: #4b5563;
  margin: 0 0 12px 0;
`;

export const PostTags = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const Tag = styled.span`
  font-size: 12px;
  color: #374151;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  padding: 4px 8px;
`;

export const EmptyState = styled.div`
  text-align: center;
  color: #6b7280;
  padding: 24px 0;
`;