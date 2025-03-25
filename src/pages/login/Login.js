// Login.js
import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) =>  {
    e.preventDefault();
    setIsPending(true);
    const authentication = getAuth();
    try {
      const res = await signInWithEmailAndPassword(authentication, email, password);
      if (res.user) {
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    }
    setIsPending(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles['auth-form']}>
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email}
          required
        />
      </label>
      <label>
        <span>Password:</span>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password}
          required
        />
      </label>
      {!isPending && <button className="btn">Login</button>}
      {isPending && <button className="btn" disabled>Loading...</button>}
      {error && <p>{error}</p>}
      <p>
        Don't have an account? <NavLink to="/signup">Sign up!</NavLink>
      </p>
    </form>
  );
}
