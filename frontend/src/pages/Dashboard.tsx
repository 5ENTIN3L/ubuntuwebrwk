import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/articles'); // example call; replace with real endpoints
        setStats({ articlesCount: Array.isArray(data) ? data.length : 0 });
      } catch {
        setStats({ articlesCount: 0 });
      }
    })();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-50 p-4 rounded">
          <div className="text-sm text-slate-500">Articles</div>
          <div className="text-2xl font-bold">{stats ? stats.articlesCount : '—'}</div>
          <div className="mt-2">
            <Link to="/articles" className="text-sky-600 text-sm">Manage Articles</Link>
          </div>
        </div>
        {/* Add more stat cards as implemented */}
      </div>
    </div>
  );
}
