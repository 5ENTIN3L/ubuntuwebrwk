import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function ArticleForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();

  // fetch single article when editing
  const { data: article, isLoading: loadingArticle } = useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      if (!id) return null;
      const { data } = await api.get(`/articles/${id}`);
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60
  });

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (article) {
      setTitle(article.title || '');
      setBody(article.body || '');
    }
  }, [article]);

 const saveMut = useMutation({
  mutationFn: async (payload: { title: string; body: string }) => {
    if (id) {
      await api.put(`/articles/${id}`, payload);
    } else {
      await api.post('/articles', payload);
    }
  },
  onSuccess: async () => {
    await qc.invalidateQueries({ queryKey: ['articles'] });
    navigate('/articles');
  }
});


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    try {
      await saveMut.mutateAsync({ title: title.trim(), body });
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Save failed');
    }
  }

  if (loadingArticle) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{id ? 'Edit Article' : 'New Article'}</h2>
      {error && <div className="text-sm text-red-600 mb-3">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm text-slate-600 mb-1">Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full border rounded px-3 py-2 min-h-40 focus:outline-none focus:ring-2 focus:ring-sky-200"
          />
        </div>
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={saveMut.isPending}>
            {saveMut.isPending ? 'Saving…' : 'Save'}
          </Button>
          <button type="button" onClick={() => navigate('/articles')} className="text-slate-600">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
