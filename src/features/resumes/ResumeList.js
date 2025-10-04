import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchResumes, deleteResume } from './resumesSlice';
import { Link } from 'react-router-dom';
import './ResumeList.css';

export default function ResumeList() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.resumes);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchResumes());
  }, [status, dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Saved Resumes</h2>
      {items.length === 0 ? <p>No resumes yet.</p> : (
        <table border="1" cellPadding="8">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Updated</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {items.map(r => (
              <tr key={r._id}>
                <td>{r.name}</td>
                <td>{r.email}</td>
                <td>{new Date(r.updatedAt).toLocaleString()}</td>
                <td>
                  <Link to={`/resumes/${r._id}/edit`}>Edit</Link>
                  {' | '}
                  <button onClick={() => {
                    if (window.confirm('Delete resume?')) dispatch(deleteResume(r._id));
                  }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
