import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import Button from '../../components/ui/Button';

export default function ArticlesList() {
  const qc = useQueryClient();

  const { data: articles, isLoading } = useQuery(['articles'], async () => {
    const { data } = await api.get('/articles');
    return data;
  });

  const del = useMutation(async (id: string) => {
    await api.delete(`/articles/${id}`);
  }, {
    onSuccess: () => qc.invalidateQueries(['articles'])
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Articles</h2>
        <Link to="/articles/new">
          <Button>New Article</Button>
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        {Array.isArray(articles) && articles.length ? (
          articles.map((a: any) => (
            <div key={a._id} className="p-4 bg-slate-50 rounded flex justify-between items-center">
              <div>
                <div className="font-semibold">{a.title}</div>
                <div className="text-sm text-slate-500">{a.authorName || a.author || '—'}</div>
              </div>
              <div className="flex items-center gap-2">
                <Link to={`/articles/${a._id}`} className="text-sky-600">Edit</Link>
                <button onClick={() => del.mutate(a._id)} className="text-red-600">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-slate-500">No articles yet.</div>
        )}
      </div>
    </div>
  );
}
