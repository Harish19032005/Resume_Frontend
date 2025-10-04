import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResumes, updateResume } from './resumesSlice';
import { useParams, useNavigate } from 'react-router-dom';
import '../../components/Form.css';

export default function ResumeEdit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const resumeFromStore = useSelector(s => s.resumes.items.find(r => r._id === id));
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (!resumeFromStore) dispatch(fetchResumes());
    else setForm({ ...resumeFromStore });
  }, [resumeFromStore, dispatch]);

  if (!form) return <p>Loading...</p>;

  const submit = async (e) => {
    e.preventDefault();
    await dispatch(updateResume({ id, resume: form }));
    nav('/resumes');
  };

  return (
    <form onSubmit={submit} style={{ display:'grid', gap:10, maxWidth:800 }}>
      <h3>Edit Resume</h3>
      <input placeholder="Full name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
      <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
      <textarea placeholder="Summary" value={form.summary} onChange={e=>setForm({...form, summary:e.target.value})} />
      <button type="submit">Save</button>
    </form>
  );
}
