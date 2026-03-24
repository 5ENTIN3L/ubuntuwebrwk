import React from 'react';
import { NavLink } from 'react-router-dom';

const active = 'text-sky-600 font-semibold';
const inactive = 'text-slate-600';

export default function Nav() {
  return (
    <nav className="flex gap-6">
      <NavLink to="/dashboard" className={({ isActive }) => (isActive ? active : inactive)}>Dashboard</NavLink>
      <NavLink to="/articles" className={({ isActive }) => (isActive ? active : inactive)}>Articles</NavLink>
      {/* Add more links as features are implemented */}
    </nav>
  );
}
