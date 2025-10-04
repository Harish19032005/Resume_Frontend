import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createResume } from './resumesSlice';
import { useNavigate } from 'react-router-dom';
import '../../components/Form.css';

const emptyResume = {
  name: '',
  email: '',
  phone: '',
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: []
};

export default function ResumeForm() {
  const [resume, setResume] = useState(emptyResume);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await dispatch(createResume(resume));
    nav('/resumes');
  };

  const addSkill = () => setResume(r => ({ ...r, skills: [...(r.skills||[]), ''] }));
  const updateSkill = (i, val) => setResume(r => { const skills = [...r.skills]; skills[i] = val; return {...r, skills};});
  const removeSkill = (i) => setResume(r => { const skills = [...r.skills]; skills.splice(i,1); return {...r, skills};});

  return (
    <form onSubmit={submit} style={{ display:'grid', gap:10, maxWidth:800 }}>
      <h3>Create Resume</h3>
      <input placeholder="Full name" value={resume.name} onChange={e=>setResume({...resume, name:e.target.value})} required />
      <input placeholder="Email" value={resume.email} onChange={e=>setResume({...resume, email:e.target.value})} />
      <input placeholder="Phone" value={resume.phone} onChange={e=>setResume({...resume, phone:e.target.value})} />
      <textarea placeholder="Professional summary" value={resume.summary} onChange={e=>setResume({...resume, summary:e.target.value})} />
      <div>
        <h4>Skills</h4>
        { (resume.skills || []).map((s,i) => (
          <div key={i} style={{display:'flex', gap:8, marginBottom:6}}>
            <input value={s} onChange={e=>updateSkill(i, e.target.value)} placeholder="Skill" />
            <button type="button" onClick={()=>removeSkill(i)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addSkill}>Add Skill</button>
      </div>

      <button type="submit">Save</button>
    </form>
  );
}
