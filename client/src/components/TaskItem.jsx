import { useState } from 'react';

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ title: task.title, description: task.description });

  const handleSave = () => {
    if (!form.title.trim()) return;
    onEdit(task._id, form);
    setEditing(false);
  };

  return (
    <div style={{ ...styles.card, borderLeft: `4px solid ${task.status === 'completed' ? '#22c55e' : '#4f46e5'}` }}>
      {editing ? (
        <div style={styles.editBlock}>
          <input style={styles.input} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input style={styles.input} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <div style={styles.actions}>
            <button style={styles.saveBtn} onClick={handleSave}>Save</button>
            <button style={styles.cancelBtn} onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div style={styles.viewBlock}>
          <div>
            <p style={{ ...styles.title, textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}>{task.title}</p>
            {task.description && <p style={styles.desc}>{task.description}</p>}
            <span style={{ ...styles.badge, background: task.status === 'completed' ? '#dcfce7' : '#ede9fe', color: task.status === 'completed' ? '#16a34a' : '#4f46e5' }}>
              {task.status}
            </span>
          </div>
          <div style={styles.actions}>
            <button style={styles.toggleBtn} onClick={() => onToggle(task._id)}>
              {task.status === 'pending' ? 'Complete' : 'Undo'}
            </button>
            <button style={styles.editBtn} onClick={() => setEditing(true)}>Edit</button>
            <button style={styles.deleteBtn} onClick={() => onDelete(task._id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  card: { background: '#fff', padding: '1rem 1.25rem', borderRadius: '8px', marginBottom: '0.75rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' },
  viewBlock: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' },
  editBlock: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  title: { fontWeight: '600', fontSize: '1rem', margin: 0 },
  desc: { fontSize: '0.85rem', color: '#666', margin: '0.25rem 0' },
  badge: { fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '999px', fontWeight: '500' },
  actions: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap' },
  input: { padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '0.9rem' },
  toggleBtn: { padding: '0.4rem 0.8rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' },
  editBtn: { padding: '0.4rem 0.8rem', background: '#f59e0b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' },
  deleteBtn: { padding: '0.4rem 0.8rem', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' },
  saveBtn: { padding: '0.4rem 0.8rem', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' },
  cancelBtn: { padding: '0.4rem 0.8rem', background: '#6b7280', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }
};

export default TaskItem;