import React, { useState } from 'react';

export default function Payment() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handlePayment = async () => {
    const res = await fetch('http://localhost:3001/api/payments/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (data.url) {
      window.location = data.url;
    } else {
      setMsg(data.error);
    }
  };

  return (
    <div>
      <h2>Subscribe ($2/month)</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <button onClick={handlePayment}>Pay with Stripe</button>
      <div>{msg}</div>
    </div>
  );
}
