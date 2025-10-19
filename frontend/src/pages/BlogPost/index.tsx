import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPost, BlogPost } from '../../services/resources/blog';
import {
  PostContainer,
  PostHeader,
  BackLink,
  PostTitle,
  PostMeta,
  PostCover,
  PostContent,
  PostTags,
  Tag,
  EmptyState
} from './styles';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      try {
        const { data } = await getPost(slug);
        setPost(data);
      } catch (err) {
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) return <EmptyState>Carregando post...</EmptyState>;
  if (!post) return <EmptyState>Post não encontrado.</EmptyState>;

  return (
    <PostContainer>
      <PostHeader>
        <BackLink to="/blog">← Voltar para o blog</BackLink>
        <PostTitle>{post.title}</PostTitle>
        <PostMeta>
          {post.author && <span>Por {post.author}</span>}
          {post.publishedAt && <span> • {new Date(post.publishedAt).toLocaleDateString()}</span>}
        </PostMeta>
      </PostHeader>

      {post.coverUrl && <PostCover src={post.coverUrl} alt={post.title} />}

      <PostContent>
        {post.contentMarkdown}
      </PostContent>

      {post.tags && post.tags.length > 0 && (
        <PostTags>
          {post.tags.map((t) => (
            <Tag key={t}>#{t}</Tag>
          ))}
        </PostTags>
      )}
    </PostContainer>
  );
};

export default BlogPostPage;