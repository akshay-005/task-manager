import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await API.post('/auth/register', form);
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Register</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input style={styles.input} name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          <input style={styles.input} name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input style={styles.input} name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <button style={styles.button} type="submit">Register</button>
        </form>
        <p style={styles.link}>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' },
  card: { background: '#fff', padding: '2rem', borderRadius: '8px', width: '360px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  title: { marginBottom: '1rem', textAlign: 'center' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  input: { padding: '0.75rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' },
  button: { padding: '0.75rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' },
  error: { color: 'red', marginBottom: '0.5rem', textAlign: 'center' },
  link: { marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem' }
};

export default Register;