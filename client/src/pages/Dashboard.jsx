import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get('/tasks');
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (form) => {
    try {
      const { data } = await API.post('/tasks', form);
      setTasks([data, ...tasks]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (id) => {
    try {
      const { data } = await API.patch(`/tasks/${id}/toggle`);
      setTasks(tasks.map((t) => (t._id === id ? data : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (id, form) => {
    try {
      const { data } = await API.put(`/tasks/${id}`, form);
      setTasks(tasks.map((t) => (t._id === id ? data : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filtered = tasks.filter((t) => {
    const matchFilter = filter === 'all' || t.status === filter;
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const pendingCount = tasks.filter((t) => t.status === 'pending').length;
  const completedCount = tasks.filter((t) => t.status === 'completed').length;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.heading}>Welcome, {user?.name}</h2>
          <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>


         <input
          style={styles.search}
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div style={styles.statsRow}>
          <div style={styles.statCard}><span style={styles.statNum}>{tasks.length}</span><span style={styles.statLabel}>Total</span></div>
          <div style={styles.statCard}><span style={{ ...styles.statNum, color: '#4f46e5' }}>{pendingCount}</span><span style={styles.statLabel}>Pending</span></div>
          <div style={styles.statCard}><span style={{ ...styles.statNum, color: '#22c55e' }}>{completedCount}</span><span style={styles.statLabel}>Completed</span></div>
        </div>

        <TaskForm onAdd={handleAdd} />

       

        <div style={styles.filterRow}>
          {['all', 'pending', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{ ...styles.filterBtn, background: filter === f ? '#4f46e5' : '#e5e7eb', color: filter === f ? '#fff' : '#374151' }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={styles.msg}>Loading tasks...</p>
        ) : filtered.length === 0 ? (
          <p style={styles.msg}>No tasks found.</p>
        ) : (
          filtered.map((task) => (
            <TaskItem key={task._id} task={task} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  page: { minHeight: '100vh', background: '#f0f2f5', padding: '2rem 1rem' },
  container: { maxWidth: '720px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
  heading: { fontSize: '1.4rem', fontWeight: '700', margin: 0 },
  logoutBtn: { padding: '0.5rem 1rem', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  statsRow: { display: 'flex', gap: '1rem', marginBottom: '1.5rem' },
  statCard: { flex: 1, background: '#fff', borderRadius: '8px', padding: '1rem', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: '0.25rem' },
  statNum: { fontSize: '1.6rem', fontWeight: '700' },
  statLabel: { fontSize: '0.8rem', color: '#6b7280' },
  search: { width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '0.95rem', marginBottom: '1rem', boxSizing: 'border-box' },
  filterRow: { display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' },
  filterBtn: { padding: '0.4rem 1rem', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', fontSize: '0.9rem' },
  msg: { textAlign: 'center', color: '#6b7280', marginTop: '2rem' }
};

export default Dashboard;