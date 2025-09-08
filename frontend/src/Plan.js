import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Plan() {
  const [type, setType] = useState('5-day');
  const [startDate, setStartDate] = useState('');
  const [tasks, setTasks] = useState([{ day: 1, description: '', skill: '' }]);
  const [msg, setMsg] = useState('');
  const [showMsg, setShowMsg] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [shake, setShake] = useState(false);

  // Confetti effect on successful submit
  const [confetti, setConfetti] = useState(false);

  const handleTaskChange = (idx, field, value) => {
    const newTasks = [...tasks];
    newTasks[idx][field] = value;
    setTasks(newTasks);
  };

  const addTask = () => {
    setTasks([...tasks, { day: tasks.length + 1, description: '', skill: '' }]);
  };

  // Remove task animation
  const removeTask = idx => {
    setTasks(tasks => tasks.filter((_, i) => i !== idx));
  };

  // Progress calculation
  const filledTasks = tasks.filter(t => t.description && t.skill).length;
  const progress = tasks.length ? (filledTasks / tasks.length) * 100 : 0;

  const handleSubmit = async e => {
    e.preventDefault();
    // Simple validation: all tasks must be filled
    if (!startDate || tasks.some(t => !t.description || !t.skill)) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setMsg('Please fill all fields.');
      setShowMsg(true);
      setTimeout(() => setShowMsg(false), 2000);
      return;
    }
    const userId = 'USER_ID'; // Replace with actual user ID from auth
    const res = await fetch('http://localhost:3001/api/plans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, type, startDate, tasks })
    });
    const data = await res.json();
    setMsg(data._id ? 'Plan submitted!' : data.error);
    setShowMsg(true);
    if (data._id) {
      setConfetti(true);
      setTimeout(() => setConfetti(false), 1800);
    }
    setTimeout(() => setShowMsg(false), 2000); // Hide after 2s
  };

  // Helper for random confetti
  const Confetti = () => (
    <AnimatePresence>
      {confetti && (
        <motion.div
          style={{
            pointerEvents: 'none',
            position: 'fixed',
            top: 0, left: 0, width: '100vw', height: '100vh',
            zIndex: 9999
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * window.innerWidth,
                y: -40,
                rotate: Math.random() * 360,
                scale: Math.random() * 0.7 + 0.5
              }}
              animate={{
                y: window.innerHeight + 40,
                rotate: Math.random() * 720
              }}
              transition={{
                duration: 1.5 + Math.random(),
                delay: Math.random() * 0.3
              }}
              style={{
                position: 'absolute',
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: `hsl(${Math.random()*360},90%,60%)`,
                left: 0
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <Confetti />
      <motion.form
        onSubmit={handleSubmit}
        animate={shake ? { x: [-10, 10, -10, 10, 0] } : { x: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'linear-gradient(120deg, #f8fafc 0%, #e3f2fd 100%)',
          boxShadow: '0 2px 16px rgba(33,150,243,0.07)',
          borderRadius: 12,
          padding: 24,
          maxWidth: 480,
          margin: '32px auto'
        }}
      >
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
        >
          Submit Plan
        </motion.h2>
        <motion.select
          value={type}
          onChange={e => setType(e.target.value)}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <option value="5-day">5-day</option>
          <option value="7-day">7-day</option>
        </motion.select>
        <motion.input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        />
        <div style={{ margin: '16px 0', width: '100%' }}>
          <motion.div
            style={{
              height: '8px',
              borderRadius: '4px',
              background: '#eee',
              overflow: 'hidden'
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              style={{
                height: '100%',
                background: progress === 100 ? '#4caf50' : '#2196f3'
              }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>
          <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>
            {filledTasks} / {tasks.length} tasks filled
          </div>
        </div>
        <AnimatePresence>
          {tasks.map((task, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0.7, opacity: 0, x: -50 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.5, opacity: 0, x: 50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{
                marginBottom: '10px',
                border: '1px solid #eee',
                padding: '10px',
                borderRadius: '6px',
                background: '#fafbfc',
                position: 'relative'
              }}
            >
              <input
                placeholder="Description"
                value={task.description}
                onChange={e => handleTaskChange(idx, 'description', e.target.value)}
              />
              <input
                placeholder="Skill"
                value={task.skill}
                onChange={e => handleTaskChange(idx, 'skill', e.target.value)}
              />
              {tasks.length > 1 && (
                <motion.button
                  type="button"
                  onClick={() => removeTask(idx)}
                  whileHover={{ scale: 1.2, backgroundColor: "#e53935" }}
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: 10,
                    background: '#f44336',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    lineHeight: '20px',
                    padding: 0
                  }}
                >×</motion.button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.button
          type="button"
          onClick={addTask}
          whileHover={{ scale: 1.08, backgroundColor: "#007bff" }}
          whileTap={{ scale: 0.95 }}
          style={{
            marginRight: '10px',
            background: '#2196f3',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background 0.3s'
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          Add Task
        </motion.button>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.08, backgroundColor: "#43a047" }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: '#4caf50',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background 0.3s'
          }}
        >
          Submit
        </motion.button>
        <AnimatePresence>
          {showMsg && (
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
              exit={{ y: 20, opacity: 0, scale: 0.9, rotate: 5 }}
              transition={{ duration: 0.5 }}
              style={{
                color: msg === 'Plan submitted!' ? 'green' : 'red',
                marginTop: '10px',
                fontWeight: 600,
                fontSize: '1.1em',
                letterSpacing: '0.5px'
              }}
            >
              {msg}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </>
  );
}
