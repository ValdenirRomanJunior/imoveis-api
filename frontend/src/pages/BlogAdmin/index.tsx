import React, { useEffect, useMemo, useState } from 'react';
import { getPosts, upsertPost, deletePost, uploadCover, uploadImage, BlogPost, BlogPostSummary } from '../../services/resources/blog';
import {
  AdminContainer,
  AdminHeader,
  Title,
  Columns,
  Left,
  Right,
  PostList,
  PostItem,
  ActionRow,
  Button,
  Input,
  TextArea,
  Label,
  TagList,
  TagItem,
  UploadBox,
  Helper,
  EmptyState
} from './styles';

const emptyPost: BlogPost = {
  slug: '',
  title: '',
  excerpt: '',
  contentMarkdown: '',
  tags: [],
  status: 'PUBLISHED',
};

const BlogAdmin: React.FC = () => {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [selected, setSelected] = useState<BlogPost>(emptyPost);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const isEditing = useMemo(() => !!selected && !!selected.slug, [selected]);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await getPosts();
      setPosts(data || []);
    } catch (err) {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onSelect = (p?: BlogPostSummary) => {
    if (!p) { setSelected(emptyPost); return; }
    setSelected({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      coverUrl: p.coverUrl,
      tags: p.tags || [],
      contentMarkdown: '',
      status: p.status || 'PUBLISHED',
      publishedAt: p.publishedAt,
    });
  };

  const onSave = async () => {
    if (!selected.slug || !selected.title) { alert('Preencha slug e título'); return; }
    setSaving(true);
    try {
      // Prepare post payload
      let postToSave: BlogPost = { ...selected };

      // Upload cover first (to persist URL in the post)
      if (coverFile) {
        const res = await uploadCover(selected.slug, coverFile);
        const url = res?.data?.url;
        if (url) {
          postToSave.coverUrl = url;
        }
        setCoverFile(null);
      }

      // Default status to PUBLISHED to aparecer na lista pública
      if (!postToSave.status) {
        postToSave.status = 'PUBLISHED';
      }
      // Set publishedAt if publishing and missing
      if (postToSave.status.toUpperCase() === 'PUBLISHED' && !postToSave.publishedAt) {
        postToSave.publishedAt = new Date().toISOString();
      }

      await upsertPost(postToSave);

      // Optional image upload (for content); URL é usado no Markdown manualmente
      if (imageFile) {
        await uploadImage(selected.slug, imageFile);
        setImageFile(null);
      }

      await load();
      alert('Post salvo');
    } catch (err) {
      alert('Falha ao salvar');
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async () => {
    if (!selected.slug) return;
    if (!window.confirm('Remover este post?')) return;
    try {
      await deletePost(selected.slug);
      setSelected(emptyPost);
      await load();
      alert('Post removido');
    } catch (err) {
      alert('Falha ao remover');
    }
  };

  return (
    <AdminContainer>
      <AdminHeader>
        <Title>Blog Admin</Title>
      </AdminHeader>

      <Columns>
        <Left>
          {loading ? (
            <EmptyState>Carregando posts...</EmptyState>
          ) : posts.length === 0 ? (
            <EmptyState>Nenhum post criado ainda.</EmptyState>
          ) : (
            <PostList>
              {posts.map((p) => (
                <PostItem key={p.slug} onClick={() => onSelect(p)}>
                  <div>
                    <strong>{p.title}</strong>
                    <Helper>/{p.slug}</Helper>
                  </div>
                  <div>{(p.tags || []).slice(0,3).map(t => <TagItem key={t}>#{t}</TagItem>)}</div>
                </PostItem>
              ))}
            </PostList>
          )}
          <ActionRow>
            <Button onClick={() => onSelect(undefined)}>Novo post</Button>
            <Button variant="secondary" onClick={load}>Atualizar</Button>
          </ActionRow>
        </Left>

        <Right>
          <Label>Slug</Label>
          <Input value={selected.slug} onChange={e => setSelected({ ...selected, slug: e.target.value })} placeholder="ex: como-captar-imoveis" />

          <Label>Título</Label>
          <Input value={selected.title} onChange={e => setSelected({ ...selected, title: e.target.value })} placeholder="ex: Como captar imóveis" />

          <Label>Resumo</Label>
          <TextArea rows={3} value={selected.excerpt} onChange={e => setSelected({ ...selected, excerpt: e.target.value })} placeholder="Breve resumo do conteúdo" />

          <Label>Conteúdo (Markdown)</Label>
          <TextArea rows={12} value={selected.contentMarkdown} onChange={e => setSelected({ ...selected, contentMarkdown: e.target.value })} placeholder={"Use # para títulos, **negrito**, *itálico*, e links [texto](url)"} />

          <Label>Tags (separadas por vírgula)</Label>
          <Input value={(selected.tags || []).join(', ')} onChange={e => setSelected({ ...selected, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} placeholder="marketing, gestão, vendas" />

          <Label>Status</Label>
          <select value={(selected.status || 'PUBLISHED')} onChange={e => setSelected({ ...selected, status: e.target.value })} style={{ padding: '8px', borderRadius: 8, border: '1px solid #ddd', marginBottom: 12 }}>
            <option value="PUBLISHED">Publicado</option>
            <option value="DRAFT">Rascunho</option>
          </select>

          <Label>Capa</Label>
          <UploadBox>
            <input type="file" accept="image/*" onChange={e => setCoverFile(e.target.files?.[0] || null)} />
          </UploadBox>
          <Helper>{coverFile ? coverFile.name : 'Selecione uma imagem para a capa (opcional)'}</Helper>

          <Label>Imagem para conteúdo (upload rápido)</Label>
          <UploadBox>
            <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} />
          </UploadBox>
          <Helper>{imageFile ? imageFile.name : 'Faça upload e copie a URL para usar no Markdown'}</Helper>

          <ActionRow>
            <Button onClick={onSave} disabled={saving}>{saving ? 'Salvando...' : 'Salvar'}</Button>
            {isEditing && <Button variant="danger" onClick={onDelete}>Remover</Button>}
          </ActionRow>
        </Right>
      </Columns>
    </AdminContainer>
  );
};

export default BlogAdmin;