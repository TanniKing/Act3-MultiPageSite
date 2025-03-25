import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import styles from './Signup.module.css' // optional if you create a separate CSS module

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    setError(null)
    setIsPending(true)
  
    try {
      const auth = getAuth()
      const res = await createUserWithEmailAndPassword(auth, email, password)
      setIsPending(false)
      if (res.user) {
        // Force sign out right after sign-up
        await signOut(auth)
        navigate('/login') // go to login page
      }
    } catch (err) {
      setError(err.message)
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSignup} className={styles['auth-form']}>
      <h2>Sign up</h2>
      <label>
        <span>email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </label>
      {!isPending && <button className="btn">Sign Up</button>}
      {isPending && <button className="btn" disabled>Loading...</button>}
      {error && <p>{error}</p>}
    </form>
  )
}
