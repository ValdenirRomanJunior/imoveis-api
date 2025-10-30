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

// Helper simples para converter links Markdown [texto](url) e autolinks em HTML clicável
const mdToHtml = (md: string) => {
  const escapeHtml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  let html = escapeHtml(md);

  // Links [texto](https://url)
  html = html.replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g, (_m, text, url) => {
    try {
      const safeUrl = new URL(url).toString();
      return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${text}</a>`;
    } catch {
      return text;
    }
  });

  // Autolinks https://... em texto
  html = html.replace(/(?<!["'])(https?:\/\/[^\s<]+)/g, (url) => {
    try {
      const safeUrl = new URL(url).toString();
      return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${safeUrl}</a>`;
    } catch {
      return url;
    }
  });

  // Quebras de linha para visual mais amigável
  html = html.replace(/\n{2,}/g, '<br/><br/>').replace(/\n/g, '<br/>');

  return html;
};

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
        <div
          dangerouslySetInnerHTML={{ __html: mdToHtml(post.contentMarkdown || '') }}
        />
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