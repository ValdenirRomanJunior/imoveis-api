import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PostContainer = styled.div`
  max-width: 840px;
  margin: 0 auto;
  padding: 32px 24px;
`;

export const PostHeader = styled.header`
  margin-bottom: 16px;
`;

export const BackLink = styled(Link)`
  display: inline-block;
  color: #374151;
  text-decoration: none;
  margin-bottom: 8px;

  &:hover { text-decoration: underline; }
`;

export const PostTitle = styled.h1`
  font-size: 32px;
  line-height: 1.2;
  margin: 0;
  color: #1f2937;
`;

export const PostMeta = styled.div`
  color: #6b7280;
  font-size: 14px;
  margin-top: 6px;
`;

export const PostCover = styled.img`
  width: 100%;
  border-radius: 12px;
  margin: 16px 0 24px 0;
  object-fit: cover;
`;

export const PostContent = styled.article`
  color: #111827;
  font-size: 16px;
  line-height: 1.7;
  white-space: pre-wrap;
`;

export const PostTags = styled.div`
  margin-top: 24px;
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