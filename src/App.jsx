import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import ResumeList from './features/resumes/ResumeList';
import ResumeForm from './features/resumes/ResumeForm';
import ResumeEdit from './features/resumes/ResumeEdit';

export default function App() {
  return (
    <Router>
      <NavBar />
      <div style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/resumes" replace />} />
          <Route path="/resumes" element={<ResumeList />} />
          <Route path="/resumes/new" element={<ResumeForm />} />
          <Route path="/resumes/:id/edit" element={<ResumeEdit />} />
        </Routes>
      </div>
    </Router>
  );
}
