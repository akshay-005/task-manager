import { useState } from 'react';

const TaskForm = ({ onAdd }) => {
  const [form, setForm] = useState({ title: '', description: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onAdd(form);
    setForm({ title: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input style={styles.input} name="title" placeholder="Task title" value={form.title} onChange={handleChange} required />
      <input style={styles.input} name="description" placeholder="Description (optional)" value={form.description} onChange={handleChange} />
      <button style={styles.button} type="submit">Add Task</button>
    </form>
  );
};

const styles = {
  form: { display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' },
  input: { flex: 1, minWidth: '160px', padding: '0.65rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '0.95rem' },
  button: { padding: '0.65rem 1.25rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.95rem' }
};

export default TaskForm;