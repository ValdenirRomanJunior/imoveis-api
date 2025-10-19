import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, BlogPostSummary } from '../../services/resources/blog';
import {
  BlogContainer,
  BlogHeader,
  BlogTitle,
  BlogSubtitle,
  PostsGrid,
  PostCard,
  PostCover,
  PostContent,
  PostTitle,
  PostExcerpt,
  PostTags,
  Tag,
  EmptyState
} from './styles';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await getPosts();
        setPosts(data || []);
      } catch (err) {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <BlogContainer>
      <BlogHeader>
        <BlogTitle>Blog da Standi</BlogTitle>
        <BlogSubtitle>Ideias, novidades e guias para imobiliárias</BlogSubtitle>
      </BlogHeader>

      {loading ? (
        <EmptyState>Carregando posts...</EmptyState>
      ) : posts.length === 0 ? (
        <EmptyState>Sem posts publicados por enquanto.</EmptyState>
      ) : (
        <PostsGrid>
          {posts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <PostCard>
                {post.coverUrl && <PostCover src={post.coverUrl} alt={post.title} />}
                <PostContent>
                  <PostTitle>{post.title}</PostTitle>
                  <PostExcerpt>{post.excerpt}</PostExcerpt>
                  <PostTags>
                    {(post.tags || []).slice(0, 3).map((tag) => (
                      <Tag key={tag}>#{tag}</Tag>
                    ))}
                  </PostTags>
                </PostContent>
              </PostCard>
            </Link>
          ))}
        </PostsGrid>
      )}
    </BlogContainer>
  );
};

export default Blog;