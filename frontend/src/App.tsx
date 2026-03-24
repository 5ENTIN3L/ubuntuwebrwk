import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

import About from './pages/About';
import Initiatives from './pages/Initiatives';
import Insights from './pages/Insights';
import Partners from './pages/Partners';
import Contact from './pages/Contact';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="initiatives" element={<Initiatives />} />
        <Route path="insights" element={<Insights />} />
        <Route path="partners" element={<Partners />} />
        <Route path="contact" element={<Contact />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
