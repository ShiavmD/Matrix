import React, { useState } from 'react';

export default function Checklist() {
  const [planId, setPlanId] = useState('');
  const [date, setDate] = useState('');
  const [completed, setCompleted] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const userId = 'USER_ID'; // Replace with actual user ID from auth
    const res = await fetch('http://localhost:3001/api/checklist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, planId, date, completed })
    });
    const data = await res.json();
    setMsg(data._id ? 'Checklist marked!' : data.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Daily Checklist</h2>
      <input placeholder="Plan ID" value={planId} onChange={e => setPlanId(e.target.value)} />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <label>
        <input type="checkbox" checked={completed} onChange={e => setCompleted(e.target.checked)} />
        Completed
      </label>
      <button type="submit">Submit</button>
      <div>{msg}</div>
    </form>
  );
}
