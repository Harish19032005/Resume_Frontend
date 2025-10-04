import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
  return (
    <nav style={{ display:'flex', gap:12, padding:12, borderBottom:'1px solid #ddd' }}>
      <Link to="/resumes">Resumes</Link>
      <Link to="/resumes/new">Create Resume</Link>
    </nav>
  );
}
